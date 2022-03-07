import { writable, derived, Readable } from "svelte/store";
import { signer } from "../eth";
import type {
  ResolutionManagerEntity,
  ResolutionsAcl,
  ResolutionVoter,
} from "../../types";
import { graphQLClient } from "../../net/graphQl";
import { getResolutionManagerQuery } from "../../graphql/get-resolution-manager.query";

export const currentTimestamp = writable(Date.now());

export const acl: Readable<ResolutionsAcl> = derived(signer, ($signer, set) => {
  (async () => {
    if ($signer) {
      const {
        resolutionManager,
      }: { resolutionManager: ResolutionManagerEntity } =
        await graphQLClient.request(getResolutionManagerQuery);
      const address = (await $signer.getAddress()).toLowerCase();
      set({
        canCreate: resolutionManager.contributorsAddresses.includes(address),
        canUpdate: resolutionManager.foundersAddresses.includes(address),
        canApprove: resolutionManager.foundersAddresses.includes(address),
        canVote: (resolutionVoters: ResolutionVoter[]) =>
          resolutionVoters
            .map((voter) => voter.address.toLowerCase())
            .includes(address),
        loaded: true,
      });
    } else {
      set({
        canCreate: Boolean(false),
        canUpdate: Boolean(false),
        canApprove: Boolean(false),
        canVote: (_: ResolutionVoter[]) => Boolean(false),
        loaded: Boolean(false),
      });
    }
  })();
});
