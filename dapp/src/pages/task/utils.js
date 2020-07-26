export function toPrettyDuration(hours) {
  const h = Math.trunc(hours);
  const m = Math.round((hours - h) * 60);
  if (m) {
    return `${h}h ${m}m`;
  } else {
    return `${h}h`;
  }
}

export function toPrettyTime(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();
  let d = [months[date.getMonth()], date.getDate()];
  let t = [date.getHours(), date.getMinutes().toString().padStart(2, "0")];

  if (now.getFullYear() !== date.getFullYear()) {
    d.push(date.getFullYear());
  }

  return [d.join(" "), t.join(":")].join(" ");
}

export function toPrettyRange(start, end) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function parse(d) {
    return (
      d && {
        year: d.getFullYear(),
        month: months[d.getMonth()],
        day: d.getDate(),
        time: d.getHours() + ":" + d.getMinutes().toString().padStart(2, "0"),
      }
    );
  }

  const s = parse(start);
  const e = parse(end);
  const n = parse(new Date());

  if (!e) {
    return { start: `${s.month} ${s.day} ${s.time}` };
  }
  // Most of the times a duration is within the same day.
  // This is the most common case, so the app handles only this for now.
  if (s.year === e.year && s.month === e.month && s.day === s.day) {
    return { start: `${s.month} ${s.day} ${s.time}`, end: e.time };
  } else {
    return {
      start: `${s.month} ${s.day} ${s.time}`,
      end: `${e.month} ${e.day} ${e.time}`,
    };
  }
}

export function splitDate(date) {
  function pad(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }
  if (date === undefined) {
    date = new Date();
  }
  return [
    [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join(
      "-"
    ),
    [pad(date.getHours()), pad(date.getMinutes())].join(":"),
  ];
}
