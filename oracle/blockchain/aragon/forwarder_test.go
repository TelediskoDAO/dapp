package aragon

import (
	"math/big"
	"reflect"
	"testing"

	"github.com/ethereum/go-ethereum/common"
)

func TestGenerateVoteMintBytecode(t *testing.T) {
	type args struct {
		voting common.Address
		tokens common.Address
		to     common.Address
		amount *big.Int
	}
	tests := []struct {
		name string
		args args
		want []byte
	}{
		{
			name: "Forwards a call to vote on minting tokens",
			args: args{
				voting: common.HexToAddress("0x6b928f8fb2a2c4d5cc3a5a873f8a2640b64d4531"),
				tokens: common.HexToAddress("0xa36e31c093da616907177f9c946403183f7ea3e0"),
				to:     common.HexToAddress("0x197970E48082CD46f277ABDb8afe492bCCd78300"),
				amount: big.NewInt(0x01),
			},
			want: []byte{
				// Forward signature
				0xd9, 0x48, 0xd4, 0x68,
				// Padding
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x20,
				// Size
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xc0,
				// Magic number
				0, 0, 0, 0x01,
				// Voting address
				0x6b, 0x92, 0x8f, 0x8f, 0xb2, 0xa2, 0xc4, 0xd5, 0xcc, 0x3a, 0x5a, 0x87, 0x3f, 0x8a, 0x26, 0x40, 0xb6, 0x4d, 0x45, 0x31,
				// Size
				0, 0, 0, 0xa4,

				// Forward signature
				0xd9, 0x48, 0xd4, 0x68,
				// Padding
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x20,
				// Size
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x60,
				// Magic number
				0, 0, 0, 0x01,
				// Tokens address
				0xa3, 0x6e, 0x31, 0xc0, 0x93, 0xda, 0x61, 0x69, 0x07, 0x17, 0x7f, 0x9c, 0x94, 0x64, 0x03, 0x18, 0x3f, 0x7e, 0xa3, 0xe0,
				// Size
				0, 0, 0, 0x44,

				// Mint signature
				0x40, 0xc1, 0x0f, 0x19,
				// Destination address
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x19, 0x79, 0x70, 0xE4, 0x80, 0x82, 0xCD, 0x46, 0xf2, 0x77, 0xAB, 0xDb, 0x8a, 0xfe, 0x49, 0x2b, 0xCC, 0xd7, 0x83, 0,
				// Amount
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x01,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := GenerateVoteMintBytecode(tt.args.voting, tt.args.tokens, tt.args.to, tt.args.amount); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("GenerateVoteMintBytecode() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestBigIntTo32Bytes(t *testing.T) {
	type args struct {
		i    *big.Int
		size int
	}
	tests := []struct {
		name string
		args args
		want []byte
	}{
		{
			name: "Fills 32 bytes",
			args: args{
				i:    big.NewInt(0xaabbccdd),
				size: 32,
			},
			want: []byte{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xaa, 0xbb, 0xcc, 0xdd},
		},
		{
			name: "Fills 8 bytes",
			args: args{
				i:    big.NewInt(0xaabbccdd),
				size: 8,
			},
			want: []byte{0, 0, 0, 0, 0xaa, 0xbb, 0xcc, 0xdd},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := BigIntToFixedBytes(tt.args.i, tt.args.size); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("BigIntTo32Bytes() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_mintCall(t *testing.T) {
	type args struct {
		to     common.Address
		amount *big.Int
	}
	tests := []struct {
		name string
		args args
		want []byte
	}{
		{
			name: "Generates the bytecode for minting tokens",
			args: args{
				to:     common.HexToAddress("0x197970E48082CD46f277ABDb8afe492bCCd78300"),
				amount: big.NewInt(0x01),
			},
			want: []byte{
				// Mint signature
				0x40, 0xc1, 0x0f, 0x19,
				// Destination address
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x19, 0x79, 0x70, 0xE4, 0x80, 0x82, 0xCD, 0x46, 0xf2, 0x77, 0xAB, 0xDb, 0x8a, 0xfe, 0x49, 0x2b, 0xCC, 0xd7, 0x83, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x01,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := mintCall(tt.args.to, tt.args.amount); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("mintCall() = %v, want %v", got, tt.want)
			}
		})
	}
}
