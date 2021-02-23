package odoo

import (
	"reflect"
	"testing"
	"time"
)

func TestNewInterval(t *testing.T) {
	type args struct {
		t time.Time
		s Schedule
	}
	tests := []struct {
		name string
		args args
		want Interval
	}{
		{
			name: "Calculates a daily interval",
			args: args{
				time.Date(2021, 1, 15, 15, 10, 0, 0, time.UTC),
				DailySchedule,
			},
			want: Interval{
				Start:    time.Date(2021, 1, 15, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 1, 16, 0, 0, 0, 0, time.UTC),
				Schedule: DailySchedule,
			},
		},
		{
			name: "Calculates a daily interval between months",
			args: args{
				time.Date(2021, 1, 31, 15, 10, 0, 0, time.UTC),
				DailySchedule,
			},
			want: Interval{
				Start:    time.Date(2021, 1, 31, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 2, 1, 0, 0, 0, 0, time.UTC),
				Schedule: DailySchedule,
			},
		},
		{
			name: "Calculates a daily interval between months in a leap year",
			args: args{
				time.Date(2020, 2, 28, 15, 10, 0, 0, time.UTC),
				DailySchedule,
			},
			want: Interval{
				Start:    time.Date(2020, 2, 28, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2020, 2, 29, 0, 0, 0, 0, time.UTC),
				Schedule: DailySchedule,
			},
		},
		{
			name: "Calculates a daily interval between years",
			args: args{
				time.Date(2020, 12, 31, 15, 10, 0, 0, time.UTC),
				DailySchedule,
			},
			want: Interval{
				Start:    time.Date(2020, 12, 31, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC),
				Schedule: DailySchedule,
			},
		},
		{
			name: "Calculates a weekly interval",
			args: args{
				time.Date(2021, 1, 15, 15, 10, 0, 0, time.UTC),
				WeeklySchedule,
			},
			want: Interval{
				Start:    time.Date(2021, 1, 11, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 1, 18, 0, 0, 0, 0, time.UTC),
				Schedule: WeeklySchedule,
			},
		},
		{
			name: "Calculates a weekly interval across years",
			args: args{
				time.Date(2020, 12, 31, 15, 10, 0, 0, time.UTC),
				WeeklySchedule,
			},
			want: Interval{
				Start:    time.Date(2020, 12, 28, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 1, 4, 0, 0, 0, 0, time.UTC),
				Schedule: WeeklySchedule,
			},
		},
		{
			name: "Calculates a monthly interval",
			args: args{
				time.Date(2021, 1, 3, 15, 10, 0, 0, time.UTC),
				MonthlySchedule,
			},
			want: Interval{
				Start:    time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 2, 1, 0, 0, 0, 0, time.UTC),
				Schedule: MonthlySchedule,
			},
		},
		{
			name: "Calculates a monthly interval on a leap year",
			args: args{
				time.Date(2020, 2, 3, 15, 10, 0, 0, time.UTC),
				MonthlySchedule,
			},
			want: Interval{
				Start:    time.Date(2020, 2, 1, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2020, 3, 1, 0, 0, 0, 0, time.UTC),
				Schedule: MonthlySchedule,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewInterval(tt.args.t, tt.args.s); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewInterval() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestInterval_Increment(t *testing.T) {
	type fields struct {
		Start    time.Time
		End      time.Time
		Schedule Schedule
	}
	tests := []struct {
		name   string
		fields fields
		want   Interval
	}{
		{
			name: "Increments a daily interval",
			fields: fields{
				Start:    time.Date(2020, 12, 31, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC),
				Schedule: DailySchedule,
			},
			want: Interval{
				Start:    time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 1, 2, 0, 0, 0, 0, time.UTC),
				Schedule: DailySchedule,
			},
		},
		{
			name: "Increments a daily interval in Feb omg danger zone",
			fields: fields{
				Start:    time.Date(2020, 2, 28, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2020, 2, 29, 0, 0, 0, 0, time.UTC),
				Schedule: DailySchedule,
			},
			want: Interval{
				Start:    time.Date(2020, 2, 29, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2020, 3, 1, 0, 0, 0, 0, time.UTC),
				Schedule: DailySchedule,
			},
		},
		{
			name: "Increments a weekly interval",
			fields: fields{
				Start:    time.Date(2021, 1, 11, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 1, 18, 0, 0, 0, 0, time.UTC),
				Schedule: WeeklySchedule,
			},
			want: Interval{
				Start:    time.Date(2021, 1, 18, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 1, 25, 0, 0, 0, 0, time.UTC),
				Schedule: WeeklySchedule,
			},
		},
		{
			name: "Increments a monthly interval",
			fields: fields{
				Start:    time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 2, 1, 0, 0, 0, 0, time.UTC),
				Schedule: MonthlySchedule,
			},
			want: Interval{
				Start:    time.Date(2021, 2, 1, 0, 0, 0, 0, time.UTC),
				End:      time.Date(2021, 3, 1, 0, 0, 0, 0, time.UTC),
				Schedule: MonthlySchedule,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			i := Interval{
				Start:    tt.fields.Start,
				End:      tt.fields.End,
				Schedule: tt.fields.Schedule,
			}
			if got := i.Increment(); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Interval.Increment() = %v, want %v", got, tt.want)
			}
		})
	}
}
