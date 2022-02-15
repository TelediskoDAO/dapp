#!/usr/bin/env bash

CONTRACTS_DIR="contracts";

# Init submodule
git submodule init ${CONTRACTS_DIR}

echo "Compile contracts and generate types"
DAPP_DIR=$(pwd)
cd ${CONTRACTS_DIR}

pnpm i
pnpx hardhat compile

if [ $? -ne 0 ]; then
    echo "Something went wrong executing the 'hardhat' command, did you run 'pnpm i' in ${CONTRACTS_DIR}?"
    exit 1
fi

cp -r typechain/* ${DAPP_DIR}/src/contracts

echo "Copy network configuration"
cp deployments/* ${DAPP_DIR}/src/contracts
