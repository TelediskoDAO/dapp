import { derived } from "svelte/store";
import { persistable, derivable } from "../utils";
import { clock } from "../clock";
import { session } from "../../net/odoo";
import { odooEndpoint as URL, odooDbName as DB } from "../../stores/config";

export const username = persistable("odoo.username", "");
export const password = persistable("odoo.password", "");

let lastRefresh = Date.now();

export const refresh = derivable(
  clock,
  ($clock, set) => {
    if ($clock - lastRefresh > 60000) {
      lastRefresh = $clock;
      set($clock);
    }
  },
  lastRefresh
);

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
