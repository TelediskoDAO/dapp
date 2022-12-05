import App from "./App.svelte";
import { platform } from "./state/runtime";

const target = document.getElementById("app");
let app: App;

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

if (target) {
  app = new App({
    target,
  });
  window.TELEDISKO_DAO_BOOTED = true;
} else {
  throw "Error: mount point for app doesn't exist.";
}
export default app;
