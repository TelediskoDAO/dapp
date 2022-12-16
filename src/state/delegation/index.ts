import { type Readable, derived, writable } from "svelte/store";
import type { DelegationStatus, DelegationUser } from "../../types";
import { graphQLClient } from "../../net/graphQl";
import { getDelegationUsers } from "../../graphql/get-delegation-users.query";
import { signer } from "../../stores/wallet";

export const formState = writable({
  loading: false,
  awaitingConfirmation: false,
});

export const resetFormState = () => {
  formState.set({
    loading: false,
    awaitingConfirmation: false,
  });
};

export const delegationRefreshTimestamp = writable(Date.now());

export const delegationStatus: Readable<DelegationStatus> = derived(
  [signer, delegationRefreshTimestamp],
  ([$signer], set) => {
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
        // if this is null it means noone has delegated current user, and therefore they can delegate
        const signerDelegatedBy = delegationUsers.filter(
          (user) =>
            user.address.toLocaleLowerCase() !== address &&
            user.delegated.toLocaleLowerCase() === address
        );
        set({
          signerDelegatedBy,
          signerDelegationStatus: signerStatus,
          usersList: delegationUsers
            .filter((user) => user.address.toLowerCase() !== address)
            .map((user) => ({
              ...user,
              canBeDelegated:
                user.address === user.delegated &&
                signerDelegatedBy.length === 0,
            })),
        });
      } else {
        set({
          signerDelegatedBy: [],
          signerDelegationStatus: null,
          usersList: [],
        });
      }
    })();
  }
);
