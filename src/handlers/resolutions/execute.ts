import { push } from "svelte-spa-router";

import { wait } from "../../async";
import {
  executeState,
  resetExecuteState,
} from "../../state/resolutions/execute";
import type { Signer } from "ethers";
import type { ResolutionManager } from "../../../contracts/typechain";
import notifications, {
  notifyNetworkError,
  notifyBlockchainError,
} from "../../helpers/notifications";

const WAIT_AFTER_VOTE = 10000;

export async function handleExecute(
  resolutionId: string,
  {
    $signer,
    $resolutionContract,
  }: { $signer: Signer; $resolutionContract: ResolutionManager }
) {
  if (!$signer) {
    return push("/connect/odoo");
  }

  executeState.set({
    loading: true,
    awaitingConfirmation: false,
  });
  try {
    const tx = await $resolutionContract.executeResolution(resolutionId);
    executeState.set({
      loading: true,
      awaitingConfirmation: true,
    });
    const timeout = setTimeout(notifyNetworkError, 20000);
    await tx.wait();
    clearTimeout(timeout);
    executeState.set({
      loading: true,
      awaitingConfirmation: false,
    });
    notifications.success("Resolution executed!", { timeout: WAIT_AFTER_VOTE });
    await wait(WAIT_AFTER_VOTE);
    push(`/resolutions/`);
  } catch (err) {
    notifyBlockchainError(err.message);
  }

  resetExecuteState();
}
