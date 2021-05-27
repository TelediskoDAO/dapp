//import { version } from "../package.json";
import CONFIG from "./config";
import App from "./App.svelte";
import { platform, updateAvailable } from "src/state/runtime";
import { installServiceWorker } from "./service-worker-manager";

console.log("Config is", CONFIG);

if (CONFIG.production) {
  if (navigator.serviceWorker) {
    installServiceWorker("service-worker.js", {
      onInstalled: (activate) => {
        console.log("onInstalled callback");
        updateAvailable.set(activate);
      },
    }).catch(console.log);
  }
}

// Display errors
/*
window.addEventListener("error", function (event) {
  errors.update(($errors) => [event, ...$errors]);
});
window.addEventListener("unhandledrejection", function (event) {
  console.log("error", event);
  errors.update(($errors) => [event, ...$errors]);
});
*/

// Check browser display mode
window.addEventListener("DOMContentLoaded", () => {
  let mode = "tab";
  if (navigator.standalone) {
    mode = "standalone";
  }
  if (window.matchMedia("(display-mode: standalone)").matches) {
    mode = "standalone";
  }

  platform.set({
    isStandalone: mode === "standalone",
    isIOS: ["iPhone", "iPad"].includes(navigator.platform),
    isAndroid: /(android)/i.test(navigator.userAgent),
  });
});

window.addEventListener("hashchange", function () {
  const element = document.getElementById("sidebar--toggle");
  if (element) {
    element.checked = false;
  }
});

new App({ target: document.body });
window.TELEDISKO_DAO_BOOTED = true;
