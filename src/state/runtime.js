import { projectKey } from "../stores/config";
import { writable } from "svelte/store";

export const errors = writable([]);
export const platform = writable({});
export const title = writable(projectKey);
export const updateAvailable = writable();

function getLogs() {
  const raw = window.localStorage.getItem("debug:logs");
  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.log("Error parsing logs");
  }
  if (parsed === null) {
    return [];
  }
  return parsed;
}

function setLogs(l) {
  window.localStorage.setItem("debug:logs", JSON.stringify(l));
}

const MAX_LOG_LENGTH = 1000;

export const logs = writable(getLogs());

export function logger(prefix) {
  return (...args) => {
    const now = new Date();
    const time = [now.getHours(), now.getMinutes(), now.getSeconds()].map((x) =>
      x.toString().padStart(2, 0)
    );
    const entry = `${time.join(":")} [${prefix}] ${args.join(" ")}`;
    logs.update((l) => {
      let items = [entry, ...l];
      const toDelete = items.length - MAX_LOG_LENGTH;
      if (toDelete > 0) {
        items.splice(-toDelete, toDelete);
      }
      setLogs(items);
      return items;
    });
  };
}
