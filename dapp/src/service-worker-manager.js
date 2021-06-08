import { logger } from "./state/runtime";

const log = logger("SW Manager");

const POLLING_TIME = 10 * 60 * 1000;

export async function installServiceWorker(
  path,
  options = {
    onInstalled: (activate, info) => activate(),
    scope: ".",
  }
) {
  let registration = await navigator.serviceWorker.getRegistration(
    options.scope
  );

  if (!registration) {
    try {
      console.log("Register Service Worker");
      log("Register Service Worker");
      registration = await navigator.serviceWorker.register(path, {
        scope: options.scope,
      });
    } catch (e) {
      log("Error registering:", e.message);
      console.log(e);
      throw e;
    }
  }

  await navigator.serviceWorker.ready;

  const info = await post({ method: "getInfo" }, registration.active);
  const version = info.result.version;
  const date = new Date(info.result.date);
  log(`Active Service Worker, version ${version}, build date ${date}`);
  navigator.serviceWorker.oncontrollerchange = async (e) => {
    const info = await post({ method: "getInfo" }, e.target.active);
    const version = info.result.version;
    const date = new Date(info.result.date);
    console.log("New Service Worker activated, reload", e);
    log(`New Service Worker activated, version ${version}, build date ${date}`);
    // Seems like iOS doesn't always pick up the new worker,
    // let's add some good ol delay before reloading
    // window.setTimeout(() => window.location.reload(), 1000);
  };

  checkForUpdates(options.onInstalled);
}

async function activate(scope) {
  let registration = await navigator.serviceWorker.getRegistration(scope);
  if (registration && registration.waiting) {
    console.log("[Update Service] Activate new Service Worker");
    log("Activate new Service Worker");
    await post({ method: "skipWaiting" }, registration.waiting);
  }
}

async function activate2(serviceWorker) {
  console.log("[Update Service] Activate new Service Worker");
  log("Activate new Service Worker");
  await post({ method: "skipWaiting" }, serviceWorker);
  if (serviceWorker.state === "activated") {
    window.location.reload();
  } else {
    serviceWorker.addEventListener("statechange", async (e) => {
      console.log("[Update Service] Waiting new state: ", e.target.state);
      if (e.target.state === "activated") {
        console.log("[Update Service] activated, reload");
        log("New Service Worker activated, reload");
        window.location.reload();
      }
    });
  }
}

function checkForUpdates(onInstalled, scope = ".", pollingTime = POLLING_TIME) {
  let timerId;
  let registration;

  async function onUpdateFound() {
    const newSW = this.installing;
    const info = await post({ method: "getInfo" }, newSW);
    const version = info.result.version;
    const date = new Date(info.result.date);
    console.log("[Update Service] Update found");
    log(`Update found, version ${version}, build date ${date}`);
    newSW.addEventListener("statechange", async (e) => {
      console.log("[Update Service] New SW state change:", e.target.state);
      if (this.active && e.target.state === "installed") {
        const info = await post({ method: "getInfo" }, newSW);
        const version = info.result.version;
        const date = new Date(info.result.date);
        log(`Update installed, version ${version}, build date ${date}`);
        onInstalled(activate.bind(null, scope), { ...info.result });
      }
    });
  }

  async function checkRegistration() {
    console.log("[Update Service] Check Registration");
    log("Check Registration");
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
    log("Check for updates");

    if (registration.waiting) {
      const info = await post({ method: "getInfo" }, registration.waiting);
      const version = info.result.version;
      const date = new Date(info.result.date);
      log(
        `Found Service Worker in wait state, version ${version}, build date ${date}`
      );
      onInstalled(activate.bind(null, scope), {
        ...info.result,
      });
    }
    try {
      await registration.update();
    } catch (e) {
      console.log("[Update Service] Error updating", e);
      log("Error updating:", e.message);
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
