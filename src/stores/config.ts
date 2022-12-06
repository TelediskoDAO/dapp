type ContractsAddresses = {
  [key: string]: string;
};

export const contractsAddresses: ContractsAddresses =
  // @ts-ignore
  __VITE_CONTRACTS_ADDRESSES__;

export const infuraKey: string = import.meta.env.VITE_INFURA_API_KEY;
export const ethereumEndpoint: string = import.meta.env.VITE_ETHEREUM_ENDPOINT;
export const ethereumChainId: number = parseInt(
  import.meta.env.VITE_ETHEREUM_CHAIN_ID,
  10
);
export const ipfsEndpoint: string = import.meta.env.VITE_IPFS_ENDPOINT;
export const graphProtocolGqlEndpoint: string = import.meta.env
  .VITE_GRAPH_PROTOCOL_GQL_ENDPOINT;
export const lastMonthRewardsEndpoint: string = import.meta.env
  .VITE_LAST_MONTH_REWARDS_ENDPOINT;
export const appEnv: string = import.meta.env.VITE_APP_ENV;
