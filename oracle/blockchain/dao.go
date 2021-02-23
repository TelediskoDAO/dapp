package blockchain

import (
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

type DAO interface {
	Connect(*Wallet)
	Mint(common.Address, *big.Int) (*types.Transaction, error)
}
