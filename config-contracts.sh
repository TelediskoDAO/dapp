#!/usr/bin/env bash

CONTRACTS_DIR="../contracts/";

# Check if contracts dir exists

if [[ ! -d ${CONTRACTS_DIR} ]]
then
    echo "Cannot find contracts in ${CONTRACTS_DIR}."
    echo "Checkout the git repo: https://github.com/TelediskoDAO/contracts"
    echo "in ${CONTRACTS_DIR} and try again."
    exit 1
fi

# Cleanup
rm -rf src/contracts
mkdir src/contracts

echo "Compile contracts and generate types"

DAPP_DIR=$(pwd)
cd ${CONTRACTS_DIR}

npx hardhat compile

if [ $? -ne 0 ]; then
    echo "Something went wrong executing the 'npx hardhat' command, did you run 'npm i' in ${CONTRACTS_DIR}?"
fi

cp -r typechain/* ${DAPP_DIR}/src/contracts

echo "Copy network configuration"
cp deployments/* ${DAPP_DIR}/src/contracts
