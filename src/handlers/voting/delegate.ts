import { push } from "svelte-spa-router";

// import { formState, resetFormState } from "../../state/resolutions/form";
// import { wait } from "../../async";
import type { Signer } from "ethers";
import type { Voting } from "../../../contracts/typechain";
import notifications, {
  notifyNetworkError,
  notifyBlockchainError,
} from "../../helpers/notifications";

const WAIT_AFTER_APPROVED = 10000;

export async function handleDelegate(
  delegateAddress: string,
  { $signer, $votingContract }: { $signer: Signer; $votingContract: Voting }
) {
  if (!$signer) {
    return push("/connect/odoo");
  }

  // formState.set({
  //   loading: true,
  //   awaitingConfirmation: false,
  // });
  try {
    const tx = await $votingContract.delegate(delegateAddress);
    // formState.set({
    //   loading: false,
    //   awaitingConfirmation: true,
    // });
    const timeout = setTimeout(notifyNetworkError, 20000);
    await tx.wait();
    clearTimeout(timeout);
    // formState.set({
    //   loading: true,
    //   awaitingConfirmation: false,
    // });
    const address = (await $signer.getAddress()).toLowerCase();
    if (address === delegateAddress.toLowerCase()) {
      notifications.success(`You successfully removed the delegation`, {
        timeout: WAIT_AFTER_APPROVED,
      });
    } else {
      notifications.success(`You successfully delegated ${delegateAddress}`, {
        timeout: WAIT_AFTER_APPROVED,
      });
    }
  } catch (err) {
    notifyBlockchainError(err.message);
  }

  // resetFormState();
}
