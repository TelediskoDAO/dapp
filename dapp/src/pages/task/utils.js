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
