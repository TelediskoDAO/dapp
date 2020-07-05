import { writable } from "svelte/store";

function get(key, fallback) {
  const value = localStorage.getItem(key);
  return value === undefined ? fallback : JSON.parse(value);
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
    let unpack;
    if (!Array.isArray(stores)) {
      stores = [stores];
      unpack = true;
    }
    const values = new Array(stores.length);
    const unsubscribeFuncs = stores.map((store, i) =>
      store.subscribe((value) => {
        values[i] = value;
        callback(unpack ? values[0] : values, set);
      })
    );
    return () => unsubscribeFuncs.forEach((f) => f());
  });
}
