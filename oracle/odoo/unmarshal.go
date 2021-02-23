package odoo

import (
	"encoding/json"
	"errors"
	"regexp"
)

// IDLabelField represents an Odoo field with an Id and a Label
type IDLabelField struct {
	ID    int
	Label string
}

// UnmarshalJSON converts a field to IdLabelField
func (f *IDLabelField) UnmarshalJSON(data []byte) error {
	var field interface{}
	if err := json.Unmarshal(data, &field); err != nil {
		return err
	}
	switch v := field.(type) {
	case bool:
		f = nil
		return nil
	case []interface{}:
		if len(v) != 2 {
			return errors.New("Values to convert must be exactly two")
		}
		*f = IDLabelField{
			ID:    int(v[0].(float64)),
			Label: v[1].(string),
		}
		return nil
	default:
		return errors.New("Cannot unmarshal value")
	}
}

type Address string

var validAddressRegexp = regexp.MustCompile("^0x[0-9a-fA-F]{40}$")

func (a Address) String() string {
	if a == "" {
		return "<no address set>"
	}
	return string(a)
}

func (a *Address) UnmarshalJSON(data []byte) error {
	var field interface{}
	if err := json.Unmarshal(data, &field); err != nil {
		return err
	}
	switch v := field.(type) {
	case bool:
		if v {
			return errors.New("Address is set to true, but doesn't have a value")
		}
		*a = ""
		return nil
	case string:
		if !validAddressRegexp.MatchString(v) {
			return errors.New("Address is not formatted correctly")
		}
		*a = Address(v)
		return nil
	default:
		return errors.New("Cannot unmarshal value")
	}
}

type String string

func (s *String) UnmarshalJSON(data []byte) error {
	var field interface{}
	if err := json.Unmarshal(data, &field); err != nil {
		return err
	}
	switch v := field.(type) {
	case bool:
		s = nil
		return nil
	case string:
		*s = String(v)
		return nil
	default:
		return errors.New("Cannot unmarshal value")
	}
}
