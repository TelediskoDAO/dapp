import { push } from "svelte-spa-router";

import { wait } from "../../async";
import { offerState, resetOfferState } from "../../state/tokens/offer";
import type { Signer } from "ethers";
import type { TelediskoToken } from "../../../contracts/typechain/contracts/TelediskoToken/TelediskoToken";
import { parseEther } from "ethers/lib/utils";
import notifications, {
  notifyNetworkError,
  notifyBlockchainError,
} from "../../helpers/notifications";

const WAIT_AFTER_OFFER = 10000;

export async function handleOffer(
  offerAmount: number,
  {
    $signer,
    $tokenContract,
  }: { $signer: Signer; $tokenContract: TelediskoToken }
) {
  if (!$signer) {
    return push("/connect/odoo");
  }

  offerState.set({
    loading: true,
    awaitingConfirmation: false,
  });
  try {
    const tx = await $tokenContract.createOffer(
      parseEther(String(offerAmount))
    );
    offerState.set({
      loading: true,
      awaitingConfirmation: true,
    });
    const timeout = setTimeout(notifyNetworkError, 20000);
    await tx.wait();
    clearTimeout(timeout);
    offerState.set({
      loading: true,
      awaitingConfirmation: false,
    });
    notifications.success(
      "Offer succeeded! Just a matter of seconds and the UI will get updated",
      { timeout: WAIT_AFTER_OFFER }
    );
    await wait(WAIT_AFTER_OFFER);
  } catch (err) {
    notifyBlockchainError(err.message);
  }

  resetOfferState();
}
