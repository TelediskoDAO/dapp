import { writable } from "svelte/store";

export function get(key, fallback = undefined) {
  const value = localStorage.getItem(key);
  return value === null ? fallback : JSON.parse(value);
}

export function set(key, valueOrFunction, fallback = undefined) {
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

export function persistable<T>(key: string, fallback: T) {
  const value = writable<T>(get(key, fallback));
  value.subscribe((current) => {
    set(key, current);
  });
  return value;
}

export function derivable(stores, callback, initial = undefined) {
  const hasSet = callback.length === 2;
  return writable(initial, (set) => {
    let _stores = stores;
    let unpack;
    if (!Array.isArray(stores)) {
      _stores = [stores];
      unpack = true;
    }
    const values = new Array(_stores.length);
    const unsubscribeFuncs = _stores.map((store, i) =>
      store.subscribe(async (value) => {
        values[i] = value;
        const setWrap = (v) => {
          set(v);
        };
        const result = callback(unpack ? values[0] : values, setWrap);
        if (!hasSet) {
          set(result);
        }
      })
    );
    return () => unsubscribeFuncs.forEach((f) => f());
  });
}


export function group(x, attr = "id") {
  const d = {};
  for (const k in x) {
    d[x[k][attr]] = x[k];
  }
  return d;
}

export function map(x, callback) {
  if (Array.isArray(x)) {
    return x.map(callback);
  } else {
    const result = {};
    for (const key in x) {
      result[key] = callback(x[key]);
    }
    return result;
  }
}