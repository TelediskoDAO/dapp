import { ipfsEndpoint } from "../stores/config";

declare global {
  interface Window {
    IpfsHttpClient: any;
  }
}

const ipfsClient = window.IpfsHttpClient.create(ipfsEndpoint)

export async function add(data: any) {
  try {
    const response = await ipfsClient.add(JSON.stringify(data));
    const cid = response.cid.toString()
    await ipfsClient.pin.add(cid);
    console.log("Content uploaded and pinned to IPFS with cid", cid);
    return cid;
  } catch (err) {
    console.error(err);
    throw new Error("Cannot upload to IPFS");
  }
}

export async function get(cid: string) {
  let data = new Uint8Array();
  let dataRead = 0;
  const chunks = [];
  for await (const chunk of ipfsClient.cat(cid)) {
    chunks.push(chunk);
    const tmp = new Uint8Array(data.byteLength + chunk.byteLength);
    tmp.set(chunk, data.byteLength);
    data = tmp;
    dataRead += chunk.byteLength;
  }
  const raw = new TextDecoder("utf-8").decode(data);
  const content = JSON.parse(raw);
  return content;
}