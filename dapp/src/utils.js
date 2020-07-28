export function utc(date) {
  const d = date ? date : new Date();
  const year = d.getUTCFullYear();
  const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = d.getUTCDate().toString().padStart(2, "0");
  const hour = d.getUTCHours().toString().padStart(2, "0");
  const minute = d.getUTCMinutes().toString().padStart(2, "0");
  const second = d.getUTCSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
