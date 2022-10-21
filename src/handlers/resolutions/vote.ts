import { push } from "svelte-spa-router";

import { wait } from "../../async";
import { votingState, resetVotingState } from "../../state/resolutions/voting";
import type { Signer } from "ethers";
import type { ResolutionManager } from "../../../contracts/typechain";
import notifications, {
  notifyNetworkError,
  notifyBlockchainError,
} from "../../helpers/notifications";

const WAIT_AFTER_VOTE = 10000;

export async function handleVote(
  resolutionId: string,
  isYes: boolean,
  {
    $signer,
    $resolutionContract,
  }: { $signer: Signer; $resolutionContract: ResolutionManager }
) {
  if (!$signer) {
    return push("/connect/odoo");
  }

  votingState.set({
    loading: true,
    awaitingConfirmation: false,
  });
  try {
    const tx = await $resolutionContract.vote(resolutionId, isYes);
    votingState.set({
      loading: true,
      awaitingConfirmation: true,
    });
    const timeout = setTimeout(notifyNetworkError, 20000);
    await tx.wait();
    clearTimeout(timeout);
    votingState.set({
      loading: true,
      awaitingConfirmation: false,
    });
    notifications.success(
      "Resolution voted! If you don't see your vote in the resolution, no worries. It's just a matter of seconds and it will get updated",
      { timeout: WAIT_AFTER_VOTE }
    );
    await wait(WAIT_AFTER_VOTE);
    push(`/resolutions/`);
  } catch (err) {
    notifyBlockchainError(err.message);
  }

  resetVotingState();
}
