#!/usr/bin/env node

require("dotenv").config();

const etherea = require("etherea");
const { build } = require("etherea/lib/solidity");

const NETWORK = process.env.NETWORK || "localhost";

console.log("Deploy to network", NETWORK);

function getEnv(key) {
  return process.env[`${NETWORK.toUpperCase()}_${key}`];
}

async function compile(outdir = "./dist") {
  const oracle = getEnv("ORACLE_ADDRESS");

  const wallet = await etherea.wallet({
    endpoint: getEnv("ENDPOINT") || "localhost",
    privateKey: getEnv("PRIVATE_KEY"),
    mnemonic: getEnv("MNEMONIC"),
  });

  contracts = await build(
    "./contracts/TelediskoTaler.sol",
    outdir,
    wallet,
    "Teledisko Taler",
    "TT"
  );
  wallet.loadContracts(contracts);
  minter = await wallet.contracts.TelediskoTaler.MINTER_ROLE();

  const tx = await wallet.contracts.TelediskoTaler.grantRole(minter, oracle);
  console.log("Grant minter role to oracle", oracle, "tx hash", tx.hash);
}

compile(process.argv[2]);
