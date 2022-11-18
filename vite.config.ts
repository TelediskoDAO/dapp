import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import replace from "@rollup/plugin-replace";
import { createHtmlPlugin } from "vite-plugin-html";
import { readFileSync } from "fs";
import { VitePWA } from "vite-plugin-pwa";

type ContractsAddresses = {
  [key: string]: string;
};

type Networks = {
  [key: string]: ContractsAddresses;
};

const buildPwaOptions = (swDev: string, extraOptions: any = {}) =>
  ({
    mode: "development",
    base: "/",
    manifest: {
      short_name: "teleDAO",
      name: "teledisko DAO",
      description: "Access all teledisko DAO features from this nifty app.",
      icons: [
        {
          src: "/images/logo-192.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "any maskable",
        },
        {
          src: "/images/logo-512.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "any maskable",
        },
      ],
      start_url: "/",
      background_color: "#000000",
      display: "standalone",
      scope: "/",
      theme_color: "#000000",
      shortcuts: [
        {
          name: "Your Tasks",
          short_name: "Tasks",
          description: "View all your tasks and do time tracking",
          url: "/#/tasks",
          icons: [
            { src: "/images/shortcut-time-tracking-192.png", sizes: "192x192" },
          ],
        },
      ],
    },
    devOptions: {
      enabled: swDev === "true",
      type: "module",
      navigateFallback: "index.html",
    },
    ...extraOptions,
  } as any);

function getAddresses(chainId: string, dirs: string[]) {
  let networks = {} as Networks;
  for (let dir of dirs) {
    networks = {
      ...JSON.parse(readFileSync(dir, "utf8")),
    };
  }
  if (!networks[chainId]) {
    throw new Error(`Cannot find contracts for chainId ${chainId}`);
  }
  return networks[chainId];
}

// https://vitejs.dev/config/
export default async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), [
    "VITE_",
    "HTML_",
    "SMART_CONTRACT_",
  ]);

  const smartContractPath = env?.SMART_CONTRACT_PATH;
  if (!smartContractPath) {
    console.error("Cannod find smart contract directory");
    process.exit(1);
  }

  const chainId = env.VITE_ETHEREUM_CHAIN_ID;
  const contractsAddresses = getAddresses(
    chainId,
    smartContractPath.split(";")
  );

  const pwaOptions = buildPwaOptions(
    env?.VITE_SW_DEV_ENABLED,
    env?.VITE_SW_ENABLED === "true"
      ? {
          srcDir: "src",
          filename: "prompt-sw.ts",
          strategies: "injectManifest",
        }
      : {}
  );

  return defineConfig({
    base: "./",
    plugins: [
      svelte(),
      replace({
        __VITE_CONTRACTS_ADDRESSES__: JSON.stringify(contractsAddresses),
        __BUILD_DATE__: new Date().toISOString(),
      }),
      createHtmlPlugin({
        inject: {
          data: {
            ...env,
          },
        },
      }),
      VitePWA(pwaOptions),
    ],
  });
};
