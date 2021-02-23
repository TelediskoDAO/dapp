package aragon

import (
	"math/big"

	"github.com/ethereum/go-ethereum/common"
)

var (
	forwardMethod = []byte{0xd9, 0x48, 0xd4, 0x68}
	mintMethod    = []byte{0x40, 0xc1, 0x0f, 0x19}
)

func BigIntToFixedBytes(i *big.Int, size int) []byte {
	b := make([]byte, size)
	return i.FillBytes(b)
}

func mintCall(to common.Address, amount *big.Int) []byte {
	b := []byte{}
	b = append(b, mintMethod...)
	b = append(b, to.Hash().Bytes()...)
	b = append(b, BigIntToFixedBytes(amount, 32)...)
	return b
}

func forwardCall(to common.Address, bytecode []byte) []byte {
	h := []byte{}
	// Some magic number
	h = append(h, BigIntToFixedBytes(big.NewInt(1), 4)...)
	// Receiver of the call
	h = append(h, to.Bytes()...)
	// Bytecode size
	h = append(h, BigIntToFixedBytes(big.NewInt(int64(len(bytecode))), 4)...)
	// Bytecode
	h = append(h, bytecode...)

	b := []byte{}
	// 4 byte signature of the forward method
	b = append(b, forwardMethod...)
	// Add padding
	b = append(b, BigIntToFixedBytes(big.NewInt(0x20), 32)...)
	// Add payload size
	b = append(b, BigIntToFixedBytes(big.NewInt(int64(len(h))), 32)...)
	// Add actual payload
	b = append(b, h...)
	return b
}

func GenerateVoteMintBytecode(voting, tokens, to common.Address, amount *big.Int) []byte {
	return forwardCall(
		voting,
		forwardCall(
			tokens,
			mintCall(to, amount),
		),
	)
}
