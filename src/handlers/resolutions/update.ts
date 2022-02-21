import { push } from "svelte-spa-router";
import { add } from "../../net/ipfs";
import { formState, resetFormState } from "../../state/resolutions/form";
import { notifier } from "@beyonk/svelte-notifications";

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
    notifier.success("Resolution draft updated!", 9000);
    setTimeout(location.reload, WAIT_AFTER_UPDATED);
  } catch (err) {
    notifier.danger(err.message, 7000);
  }

  resetFormState();
}
