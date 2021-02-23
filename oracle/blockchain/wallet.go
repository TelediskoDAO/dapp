package blockchain

import (
	"context"
	"crypto/ecdsa"
	"errors"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

type Wallet struct {
	Address    common.Address
	privateKey *ecdsa.PrivateKey
	client     *ethclient.Client
}

func NewWalletFromPrivateKey(p string) (*Wallet, error) {
	privateKey, err := crypto.HexToECDSA(p)
	if err != nil {
		log.Fatal(err)
	}

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		return nil, errors.New("cannot assert type: publicKey is not of type *ecdsa.PublicKey")
	}

	address := crypto.PubkeyToAddress(*publicKeyECDSA)

	w := &Wallet{
		Address:    address,
		privateKey: privateKey,
		client:     nil,
	}
	return w, nil
}

func (w *Wallet) Dial(url string) error {
	client, err := ethclient.Dial(url)
	if err != nil {
		return err
	}
	w.client = client
	return nil
}

func (w *Wallet) NewSigner() (*bind.TransactOpts, error) {
	nonce, err := w.client.PendingNonceAt(context.Background(), w.Address)
	if err != nil {
		return nil, err
	}

	gasPrice, err := w.client.SuggestGasPrice(context.Background())
	if err != nil {
		return nil, err
	}

	chainID, err := w.client.ChainID(context.Background())
	if err != nil {
		return nil, err
	}

	signer, err := bind.NewKeyedTransactorWithChainID(w.privateKey, chainID)
	if err != nil {
		return nil, err
	}

	signer.Nonce = big.NewInt(int64(nonce))
	signer.Value = big.NewInt(0)
	signer.GasLimit = uint64(500000)
	signer.GasPrice = gasPrice
	return signer, nil
}

func (w *Wallet) SendTransaction(ctx context.Context, tx *types.Transaction) error {
	return w.client.SendTransaction(ctx, tx)
}

func (w *Wallet) GetClient() *ethclient.Client {
	return w.client
}
