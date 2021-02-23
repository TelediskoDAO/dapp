package odoo

import (
	"reflect"
	"testing"
)

type MyStruct struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	CreateDate string `json:"create_date"`
}

func TestStructToTags(t *testing.T) {
	type args struct {
		s MyStruct
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{
			name: "Extract the tags",
			args: args{
				s: MyStruct{},
			},
			want: []string{"id", "name", "create_date"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := StructToTags(tt.args.s); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("StructToTags() = %v, want %v", got, tt.want)
			}
		})
	}
}
