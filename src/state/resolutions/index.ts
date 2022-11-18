import { writable, derived, type Readable } from "svelte/store";
import type {
  DaoManagerEntity,
  ResolutionsAcl,
  ResolutionVoter,
} from "../../types";
import { graphQLClient } from "../../net/graphQl";
import { getDaoManagerQuery } from "../../graphql/get-dao-manager.query";
import { signer } from "../../stores/wallet";

export const currentTimestamp = writable(Date.now());

export const acl: Readable<ResolutionsAcl> = derived(signer, ($signer, set) => {
  (async () => {
    if ($signer) {
      const { daoManager }: { daoManager: DaoManagerEntity } =
        await graphQLClient.request(getDaoManagerQuery);
      const address = (await $signer.getAddress()).toLowerCase();
      const isContributor = daoManager.contributorsAddresses.includes(address);
      const isManagingBoard =
        daoManager.managingBoardAddresses.includes(address);
      set({
        canCreate: isContributor,
        canUpdate: isManagingBoard,
        canApprove: isManagingBoard,
        canVote: (resolutionVoters: ResolutionVoter[]) =>
          resolutionVoters
            .map((voter) => voter.address.toLowerCase())
            .includes(address),
        loaded: true,
        isShareholder: daoManager.shareholdersAddresses.includes(address),
        isManagingBoard,
        isContributor,
      });
    } else {
      set({
        canCreate: Boolean(false),
        canUpdate: Boolean(false),
        canApprove: Boolean(false),
        canVote: (_: ResolutionVoter[]) => Boolean(false),
        loaded: Boolean(false),
        isShareholder: Boolean(false),
        isManagingBoard: Boolean(false),
        isContributor: Boolean(false),
      });
    }
  })();
});
