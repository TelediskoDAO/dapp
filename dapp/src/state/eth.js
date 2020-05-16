import ethers from "ethers";
import erc20ABI from "../contracts/erc20.abi.json";
import { writable, derived } from "svelte/store";
import { clock } from "./clock";

export async function authenticate() {
  if (window.ethereum !== undefined) {
    try {
      await window.ethereum.enable();
    } catch (e) {
      console.log(e);
      throw new Error("Authentication denied");
    }
    provider.set(new ethers.providers.Web3Provider(window.ethereum));
  } else {
    throw new Error("No Web3 provider available");
  }
  return provider;
}

export const provider = writable(undefined, set => {
  if (window.ethereum && window.ethereum.selectedAddress) {
    set(new ethers.providers.Web3Provider(window.ethereum));
  }
  return _ => 0;
});

export const address = derived(
  [provider, clock],
  async ([$provider, $clock], set) => {
    if ($provider) {
      const accounts = await $provider.listAccounts();
      set(accounts[0]);
    }
  }
);

export const addressShort = derived(address, async ($address, set) => {
  if ($address) {
    set($address.substr(0, 6) + "…" + $address.substr(-4));
  }
});

export const contributors = derived(
  [provider, address],
  async ([$provider, $address], set) => {
    if ($provider && $address) {
      const contractAddress = "0x045daD97Ea2c3638910698aC7A5d2C6311234F23";
      const holders = {
        "0x0a0c93d0f0553ebf7b7bea31be6fc65e38cc9b6e": "Ben",
        "0xa5d7b98bacbcca1c5bc77781cc42afc3ce45a89e": null,
        "0x0b296dee297bef5645bfea0dd96db38f86be8a20": "Thomas",
        "0x197970e48082cd46f277abdb8afe492bccd78300": "Alberto",
        "0x264e5682ae928f66651570b17c4b3ffcca7afb76": null,
        "0x962396715b093b10882f6dd7cc990b382ad6b3c2": null,
        "0x3685437a87d200950bf26846c154354442e3f7f7": null,
        "0xaaa9871fb9f6a9ad6fa72ec92ed47fd027bd1cc7": "Axel"
      };
      const contract = new ethers.Contract(
        contractAddress,
        erc20ABI,
        $provider
      );
      const parsed = {};
      for (let holderAddress of Object.keys(holders)) {
        parsed[holderAddress] = {
          balance: (await contract.balanceOf(holderAddress))
            .toString()
            .slice(0, -18),
          name: holders[holderAddress]
        };
      }
      set(parsed);
    }
  }
);
