import { push } from "svelte-spa-router";
import { notifier } from "@beyonk/svelte-notifications";

import { wait } from "../../async";
import { votingState, resetVotingState } from "../../state/resolutions/voting";
import type { Signer } from "ethers";
import type { ResolutionManager } from "../../../contracts/typechain/ResolutionManager";

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
    const timeout = setTimeout(() => {
      notifier.danger(
        "It looks there's some congestion in the network, please try again later!",
        5000
      );
    }, 20000);
    await tx.wait();
    clearTimeout(timeout);
    votingState.set({
      loading: true,
      awaitingConfirmation: false,
    });
    notifier.success("Resolution voted!", WAIT_AFTER_VOTE);
    await wait(WAIT_AFTER_VOTE);
    push(`/resolutions/`);
  } catch (err) {
    console.error("err: ", err);
    notifier.danger(err.message, 7000);
  }

  resetVotingState();
}
