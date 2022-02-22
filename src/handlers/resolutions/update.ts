import { notifier } from "@beyonk/svelte-notifications";
import { push } from "svelte-spa-router";
import { wait } from "../../async";

import { add } from "../../net/ipfs";
import { formState, resetFormState } from "../../state/resolutions/form";

const WAIT_AFTER_UPDATED = 10000;

export async function handleUpdate(
  resolutionId: string,
  { $signer, $currentResolution, $resolutionContract }
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
      $currentResolution.type,
      $currentResolution.isNegative
    );
    formState.set({
      loading: true,
      awaitingConfirmation: true,
    });
    await tx.wait();
    formState.set({
      loading: true,
      awaitingConfirmation: false,
    });
    notifier.success("Resolution draft updated!", WAIT_AFTER_UPDATED);
    await wait(WAIT_AFTER_UPDATED);
    location.reload();
  } catch (err) {
    notifier.danger(err.message, 7000);
  }

  resetFormState();
}
