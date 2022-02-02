import { ethers, Signer } from "ethers";
import { writable, readable, derived, Readable } from "svelte/store";
import { clock } from "./clock";
import { user } from "./odoo/user";
import { get, set } from "./utils";
import CONFIG from "../config";

import networks from "../contracts/networks.json";
import {
  ERC20,
  ERC20__factory,
  ResolutionMock,
  ResolutionMock__factory,
} from "../contracts";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const hasAgent = readable(window.ethereum !== undefined);

if (get("autoconnect")) {
  console.log("Autoconnect to wallet");
  connect();
}

export async function connect() {
  let p: ethers.providers.Web3Provider;
  if (window.ethereum !== undefined) {
    try {
      await window.ethereum.enable();
    } catch (e) {
      console.log(e);
      throw new Error("Authentication denied");
    }
    p = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    throw new Error("No Web3 provider available");
  }
  wallet.set(p);
  set("autoconnect", true);
  return p;
}

/*
export const signer = writable(undefined, (set) => {
  if (window.ethereum && window.ethereum.selectedAddress) {
    const p = new ethers.providers.Web3Provider(window.ethereum);
    p.getNetwork().then((network) => {
      if (network.name !== CONFIG.network) {
        networkMismatchError.set({ has: network.name, want: CONFIG.network });
      } else {
        networkMismatchError.set(undefined);
        set(new ethers.providers.Web3Provider(window.ethereum));
      }
    });
    p.listAccounts().then(accounts => {

    })
  }
});
*/

const wallet = writable<ethers.providers.Web3Provider | undefined>(undefined);

export const signer: Readable<Signer> = derived(
  [wallet, user],
  // @ts-ignore
  async ([$wallet, $user], set) => {
    if ($wallet && $user) {
      const network = await $wallet.getNetwork();
      if (network.name !== CONFIG.network) {
        networkMismatchError.set({ has: network.name, want: CONFIG.network });
      } else {
        networkMismatchError.set(undefined);
        set(new ethers.providers.Web3Provider(window.ethereum).getSigner());
      }
      const [account] = await $wallet.listAccounts();
      // @ts-ignore
      if (account !== $user.address) {
        // @ts-ignore
        addressMismatchError.set({ has: account, want: $user.address });
      }
    }
  }
);

export const networkMismatchError = writable(undefined);
export const addressMismatchError = writable(undefined);

// @ts-ignore
export const network = derived(signer, async ($signer, set) =>
  // @ts-ignore
  set((await $signer.getNetwork()).name)
);

// @ts-ignore
export const chainId = derived(signer, async ($signer, set) =>
  // @ts-ignore
  set((await $signer.getNetwork()).chainId)
);

export const provider = derived(
  signer,
  ($signer) => $signer || new ethers.providers.JsonRpcProvider(CONFIG.endpoint)
);

export const address = derived(
  [signer, user, clock],
  // @ts-ignore
  async ([$signer, $user, $clock], set) => {
    if ($signer) {
      // @ts-ignore
      const [account] = await $signer.listAccounts();
      // @ts-ignore
      if (account !== $user.address) {
        // @ts-ignore
        addressMismatchError.set({ has: account, want: $user.address });
        // @ts-ignore
        set();
      } else {
        set(account);
      }
    }
  }
);

// @ts-ignore
export const tokenContract: Readable<ERC20> = derived(
  signer,
  // @ts-ignore
  async ($signer, set) => {
    if ($signer) {
      const chainId = await $signer.getChainId();
      const address: string = networks[chainId.toString()]["TelediskoToken"];
      const contract = ERC20__factory.connect(address, $signer);
      set(contract);
    }
  }
);

export const balance = derived(
  [user, tokenContract],
  // @ts-ignore
  async ([$user, $tokenContract], set) => {
    if ($user && $tokenContract) {
      // @ts-ignore
      const address: string = $user.address;
      set(await $tokenContract.balanceOf(address));
    }
  }
);

export const resolutionContract: Readable<ResolutionMock> = derived(
  signer,
  // @ts-ignore
  async ($signer, set) => {
    if ($signer) {
      const chainId = await $signer.getChainId();
      const address: string = networks[chainId.toString()]["ResolutionMock"];
      const contract = ResolutionMock__factory.connect(address, $signer);
      set(contract);

      try {
        const tx = await contract.createResolution('whatever', 0) // sign (metamask popup will appear) + send (transaction will be in the mempull)
        const receipt = await tx.wait() // waiting for the transaction to be put on a block
      } catch (error) {
        // if user denies to sign i.e. etc or closes the metamask popup?
      }

      // console.log('receipt: ', receipt.blockHash);

      // 3 states for a transaction
      // 1 signed locally
      // 2 mempull (awaiting to be "finalized")
      // 3 finalized
    }
  }
);
