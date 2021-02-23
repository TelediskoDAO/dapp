package aragon

import (
	"context"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"gitlab.com/teledisko/dao/oracle/blockchain"
)

type DAO struct {
	Wallet *blockchain.Wallet
	Organization,
	Tokens,
	Voting,
	Finance common.Address
}

func NewDAO(organization, tokens, voting, finance common.Address) *DAO {
	return &DAO{
		Organization: organization,
		Tokens:       tokens,
		Voting:       voting,
		Finance:      finance,
	}
}

func (a *DAO) Connect(w *blockchain.Wallet) {
	a.Wallet = w
}

func (a *DAO) Mint(to common.Address, amount *big.Int) (*types.Transaction, error) {
	signer, err := a.Wallet.NewSigner()
	data := GenerateVoteMintBytecode(a.Voting, a.Tokens, to, amount)
	tx := types.NewTransaction(signer.Nonce.Uint64(), a.Tokens, signer.Value, signer.GasLimit, signer.GasPrice, data)
	signedTx, err := signer.Signer(signer.From, tx)
	if err != nil {
		return nil, err
	}
	if err := a.Wallet.SendTransaction(context.Background(), signedTx); err != nil {
		return nil, err
	}
	return signedTx, nil
}
