package oracle

import (
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"gitlab.com/teledisko/dao/oracle/blockchain"
	"gitlab.com/teledisko/dao/oracle/odoo"
)

func MintTokens(o *odoo.Client, d blockchain.DAO, p *odoo.Payroll) error {
	log.Printf("Start processing payroll from %s to %s\n", p.Start.Format("Jan 2, 2006"), p.End.Format("Jan 2, 2006"))
	for _, a := range p.TokenAllocations {
		if a.EthereumAddress == "" {
			log.Printf("Skip %s, no ethereum address found\n", a.Name)
		} else {
			exp := big.NewInt(0).Exp(big.NewInt(10), big.NewInt(12), nil)
			amount := big.NewInt(0).Mul(
				big.NewInt(int64(a.TokenAmount*1000000)),
				exp,
			)
			tx, err := d.Mint(common.HexToAddress(a.EthereumAddress.String()), amount)
			if err != nil {
				return err
			}
			log.Printf("Mint %f Tokens for %s (%s). Tx: %s", a.TokenAmount, a.EthereumAddress, a.Name, tx.Hash().Hex())
			ids := make([]int, len(a.Timesheets))
			for i, t := range a.Timesheets {
				ids[i] = t.ID
			}
			if err := o.SetTimesheetTokenization(ids, true); err != nil {
				log.Fatal(err)
			}
			log.Printf("Set tokenized flag for %d", ids)
		}
	}
	return nil
}
