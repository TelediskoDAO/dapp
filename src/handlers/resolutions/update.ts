import { notifier } from "@beyonk/svelte-notifications";
import { push } from "svelte-spa-router";

import { wait } from "../../async";
import { add } from "../../net/ipfs";
import { formState, resetFormState } from "../../state/resolutions/form";
import type { ResolutionFormState } from "../../types";
import type { Signer } from "ethers";
import type { ResolutionManager } from "../../../contracts/typechain/ResolutionManager";

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
      $currentResolution.isNegative
    );
    formState.set({
      loading: true,
      awaitingConfirmation: true,
    });
    const timeout = setTimeout(() => {
      notifier.danger(
        "It looks there's some congestion in the network, please try again later!",
        WAIT_AFTER_UPDATED
      );
    }, 20000);
    await tx.wait();
    clearTimeout(timeout);
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
