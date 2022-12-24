import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import replace from "@rollup/plugin-replace";
import { createHtmlPlugin } from "vite-plugin-html";
import { readFileSync } from "fs";
import { VitePWA } from "vite-plugin-pwa";
import * as packageJson from "./package.json";

type ContractsAddresses = {
  [key: string]: string;
};

type Networks = {
  [key: string]: ContractsAddresses;
};

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || "development";

const buildPwaOptions = (env) =>
  ({
    mode: process.env.NODE_ENV ? "production" : "development",
    base: "/",
    manifest: {
      short_name: env.HTML_TITLE,
      name: env.HTML_TITLE,
      description: "DAO mission control",
      icons: [
        {
          src: `/images/${env.VITE_PROJECT_KEY}/logo-192.png`,
          type: "image/png",
          sizes: "192x192",
          purpose: "any maskable",
        },
        {
          src: `/images/${env.VITE_PROJECT_KEY}/logo-512.png`,
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
      enabled: !process.env.NODE_ENV,
      type: "module",
      navigateFallback: "index.html",
    },
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

// https://stackoverflow.com/a/35778030/597097
const gitRevision = require("child_process")
  .execSync("git rev-parse HEAD")
  .toString()
  .trim();

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

  const pwaOptions = buildPwaOptions(env);

  return defineConfig({
    base: "./",
    plugins: [
      svelte(),
      VitePWA(pwaOptions),
      replace({
        __VITE_CONTRACTS_ADDRESSES__: JSON.stringify(contractsAddresses),
        __BUILD_DATE__: new Date().toISOString(),
        __GIT_REVISION__: gitRevision,
        __VERSION__: packageJson.version,
        __ENV__: nodeEnv,
      }),
      createHtmlPlugin({
        inject: {
          data: {
            ...env,
          },
        },
      }),
    ],
  });
};
