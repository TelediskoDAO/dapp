import { derived } from "svelte/store";
import { derivable } from "src/state/utils";

import { agent } from "./agent";

export const uid = derivable(agent, ($agent) => $agent && $agent.uid);

export const user = derived(agent, async ($agent, set) => {
  if ($agent) {
    const [data] = await $agent.read("res.users", $agent.uid);
    set({
      name: data.name,
      image: data.image_medium,
    });
  } else {
    set(null);
  }
});
