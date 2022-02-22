import { notifier } from "@beyonk/svelte-notifications";
import { push } from "svelte-spa-router";
import { add } from "../../net/ipfs";

import { formState, resetFormState } from "../../state/resolutions/form";
import { wait } from "../../async";

const WAIT_AFTER_CREATE = 7000;

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
    formState.set({
      loading: true,
      awaitingConfirmation: false,
    });
    notifier.success("Resolution draft created!", WAIT_AFTER_CREATE);
    await wait(WAIT_AFTER_CREATE);
    push("/resolutions");
  } catch (err) {
    notifier.danger(err.message, 7000);
  }

  resetFormState();
}
