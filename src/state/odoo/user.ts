import { derived, writable } from "svelte/store";
import { derivable } from "../../state/utils";

import { agent } from "./agent";

export const uid = derivable(agent, ($agent) => $agent && $agent.uid);
//export const uid = derivable(agent, ($agent) => 7); //$agent && $agent.uid);

// @ts-ignore
export const user = derived(agent, async ($agent, set) => {
  if ($agent) {
    let data;
    try {
      [data] = await $agent.read("res.users", $agent.uid);

      set({
        uid: data.id,
        name: data.name,
        image: data.image_medium,
        address: data.ethereum_address,
      });
    } catch (e) {
      userError.set(
        "There is an error logging you in, please update your login details."
      );
    }
  } else {
    set(null);
  }
});

export const userError = writable<string | undefined>();
