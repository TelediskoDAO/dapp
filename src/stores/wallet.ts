import {
  walletconnectProjectId,
  infuraKey,
  evmosChain,
  ethereumChainId,
  appEnv,
} from "./config";
import { ethers, BigNumber } from "ethers";
import type { Signer } from "ethers";
import { get, derived, writable, type Readable } from "svelte/store";
import { configureChains, createClient, fetchSigner } from "@wagmi/core";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { asyncDerived } from "./utils";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";

if (!walletconnectProjectId) {
  throw new Error("You need to provide VITE_PROJECT_ID env variable");
}

const chains = [];
if (appEnv === "production") {
  chains.push(evmosChain.mainnet);
} else {
  chains.push(evmosChain.testnet);
}

// Configure wagmi client
const { provider } = configureChains(chains, [
  infuraProvider({ apiKey: infuraKey }),
  walletConnectProvider({ projectId: walletconnectProjectId }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Create ethereum and modal clients
const ethClient = new EthereumClient(wagmiClient, chains);
export const web3Modal = new Web3Modal(
  { projectId: walletconnectProjectId },
  ethClient
);

ethClient.watchNetwork(async (network) => {
  networkName.set(network?.chain?.name);
  networkChainId.set(network?.chain?.id);

  const chainId = get(networkChainId);
  if (chainId) {
    if (chainId !== ethereumChainId) {
      const currentChainName = get(networkName) || "unknown";
      const ethereumChainName =
        ethers.providers.getNetwork(ethereumChainId)?.name || "unknown";
      networkError.set({
        got: `${currentChainName}:${chainId}`,
        want: `${ethereumChainName}:${ethereumChainId}`,
      });
      return;
    }
    signer.set(await fetchSigner({ chainId }));
    networkError.set(null);
  } else {
    signer.set(null);
  }
});

export const signer = writable<Signer | null>(null);
export const networkName = writable<string | undefined>();
export const networkChainId = writable<number | undefined>();
export const networkError = writable<{ got: string; want: string } | null>();

export const signerAddress: Readable<string | null> = asyncDerived(
  signer,
  async ($signer, set) =>
    $signer ? set(await $signer.getAddress()) : set(null)
);

export const shortAddress = derived(signerAddress, ($address) =>
  $address ? $address.substring(0, 6) + "…" + $address.substring(38) : null
);

export const balance: Readable<BigNumber | null> = derived(
  signer,
  ($signer, set) => {
    if ($signer) {
      $signer
        .getBalance()
        .then(set)
        .catch((e) => {
          console.log("Error getting balance", e);
        });
    } else {
      set(null);
    }
  }
);

export async function connect() {
  web3Modal.openModal();
}

export async function disconnect() {
  ethClient.disconnect();
}
