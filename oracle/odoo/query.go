package odoo

import (
	"reflect"
	"strconv"
)

// Request represents a json rpc request
type Request struct {
	Service string        `json:"service"`
	Method  string        `json:"method"`
	Args    []interface{} `json:"args"`
}

// WriteRequest represents a write action.
type WriteRequest struct {
	Client *Client
	Method string
	Model  string
	ID     []int
	Value  interface{}
}

// Query represents a query.
type Query struct {
	Client *Client
	Method string
	Model  string
	Fields *Fields
	Where  *Where
}

// Fields represents a list of fields to return
type Fields struct {
	Fields []string `json:"fields"`
}

// Where represent a list of predicates in AND.
type Where struct {
	Predicates []Predicate
}

// Predicate represents a predicate like "x > 2".
type Predicate struct {
	Field    string
	Operator string
	Value    interface{}
}

func (p *Predicate) Array() []interface{} {
	return []interface{}{p.Field, p.Operator, p.Value}
}

//NewFields creates a new selection of fields
func NewFields(f ...string) *Fields {
	r := &Fields{}
	r.Fields = append(r.Fields, f...)
	return r
}

// NewWhere creates a new where, that is nothing more than a collection of predicates.
func NewWhere(field string, op string, value interface{}) *Where {
	w := &Where{}
	w.Predicates = append(w.Predicates, Predicate{field, op, value})
	return w
}

// And adds a new predicate in "and" with the previous one.
func (w *Where) And(field string, op string, value interface{}) *Where {
	w.Predicates = append(w.Predicates, Predicate{field, op, value})
	return w
}

// ToArray returns an array of serialized conditions
func (w *Where) ToArray() [][]interface{} {
	r := [][]interface{}{}
	for _, p := range w.Predicates {
		r = append(r, p.Array())
	}
	return r
}

// NewSearch creates a new search query.
func (c *Client) NewWriteRequest(model string, id []int, value interface{}) *WriteRequest {
	return &WriteRequest{
		Client: c,
		Method: "write",
		Model:  model,
		ID:     id,
		Value:  value,
	}
}

// NewSearch creates a new search query.
func (c *Client) NewSearch(model string, fields *Fields, where *Where) *Query {
	return &Query{
		Client: c,
		Method: "search_read",
		Model:  model,
		Fields: fields,
		Where:  where,
	}
}

func (w *WriteRequest) ToArray() []interface{} {
	r := []interface{}{
		w.Client.db,
		strconv.Itoa(w.Client.uid),
		w.Client.password,
		w.Model,
		w.Method,
		[]interface{}{
			w.ID,
			w.Value,
		},
	}
	return r
}

// ToRequest prepares the JSONRPC request.
func (w *WriteRequest) ToRequest() *Request {
	return &Request{
		Service: "object",
		Method:  "execute_kw",
		Args:    w.ToArray(),
	}
}

// ToArray returns the array of arguments for a JSONRPC call.
func (q *Query) ToArray() []interface{} {
	r := []interface{}{
		q.Client.db,
		strconv.Itoa(q.Client.uid),
		q.Client.password,
		q.Model,
		q.Method,
	}

	if q.Where != nil {
		r = append(r, []interface{}{q.Where.ToArray()})
	} else {
		r = append(r, []interface{}{})
	}
	if q.Fields != nil {
		r = append(r, q.Fields)
	}
	return r
}

// ToRequest prepares the JSONRPC request.
func (q *Query) ToRequest() *Request {
	return &Request{
		Service: "object",
		Method:  "execute_kw",
		Args:    q.ToArray(),
	}
}

// StructToTags extracts the json tags from a struct.
func StructToTags(s interface{}) []string {
	v := reflect.TypeOf(s)
	tags := make([]string, v.NumField())
	for i := 0; i < v.NumField(); i++ {
		f := v.Field(i)
		tags[i] = f.Tag.Get("json")
	}
	return tags
}
