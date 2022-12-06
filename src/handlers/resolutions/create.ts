import { push } from "svelte-spa-router";

import { add } from "../../net/ipfs";
import { formState, resetFormState } from "../../state/resolutions/form";
import { wait } from "../../async";
import type { ResolutionFormState } from "../../types";
import type { Signer } from "ethers";
import type { ResolutionManager } from "../../../contracts/typechain";
import notifications, {
  notifyNetworkError,
  notifyBlockchainError,
} from "../../helpers/notifications";

const WAIT_AFTER_CREATE = 7000;

export async function handleCreate({
  $signer,
  $currentResolution,
  $resolutionContract,
  vetoTypeId,
  executionTo = [],
  executionData = [],
}: {
  $signer: Signer;
  $resolutionContract: ResolutionManager;
  $currentResolution: ResolutionFormState;
  vetoTypeId: string | null;
  executionTo: string[];
  executionData: string[];
}) {
  console.log("executionData: ", executionData);
  console.log("executionTo: ", executionTo);
  if (!$signer) {
    return push("/connect/odoo");
  }
  formState.set({
    loading: true,
    awaitingConfirmation: false,
  });
  try {
    const ipfsId = await add($currentResolution);
    const resolutionId = Number(vetoTypeId || $currentResolution.typeId);
    const tx = await $resolutionContract.createResolution(
      ipfsId,
      resolutionId,
      !!vetoTypeId,
      executionTo,
      executionData
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
      "Resolution draft created! If the resolution doesn't appear on the list, no worries. It will appear in some seconds.",
      {
        timeout: WAIT_AFTER_CREATE,
      }
    );
    await wait(WAIT_AFTER_CREATE);
    push("/resolutions");
  } catch (err) {
    notifyBlockchainError(err.message);
  }

  resetFormState();
}
