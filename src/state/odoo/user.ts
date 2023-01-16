import { projectKey } from "../../stores/config";
import { derived, writable, type Readable } from "svelte/store";
import { derivable } from "../../state/utils";
import type { OdooUser, UsersWithEthereumAddress } from "../../types";

import { agent } from "./agent";

export const uid = derivable(agent, ($agent) => $agent && $agent.uid);

// @ts-ignore
export const user = derived(agent, async ($agent, set) => {
  if ($agent) {
    try {
      const [data] = await $agent.read("res.users", $agent.uid);

      set({
        uid: data.id,
        name: data.name,
        image: projectKey === "teledisko" ? data.image_medium : data.avatar_256,
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

export const usersList: Readable<OdooUser[]> = derived(
  agent,
  // @ts-ignore
  async ($agent, set) => {
    if ($agent) {
      try {
        let data: OdooUser[] = await $agent.search("res.users", [], {
          fields:
            projectKey === "teledisko"
              ? ["display_name", "email", "ethereum_address", "image"]
              : ["display_name", "email", "ethereum_address", "avatar_256"],
        });
        if (projectKey === "neokingdom") {
          data = data.map((d) => ({ ...d, image: d.avatar_256 }));
        }
        set(data);
      } catch (e) {
        userError.set(
          "There is an error logging you in, please update your login details."
        );
      }
    } else {
      set([]);
    }
  }
);

export const usersWithEthereumAddress: Readable<UsersWithEthereumAddress> =
  derived(usersList, ($usersList, set) => {
    if ($usersList) {
      const usersObj = $usersList.reduce(
        (obj: UsersWithEthereumAddress, user) =>
          user.ethereum_address
            ? {
                ...obj,
                [user.ethereum_address.toLowerCase()]: {
                  displayName: user.display_name,
                  email: user.email,
                  image: user.image,
                  ethereumAddress: user.ethereum_address.toLowerCase(),
                },
              }
            : obj,
        {}
      );

      set(usersObj);
    } else {
      set({});
    }
  });

export const userError = writable<string | undefined>();
