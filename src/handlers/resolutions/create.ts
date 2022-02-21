import { notifier } from "@beyonk/svelte-notifications";
import { push } from "svelte-spa-router";
import { add } from "../../net/ipfs";

import { formState, resetFormState } from "../../state/resolutions/form";

export async function handleCreate({
  $signer,
  $currentResolution,
  $resolutionContract,
}) {
  if (!$signer) {
    return push("/connect/odoo");
  }
  formState.set({
    loading: true,
    awaitingConfirmation: false,
  });
  try {
    const ipfsId = await add($currentResolution);
    const tx = await $resolutionContract.createResolution(
      ipfsId,
      $currentResolution.type,
      $currentResolution.isNegative
    );
    formState.set({
      loading: true,
      awaitingConfirmation: true,
    });
    await tx.wait();
    notifier.success("Resolution draft created!", 5000);
    push("/resolutions");
  } catch (err) {
    notifier.danger(err.message, 7000);
  }

  resetFormState();
}
