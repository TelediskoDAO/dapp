//import { version } from "../package.json";

import CONFIG from "./config";
import "src/styles/index.scss";
import App from "./App.svelte";
import { errors, platform } from "src/state/runtime";

console.log("Config is", CONFIG);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").then((registration) => {
    console.log("[Client] service worker registered");
    registration.addEventListener("updatefound", () => {
      console.log("[Client] update found");
      let newWorker = registration.installing;
      newWorker.addEventListener("statechange", () => {
        if (
          newWorker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          confirm("A new version of the app is available, refresh?") &&
            newWorker.postMessage({ action: "skipWaiting" });
        }
      });
    });
  });

  let refreshing;
  navigator.serviceWorker.addEventListener("controllerchange", function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

// Display errors
window.addEventListener("error", function (event) {
  errors.update(($errors) => [event, ...$errors]);
});
window.addEventListener("unhandledrejection", function (event) {
  errors.update(($errors) => [event, ...$errors]);
});

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

new App({ target: document.body });
