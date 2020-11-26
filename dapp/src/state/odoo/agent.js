import { derived } from "svelte/store";
import { persistable } from "src/state/utils";
import { clock } from "src/state/clock";
import { session } from "src/net/odoo";

const URL = "https://odoo.teledisko.com/jsonrpc";
const DB = "teledisko";

export const username = persistable("odoo.username", "");
export const password = persistable("odoo.password", "");

let lastRefresh = 0;
export const refresh = derived(clock, ($clock, set) => {
  if ($clock - lastRefresh > 60000) {
    lastRefresh = $clock;
    set($clock);
  }
});

export const agent = derived(
  [username, password],
  async ([$username, $password], set) => {
    if ($username && $password) {
      const s = await session(URL, DB, $username, $password);
      window.odooAgent = s;
      set(s);
    } else {
      set(null);
    }
  },
  null
);

export async function connectToOdoo(u, p) {
  const s = await session(URL, DB, u, p);
  if (s.uid === false) {
    throw new Error("Login error");
  }
  username.set(u);
  password.set(p);
}
