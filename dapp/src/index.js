//import { version } from "../package.json";
import "src/styles/index.scss";
import App from "./App.svelte";
import { errors } from "src/state/runtime";

window.addEventListener("error", function (event) {
  errors.update(($errors) => [event, ...$errors]);
});
window.addEventListener("unhandledrejection", function (event) {
  errors.update(($errors) => [event, ...$errors]);
});

new App({ target: document.body });
