import { push } from "svelte-spa-router";
import { notifier } from "@beyonk/svelte-notifications";

import { formState, resetFormState } from "../../state/resolutions/form";
import { wait } from "../../async";
import type { Signer } from "ethers";
import type { ResolutionManager } from "../../../contracts/typechain/ResolutionManager";

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
    console.log("err: ", err);
    notifier.danger(err.message, 7000);
  }

  resetFormState();
}
