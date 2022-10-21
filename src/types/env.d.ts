/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INFURA_API_KEY: string;
  readonly VITE_ETHEREUM_ENDPOINT: string;
  readonly VITE_ETHEREUM_CHAIN_ID: string;
  readonly IPFS_ENDPOINT: string;
  readonly GRAPH_PROTOCOL_GQL_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
