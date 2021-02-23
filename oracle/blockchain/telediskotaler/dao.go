package telediskotaler

import (
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"gitlab.com/teledisko/dao/oracle/blockchain"
)

type DAO struct {
	Wallet *blockchain.Wallet
	Tokens common.Address
}

func NewDAO(tokens common.Address) *DAO {
	return &DAO{
		Tokens: tokens,
	}
}

func (a *DAO) Connect(w *blockchain.Wallet) {
	a.Wallet = w
}

func (a *DAO) Mint(to common.Address, amount *big.Int) (*types.Transaction, error) {
	signer, err := a.Wallet.NewSigner()
	tt, err := NewTelediskoTaler(a.Tokens, a.Wallet.GetClient())
	if err != nil {
		return nil, err
	}
	tx, err := tt.Mint(signer, to, amount)
	if err != nil {
		return nil, err
	}
	return tx, nil
}
