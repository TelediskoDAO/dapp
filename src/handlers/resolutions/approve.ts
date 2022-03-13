import { push } from "svelte-spa-router";

import { formState, resetFormState } from "../../state/resolutions/form";
import { wait } from "../../async";
import type { Signer } from "ethers";
import type { ResolutionManager } from "../../../contracts/typechain/ResolutionManager";
import notifications, {
  notifyNetworkError,
  notifyBlockchainError,
} from "../../helpers/notifications";

const WAIT_AFTER_APPROVED = 10000;

export async function handleApprove(
  resolutionId: string,
  {
    $signer,
    $resolutionContract,
  }: { $signer: Signer; $resolutionContract: ResolutionManager }
) {
  if (!$signer) {
    return push("/connect/odoo");
  }

  formState.set({
    loading: true,
    awaitingConfirmation: false,
  });
  try {
    const tx = await $resolutionContract.approveResolution(resolutionId);
    formState.set({
      loading: false,
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
      "Resolution approved! If you still see the resolution in pre-draft state, no worries. It will get updated after some seconds",
      {
        timeout: WAIT_AFTER_APPROVED,
      }
    );
    await wait(WAIT_AFTER_APPROVED);
    push(`/resolutions/${resolutionId}`);
  } catch (err) {
    notifyBlockchainError(err.message);
  }

  resetFormState();
}
