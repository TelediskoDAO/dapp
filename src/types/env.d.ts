/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INFURA_API_KEY: string;
  readonly VITE_PROJECT_KEY: "neokingdom" | "teledisko";
  readonly VITE_ETHEREUM_ENDPOINT: string;
  readonly VITE_ETHEREUM_CHAIN_ID: string;
  readonly VITE_IPFS_ENDPOINT: string;
  readonly VITE_GRAPH_PROTOCOL_GQL_ENDPOINT: string;
  readonly VITE_LAST_MONTH_REWARDS_ENDPOINT: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_ODOO_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
