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
