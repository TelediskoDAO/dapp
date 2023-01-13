import { derived, type Readable } from "svelte/store";

import networksTeledisko from "../../contracts/deployments/networks.json";
import networksNeoKingdom from "../../contracts-nkd/deployments/networks.json";

import {
  type Voting,
  Voting__factory,
  type TelediskoToken,
  type ResolutionManager,
} from "../../contracts/typechain";
import { ResolutionManager__factory } from "../../contracts/typechain";
import { TelediskoToken__factory } from "../../contracts/typechain";
import { user } from "../state/odoo";
import { projectKey } from "./config";
import { signer } from "./wallet";

const networks =
  projectKey === "neokingdom" ? networksNeoKingdom : networksTeledisko;

export const tokenContract: Readable<TelediskoToken> = derived(
  signer,
  // @ts-ignore
  async ($signer, set) => {
    if ($signer) {
      const chainId = await $signer.getChainId();
      const address: string =
        networks[chainId.toString()][
          projectKey === "neokingdom" ? "NeokingdomToken" : "TelediskoToken"
        ];
      const contract = TelediskoToken__factory.connect(address, $signer);
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

export const votingContract: Readable<Voting> = derived(
  signer,
  ($signer, set) => {
    (async () => {
      if ($signer) {
        const chainId = await $signer.getChainId();
        const address = networks[chainId.toString()]["Voting"];
        const contract = Voting__factory.connect(address, $signer);
        set(contract);
      }
    })();
  }
);

export const resolutionContract: Readable<ResolutionManager> = derived(
  signer,
  ($signer, set) => {
    (async () => {
      if ($signer) {
        const chainId = await $signer.getChainId();
        const address = networks[chainId.toString()]["ResolutionManager"];
        const contract = ResolutionManager__factory.connect(address, $signer);
        set(contract);
      }
    })();
  }
);
