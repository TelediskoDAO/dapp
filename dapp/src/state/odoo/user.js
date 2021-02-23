import { derived } from "svelte/store";
import { derivable } from "src/state/utils";

import { agent } from "./agent";

export const uid = derivable(agent, ($agent) => $agent && $agent.uid);
//export const uid = derivable(agent, ($agent) => 7); //$agent && $agent.uid);

export const user = derived(agent, async ($agent, set) => {
  if ($agent) {
    const [data] = await $agent.read("res.users", $agent.uid);
    set({
      uid: data.id,
      name: data.name,
      image: data.image_medium,
      address: data.ethereum_address,
    });
  } else {
    set(null);
  }
});
