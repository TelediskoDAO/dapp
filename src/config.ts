interface IConfig {
  production: boolean;
  date: number;
  version: string;
  network: string;
  endpoint: string;
  oracleAddress: string;
  ipfsEndpoint: string;
}

// @ts-ignore
const CONFIG: IConfig = __buildEnv__;
export default CONFIG;
