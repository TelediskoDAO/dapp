package odoo

import (
	"reflect"
	"testing"
)

func TestCalculateTokenAllocations(t *testing.T) {
	type args struct {
		u []User
		t []Timesheet
	}
	tests := []struct {
		name string
		args args
		want []TokenAllocation
	}{
		{
			name: "Calculates the token allocation",
			args: args{
				u: []User{
					{
						ID:              1,
						Name:            "Princess Bubblegum",
						Email:           String("princess@candykingdom.ooo"),
						EthereumAddress: "0x0000000000000000000000000000000000000001",
					},
					{
						ID:              2,
						Name:            "Finn the Human",
						Email:           String("finn@hotmail.ooo"),
						EthereumAddress: "0x0000000000000000000000000000000000000002",
					},
					{
						ID:              3,
						Name:            "Jake the Dog",
						Email:           String("jake@hotmail.ooo"),
						EthereumAddress: "0x0000000000000000000000000000000000000003",
					},
				},
				t: []Timesheet{
					{
						ID: 1,
						User: IDLabelField{
							ID: 1,
						},
						TokenAmount: 10,
					},
					{
						ID: 2,
						User: IDLabelField{
							ID: 1,
						},
						TokenAmount: 50,
					},
					{
						ID: 3,
						User: IDLabelField{
							ID: 1,
						},
						TokenAmount: 10,
					},
					{
						ID: 4,
						User: IDLabelField{
							ID: 2,
						},
						TokenAmount: 10,
					},
					{
						ID: 5,
						User: IDLabelField{
							ID: 2,
						},
						TokenAmount: 10,
					},
					{
						ID: 6,
						User: IDLabelField{
							ID: 1,
						},
						TokenAmount: 10,
					},
				},
			},
			want: []TokenAllocation{
				{
					User: User{
						ID:              1,
						Name:            "Princess Bubblegum",
						Email:           String("princess@candykingdom.ooo"),
						EthereumAddress: "0x0000000000000000000000000000000000000001",
					},
					TokenAmount: 80,
					Timesheets: []Timesheet{
						{
							ID: 1,
							User: IDLabelField{
								ID: 1,
							},
							TokenAmount: 10,
						},
						{
							ID: 2,
							User: IDLabelField{
								ID: 1,
							},
							TokenAmount: 50,
						},
						{
							ID: 3,
							User: IDLabelField{
								ID: 1,
							},
							TokenAmount: 10,
						},
						{
							ID: 6,
							User: IDLabelField{
								ID: 1,
							},
							TokenAmount: 10,
						},
					},
				},
				{
					User: User{
						ID:              2,
						Name:            "Finn the Human",
						Email:           String("finn@hotmail.ooo"),
						EthereumAddress: "0x0000000000000000000000000000000000000002",
					},
					TokenAmount: 20,
					Timesheets: []Timesheet{
						{
							ID: 4,
							User: IDLabelField{
								ID: 2,
							},
							TokenAmount: 10,
						},
						{
							ID: 5,
							User: IDLabelField{
								ID: 2,
							},
							TokenAmount: 10,
						},
					},
				},
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CalculateTokenAllocations(tt.args.u, tt.args.t); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("CalculateTokenAllocations() = %v, want %v", got, tt.want)
			}
		})
	}
}
