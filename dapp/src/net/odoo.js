import { v4 as uuidv4 } from "uuid";

async function jsonRpc(url, method, params) {
  const data = {
    jsonrpc: "2.0",
    method: method,
    params: params,
    id: uuidv4(),
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (json.result !== undefined) {
    return json.result;
  } else if (json.error.data.message !== undefined) {
    throw new Error(json.error.data.message);
  } else {
    throw new Error(response);
  }
}

async function call(url, service, method, ...args) {
  return await jsonRpc(url, "call", {
    service: service,
    method: method,
    args: args,
  });
}

function tuplify(query = {}) {
  const params = [];
  for (let key of Object.keys(query)) {
    params.push([key, "=", query[key]]);
  }
  return params;
}

export async function session(url, db, username, password) {
  const uid = await call(url, "common", "login", db, username, password);
  const model = call.bind(null, url, "object", "execute_kw", db, uid, password);
  return {
    create: async (name, object) => model(name, "create", [object]),
    read: async (name, ids) => model(name, "read", [ids]),
    search: async (name, query) => model(name, "search_read", [tuplify(query)]),
    update: async (name, id, object) => model(name, "write", [[id], object]),
    remove: async (name, ids) => model(name, "unlink", [ids]),
    uid,
  };
}
