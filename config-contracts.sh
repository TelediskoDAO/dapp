#!/usr/bin/env bash

CONTRACTS_DIR="contracts";

# Init submodule
git submodule update --init ${CONTRACTS_DIR}

DAPP_DIR=$(pwd)
cd ${CONTRACTS_DIR}
pnpm i
npx hardhat compile

echo "Copy types"
cp -r typechain/* ../src/contracts

echo "Copy network configuration"
cp deployments/* ../src/contracts
