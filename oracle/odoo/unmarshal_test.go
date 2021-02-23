package odoo

import (
	"reflect"
	"testing"
)

func TestIdLabelField_UnmarshalJSON(t *testing.T) {
	type args struct {
		data []byte
	}
	tests := []struct {
		name    string
		args    args
		want    IDLabelField
		wantErr bool
	}{
		{
			name: "Unmarshal valid array to id and label",
			args: args{[]byte("[1, \"a string\"]")},
			want: IDLabelField{
				ID:    1,
				Label: "a string",
			},
			wantErr: false,
		},
		{
			name:    "Unmarshal false to nil",
			args:    args{[]byte("false")},
			want:    IDLabelField{},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := IDLabelField{}
			if err := got.UnmarshalJSON(tt.args.data); (err != nil) != tt.wantErr {
				t.Errorf("IDLabelField.UnmarshalJSON() error = %v, wantErr %v", err, tt.wantErr)
			}

			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("IDLabelField.UnmarshalJSON() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAddress_UnmarshalJSON(t *testing.T) {
	type args struct {
		data []byte
	}
	tests := []struct {
		name    string
		a       Address
		args    args
		wantErr bool
	}{
		{
			name:    "Unmarshal false to emtpy address",
			a:       Address(""),
			args:    args{[]byte("false")},
			wantErr: false,
		},
		{
			name:    "Unmarshal invalid address returns an error",
			a:       Address(""),
			args:    args{[]byte("\"0xabcd\"")},
			wantErr: true,
		},
		{
			name:    "Unmarshal valuid address",
			a:       Address("0x197970E48082CD46f277ABDb8afe492bCCd78300"),
			args:    args{[]byte("\"0x197970E48082CD46f277ABDb8afe492bCCd78300\"")},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := tt.a.UnmarshalJSON(tt.args.data); (err != nil) != tt.wantErr {
				t.Errorf("Address.UnmarshalJSON() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
