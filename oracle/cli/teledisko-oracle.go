package main

import (
	"flag"
	"log"
	"os"

	"gitlab.com/teledisko/dao/oracle"
	"gitlab.com/teledisko/dao/oracle/blockchain"
	"gitlab.com/teledisko/dao/oracle/blockchain/telediskotaler"
	"gitlab.com/teledisko/dao/oracle/config"
	"gitlab.com/teledisko/dao/oracle/odoo"
)

type Clients struct {
	DAO  blockchain.DAO
	Odoo *odoo.Client
}

func LoadClients() Clients {
	config, err := config.NewConfigFromEnv()
	if err != nil {
		log.Fatal(err)
	}
	w, err := blockchain.NewWalletFromPrivateKey(config.EthPrivateKey)
	if err != nil {
		log.Fatal(err)
	}
	w.Dial(config.EthEndpoint)
	log.Println("Oracle address:", w.Address)

	daoClient := telediskotaler.NewDAO(config.ERC20Address)
	daoClient.Connect(w)
	odooClient := odoo.Dial("https://odoo.teledisko.com/jsonrpc")
	if err := odooClient.Authenticate("teledisko", config.OdooUsername, config.OdooPassword); err != nil {
		log.Fatal("Cannot login ", err)
	}

	return Clients{
		DAO:  daoClient,
		Odoo: odooClient,
	}
}

func main() {
	dryRun := flag.Bool("dry", false, "Dry run")
	flag.Parse()

	clients := LoadClients()

	payroll, err := clients.Odoo.GetPayroll()
	if err != nil {
		log.Fatal("Cannot get payroll: ", err)
	}
	payroll.PrintTable()
	if *dryRun {
		log.Println("(Dry run, stopping here)")
		os.Exit(0)
	}
	if err := oracle.MintTokens(clients.Odoo, clients.DAO, payroll); err != nil {
		log.Fatal(err)
	}
}
