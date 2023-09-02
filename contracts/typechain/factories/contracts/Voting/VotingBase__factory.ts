/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  VotingBase,
  VotingBaseInterface,
} from "../../../contracts/Voting/VotingBase";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "currentDelegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldVotingPower",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newVotingPower",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "afterTokenTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "canVote",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newDelegate",
        type: "address",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getDelegate",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalVotingPower",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getVotingPower",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610a67806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806311acc1a714610067578063544d85641461007e5780635c19a95c146100a9578063adfaa72e146100be578063bb4d4436146100e1578063df6258be1461010a575b600080fd5b6006545b6040519081526020015b60405180910390f35b61009161008c366004610921565b61011d565b6040516001600160a01b039091168152602001610075565b6100bc6100b7366004610921565b61013b565b005b6100d16100cc366004610921565b610148565b6040519015158152602001610075565b61006b6100ef366004610921565b6001600160a01b031660009081526004602052604090205490565b6100bc610118366004610943565b610165565b6001600160a01b039081166000908152600360205260409020541690565b61014533826101fe565b50565b6000806101548361011d565b6001600160a01b0316141592915050565b6001546001600160a01b031633146101de5760405162461bcd60e51b815260206004820152603160248201527f566f74696e673a206f6e6c7920546f6b656e20636f6e74726163742063616e2060448201527031b0b636103a3434b99036b2ba3437b21760791b60648201526084015b60405180910390fd5b6101f96101ea8461011d565b6101f38461011d565b83610782565b505050565b60006102098361011d565b905060006102168361011d565b6001600160a01b038581166000818152600560205260408082205491546002549151630ea018f760e01b81526004810192909252602482019390935293945092911690630ea018f790604401602060405180830381865afa15801561027f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a3919061097f565b6102ff5760405162461bcd60e51b815260206004820152602760248201527f566f74696e673a206f6e6c7920636f6e7472696275746f72732063616e2064656044820152663632b3b0ba329760c91b60648201526084016101d5565b600054600254604051630ea018f760e01b815260048101919091526001600160a01b03868116602483015290911690630ea018f790604401602060405180830381865afa158015610354573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610378919061097f565b6103d85760405162461bcd60e51b815260206004820152602b60248201527f566f74696e673a206f6e6c7920636f6e7472696275746f72732063616e20626560448201526a103232b632b3b0ba32b21760a91b60648201526084016101d5565b816001600160a01b0316846001600160a01b031614806104095750836001600160a01b0316856001600160a01b0316145b6104685760405162461bcd60e51b815260206004820152602a60248201527f566f74696e673a206e65772064656c6567617465206973206e6f742073656c666044820152690819195b1959d85d195960b21b60648201526084016101d5565b8015806104865750836001600160a01b0316856001600160a01b0316145b6104e15760405162461bcd60e51b815260206004820152602660248201527f566f74696e673a2064656c656761746f7220697320616c72656164792064656c6044820152651959d85d195960d21b60648201526084016101d5565b6001600160a01b0383161580156105095750836001600160a01b0316856001600160a01b0316145b8061051c57506001600160a01b03831615155b6105765760405162461bcd60e51b815260206004820152602560248201527f566f74696e673a2066697273742064656c65676174652073686f756c642062656044820152641039b2b63360d91b60648201526084016101d5565b826001600160a01b0316846001600160a01b031614156105eb5760405162461bcd60e51b815260206004820152602a60248201527f566f74696e673a206e65772064656c656761746520657175616c20746f206f6c604482015269642064656c656761746560b01b60648201526084016101d5565b6001546040516370a0823160e01b81526001600160a01b03878116600483015260009216906370a0823190602401602060405180830381865afa158015610636573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065a91906109a1565b6001600160a01b03878116600081815260036020526040902080546001600160a01b0319169289169283179055919250148015906106a057506001600160a01b03851615155b156106cf576001600160a01b03851660009081526005602052604081208054916106c9836109d0565b91905055505b836001600160a01b0316866001600160a01b0316141580156106f957506001600160a01b03841615155b15610728576001600160a01b0384166000908152600560205260408120805491610722836109eb565b91905055505b604080516001600160a01b03868116825287811660208301528816917f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f910160405180910390a261077a848683610782565b505050505050565b816001600160a01b0316836001600160a01b0316141580156107a45750600081115b156101f9576001600160a01b0383161561083d576001600160a01b0383166000908152600460205260409020546107db8282610a02565b6001600160a01b038516600081815260046020526040908190208390555190917fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a7249161082f91858252602082015260400190565b60405180910390a250610855565b806006600082825461084f9190610a19565b90915550505b6001600160a01b038216156108e9576001600160a01b0382166000908152600460205260409020546108878282610a19565b6001600160a01b038416600081815260046020526040908190208390555190917fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724916108db91858252602082015260400190565b60405180910390a250505050565b80600660008282546108fb9190610a02565b9091555050505050565b80356001600160a01b038116811461091c57600080fd5b919050565b60006020828403121561093357600080fd5b61093c82610905565b9392505050565b60008060006060848603121561095857600080fd5b61096184610905565b925061096f60208501610905565b9150604084013590509250925092565b60006020828403121561099157600080fd5b8151801515811461093c57600080fd5b6000602082840312156109b357600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b60006000198214156109e4576109e46109ba565b5060010190565b6000816109fa576109fa6109ba565b506000190190565b600082821015610a1457610a146109ba565b500390565b60008219821115610a2c57610a2c6109ba565b50019056fea2646970667358221220f100859be28f244e925798da2cd794db21391b62b0b88b97d25fa9b3ea35702464736f6c634300080b0033";

type VotingBaseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VotingBaseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VotingBase__factory extends ContractFactory {
  constructor(...args: VotingBaseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<VotingBase> {
    return super.deploy(overrides || {}) as Promise<VotingBase>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): VotingBase {
    return super.attach(address) as VotingBase;
  }
  override connect(signer: Signer): VotingBase__factory {
    return super.connect(signer) as VotingBase__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VotingBaseInterface {
    return new utils.Interface(_abi) as VotingBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): VotingBase {
    return new Contract(address, _abi, signerOrProvider) as VotingBase;
  }
}
