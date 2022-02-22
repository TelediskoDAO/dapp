type Env = "production" | "staging" | "development";

interface IConfig {
  production: boolean;
  date: number;
  version: string;
  network: string;
  endpoint: string;
  oracleAddress: string;
  ipfsEndpoint: string;
  graphProtocolGQLEndpoint: string;
  gitRevision: string;
  env: Env;
}

// @ts-ignore
const CONFIG: IConfig = __buildEnv__;
export default CONFIG;
