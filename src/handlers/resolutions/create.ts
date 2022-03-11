import { notifier } from "@beyonk/svelte-notifications";
import { push } from "svelte-spa-router";

import { add } from "../../net/ipfs";
import { formState, resetFormState } from "../../state/resolutions/form";
import { wait } from "../../async";
import type { ResolutionFormState } from "../../types";
import type { Signer } from "ethers";
import type { ResolutionManager } from "../../../contracts/typechain/ResolutionManager";

const WAIT_AFTER_CREATE = 7000;

export async function handleCreate({
  $signer,
  $currentResolution,
  $resolutionContract,
}: {
  $signer: Signer;
  $resolutionContract: ResolutionManager;
  $currentResolution: ResolutionFormState;
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
        5000
      );
    }, 20000);
    await tx.wait();
    clearTimeout(timeout);
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
