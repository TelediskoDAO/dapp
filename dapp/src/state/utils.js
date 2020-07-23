import { writable } from "svelte/store";

function get(key, fallback) {
  const value = localStorage.getItem(key);
  return value === null ? fallback : JSON.parse(value);
}

function set(key, valueOrFunction, fallback) {
  let value;
  if (valueOrFunction instanceof Function) {
    const prev = get(key, fallback);
    value = valueOrFunction(prev);
  } else {
    value = valueOrFunction;
  }
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export function persistable(key, fallback) {
  const value = writable(get(key, fallback));
  value.subscribe((current) => {
    set(key, current);
  });
  return value;
}

export function derivable(stores, callback, initial) {
  return writable(initial, (set) => {
    let _stores;
    let unpack;
    if (!Array.isArray(stores)) {
      _stores = [stores];
      unpack = true;
    }
    const values = new Array(_stores.length);
    const unsubscribeFuncs = _stores.map((store, i) =>
      store.subscribe((value) => {
        values[i] = value;
        callback(unpack ? values[0] : values, set);
      })
    );
    return () => unsubscribeFuncs.forEach((f) => f());
  });
}

export function now() {
  const d = new Date();
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const hour = d.getHours().toString().padStart(2, "0");
  const minute = d.getMinutes().toString().padStart(2, "0");
  const second = d.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
