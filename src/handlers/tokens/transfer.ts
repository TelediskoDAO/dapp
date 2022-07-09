import { push } from "svelte-spa-router";

import { transferState, resetTransferState } from "../../state/tokens/transfer";
import type { Signer } from "ethers";
import type { TelediskoToken } from "../../../contracts/typechain/contracts/TelediskoToken/TelediskoToken";
import { parseEther } from "ethers/lib/utils";
import notifications, {
  notifyNetworkError,
  notifyBlockchainError,
} from "../../helpers/notifications";

const WAIT_AFTER_OFFER = 10000;

export async function handleTransfer(
  transferAmount: number,
  to: string,
  {
    $signer,
    $tokenContract,
  }: { $signer: Signer; $tokenContract: TelediskoToken }
) {
  if (!$signer) {
    return push("/connect/odoo");
  }

  let success = false;

  transferState.set({
    loading: true,
    awaitingConfirmation: false,
  });
  try {
    const tx = await $tokenContract.transfer(
      to,
      parseEther(String(transferAmount))
    );
    transferState.set({
      loading: true,
      awaitingConfirmation: true,
    });
    const timeout = setTimeout(notifyNetworkError, 20000);
    await tx.wait();
    clearTimeout(timeout);
    transferState.set({
      loading: true,
      awaitingConfirmation: false,
    });
    notifications.success(
      "Transfer succeeded! Just a matter of seconds and the UI will get updated",
      { timeout: WAIT_AFTER_OFFER }
    );
    success = true;
  } catch (err) {
    notifyBlockchainError(err.message);
    success = false;
  }

  resetTransferState();

  return success;
}
