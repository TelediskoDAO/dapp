const POLLING_TIME = 60 * 60 * 1000;

export async function installServiceWorker(
  path,
  options = {
    onInstalled: (activate) => activate(),
    scope: ".",
  }
) {
  let registration;
  try {
    console.log("Register Service Worker");
    registration = await navigator.serviceWorker.register(path, {
      scope: options.scope,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }

  if (registration.waiting) {
    options.onInstalled(activate.bind(null, registration.waiting));
  }

  // checkForWaiting(options.onInstalled);
  checkForUpdates(options.onInstalled);
}

async function activate(serviceWorker) {
  console.log("[Update Service] Activate new Service Worker");
  post({ action: "skipWaiting" }, serviceWorker);
  if (serviceWorker.state === "activated") {
    window.location.reload();
  } else {
    serviceWorker.addEventListener("statechange", async (e) => {
      console.log("[Update Service] Waiting new state: ", e.target.state);
      if (e.target.state === "activated") {
        console.log("[Update Service] activated, reload");
        window.location.reload();
      }
    });
  }
}

function checkForUpdates(onInstalled, scope = ".", pollingTime = POLLING_TIME) {
  let timerId;
  let registration;

  async function onUpdateFound() {
    console.log("[Update Service] Update found");
    const newSW = this.installing;
    newSW.addEventListener("statechange", async (e) => {
      console.log("[Update Service] New SW state change:", e.target.state);
      if (this.active && e.target.state === "installed") {
        onInstalled(activate.bind(null, newSW));
      }
    });
  }

  async function checkRegistration() {
    console.log("[Update Service] Check Registration");
    registration = await navigator.serviceWorker.getRegistration(scope);
    if (registration) {
      registration.addEventListener("updatefound", onUpdateFound);
      checkUpdate();
    } else {
      timerId = window.setTimeout(checkRegistration, pollingTime);
    }
  }

  async function checkUpdate() {
    console.log("[Update Service] Check for updates");
    try {
      await registration.update();
    } catch (e) {
      console.log("[Update Service] Error updating", e);
      registration.removeEventListener("updatefound", onUpdateFound);
      timerId = window.setTimeout(checkRegistration, pollingTime);
      return;
    }
    timerId = window.setTimeout(checkUpdate, pollingTime);
  }

  checkRegistration();

  return () => {
    window.clearTimeout(timerId);
  };
}

async function post(message, sw) {
  if (!sw) {
    sw = navigator.serviceWorker.controller;
  }
  if (!sw) {
    throw new Error("No controller available");
  }
  const channel = new MessageChannel();
  return new Promise((resolve, reject) => {
    channel.port1.onmessage = (event) => {
      resolve(event.data);
    };
    channel.port1.onmessageerror = (event) => {
      console.log("Message error", event);
      reject(event);
    };
    try {
      sw.postMessage(message, [channel.port2]);
    } catch (e) {
      reject(e);
    }
  });
}
