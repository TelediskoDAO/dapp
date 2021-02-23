package config

import (
	"errors"
	"os"

	"github.com/ethereum/go-ethereum/common"
	"github.com/joho/godotenv"
)

type Config struct {
	OdooUsername  string
	OdooPassword  string
	EthPrivateKey string
	EthEndpoint   string
	ERC20Address  common.Address
}

func NewConfigFromEnv() (*Config, error) {
	godotenv.Load()

	odooUsername := os.Getenv("ODOO_USERNAME")
	if odooUsername == "" {
		return nil, errors.New("ODOO_USERNAME is empty")
	}

	odooPassword := os.Getenv("ODOO_PASSWORD")
	if odooPassword == "" {
		return nil, errors.New("ODOO_PASSWORD is empty")
	}

	ethPrivateKey := os.Getenv("ETH_PRIVATE_KEY")
	if ethPrivateKey == "" {
		return nil, errors.New("ETH_PRIVATE_KEY is empty")
	}

	ethEndpoint := os.Getenv("ETH_ENDPOINT")
	if ethEndpoint == "" {
		return nil, errors.New("ETH_ENDPOINT is empty")
	}

	erc20Address := os.Getenv("TELEDISKO_TOKEN_ADDRESS")
	if erc20Address == "" {
		return nil, errors.New("TELEDISKO_TOKEN_ADDRESS is empty")
	}

	return &Config{
		OdooUsername:  odooUsername,
		OdooPassword:  odooPassword,
		EthPrivateKey: ethPrivateKey,
		EthEndpoint:   ethEndpoint,
		ERC20Address:  common.HexToAddress(erc20Address),
	}, nil
}
