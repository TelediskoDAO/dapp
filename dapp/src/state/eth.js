import ethers from "ethers";
import erc20ABI from "../contracts/erc20.abi.json";
import { writable, readable, derived } from "svelte/store";
import { clock } from "./clock";
import { user } from "./odoo/user";
import { get, set } from "./utils";
import CONFIG from "../config";

export const hasAgent = readable(window.ethereum !== undefined);

if (get("autoconnect")) {
  console.log("Autoconnect to wallet");
  connect();
}

export async function connect() {
  let p;
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

const wallet = writable(undefined);

export const signer = derived([wallet, user], async ([$wallet, $user], set) => {
  if ($wallet && $user) {
    const network = await $wallet.getNetwork();
    if (network.name !== CONFIG.network) {
      networkMismatchError.set({ has: network.name, want: CONFIG.network });
    } else {
      networkMismatchError.set(undefined);
      set(new ethers.providers.Web3Provider(window.ethereum).getSigner());
    }
    const [account] = await $wallet.listAccounts();
    if (account !== $user.address) {
      addressMismatchError.set({ has: account, want: $user.address });
    }
  }
});

export const networkMismatchError = writable(undefined);
export const addressMismatchError = writable(undefined);

export const network = derived(signer, async ($signer, set) =>
  set((await $signer.getNetwork()).name)
);

export const chainId = derived(signer, async ($signer, set) =>
  set((await $signer.getNetwork()).chainId)
);

export const provider = derived(
  signer,
  ($signer) => $signer || new ethers.providers.JsonRpcProvider(CONFIG.endpoint)
);

export const address = derived(
  [signer, user, clock],
  async ([$signer, $user, $clock], set) => {
    if ($signer) {
      const [account] = await $signer.listAccounts();
      if (account !== $user.address) {
        addressMismatchError.set({ has: account, want: $user.address });
        set();
      } else {
        set(account);
      }
    }
  }
);

export const tokenContract = derived(signer, async ($signer, set) => {
  if ($signer) {
    window.c = new ethers.Contract(CONFIG.tokenAddress, erc20ABI, $signer);
    set(new ethers.Contract(CONFIG.tokenAddress, erc20ABI, $signer));
  }
});

export const balance = derived(
  [provider, user],
  async ([$provider, $user], set) => {
    if ($provider && $user) {
      const contract = new ethers.Contract(
        CONFIG.tokenAddress,
        erc20ABI,
        $provider
      );
      set(await contract.balanceOf($user.address));
    }
  }
);
