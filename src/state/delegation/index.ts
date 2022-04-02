import { Readable, derived, writable } from "svelte/store";
import type { DelegationUser } from "../../types";
import { signer } from "../eth";
import { graphQLClient } from "../../net/graphQl";
import { getDelegationUsers } from "../../graphql/get-delegation-users.query";

export const delegationRefreshTimestamp = writable(Date.now());

export const delegationStatus: Readable<any> = derived(
  [signer, delegationRefreshTimestamp],
  ([$signer, $timestamp], set) => {
    (async () => {
      if ($signer) {
        const {
          delegationUsers,
        }: {
          delegationUsers: DelegationUser[];
        } = await graphQLClient.request(getDelegationUsers);
        const address = (await $signer.getAddress()).toLowerCase();
        const signerStatus = delegationUsers.find(
          (user) => user.address.toLowerCase() === address
        );
        const delegatableUsers = delegationUsers.filter(
          (user) =>
            user.address.toLowerCase() !== address &&
            user.address === user.delegated
        );
        const nonDelegatableUsers = delegationUsers.filter(
          (user) =>
            user.address.toLowerCase() !== address &&
            user.address !== user.delegated
        );
        set({
          // if noone has delegated me, I can delegate
          signerCanDelegate: !delegatableUsers.some(
            (user) => user.delegated.toLowerCase() === address
          ),
          signerDelegationStatus: signerStatus,
          delegatableUsers,
          nonDelegatableUsers,
        });
      } else {
        set({
          signerCanDelegate: Boolean(false),
          signerHasDelegated: Boolean(false),
          delegatableUsers: [],
          nonDelegatableUsers: [],
        });
      }
    })();
  }
);
