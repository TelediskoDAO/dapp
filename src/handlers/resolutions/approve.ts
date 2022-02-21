import { push } from "svelte-spa-router";
import { formState, resetFormState } from "../../state/resolutions/form";
import { notifier } from "@beyonk/svelte-notifications";
import { wait } from "../../async";

const WAIT_AFTER_APPROVED = 10000;

export async function handleApprove(
  resolutionId: string,
  { $signer, $resolutionContract }
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
      loading: true,
      awaitingConfirmation: true,
    });
    await tx.wait();
    formState.set({
      loading: true,
      awaitingConfirmation: false,
    });
    notifier.success("Resolution approved!", WAIT_AFTER_APPROVED);
    await wait(WAIT_AFTER_APPROVED);
    push(`/resolutions/${resolutionId}`);
  } catch (err) {
    notifier.danger(err.message, 7000);
  }

  resetFormState();
}
