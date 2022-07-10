import { push } from "svelte-spa-router";

import { wait } from "../../async";
import { add } from "../../net/ipfs";
import { formState, resetFormState } from "../../state/resolutions/form";
import type { ResolutionFormState } from "../../types";
import type { Signer } from "ethers";
import type { ResolutionManager } from "../../../contracts/typechain";
import notifications, {
  notifyNetworkError,
  notifyBlockchainError,
} from "../../helpers/notifications";

const WAIT_AFTER_UPDATED = 10000;

export async function handleUpdate(
  resolutionId: string,
  {
    $signer,
    $currentResolution,
    $resolutionContract,
  }: {
    $signer: Signer;
    $resolutionContract: ResolutionManager;
    $currentResolution: ResolutionFormState;
  }
) {
  if (!$signer) {
    return push("/connect/odoo");
  }
  formState.set({
    loading: true,
    awaitingConfirmation: false,
  });
  try {
    const ipfsId = await add($currentResolution);
    const tx = await $resolutionContract.updateResolution(
      resolutionId,
      ipfsId,
      Number($currentResolution.typeId),
      $currentResolution.isNegative,
      [],
      []
    );
    formState.set({
      loading: true,
      awaitingConfirmation: true,
    });
    const timeout = setTimeout(notifyNetworkError, 20000);
    await tx.wait();
    clearTimeout(timeout);
    formState.set({
      loading: true,
      awaitingConfirmation: false,
    });
    notifications.success(
      "Resolution draft updated! If you don't see the updated draft on the UI, no worries, it will get updated in some seconds.",
      {
        timeout: WAIT_AFTER_UPDATED,
      }
    );
    await wait(WAIT_AFTER_UPDATED);
    location.reload();
  } catch (err) {
    notifyBlockchainError(err.message);
  }

  resetFormState();
}
