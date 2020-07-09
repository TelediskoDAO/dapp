export function toPrettyTime(hours) {
  const h = Math.trunc(hours);
  const m = Math.round((hours - h) * 60);
  if (m) {
    return `${h}h ${m}m`;
  } else {
    return `${h}h`;
  }
}
