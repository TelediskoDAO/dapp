import { ethers } from "ethers";

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

export function fromFloatNumber(number) {
  return ethers.BigNumber.from(number * 1e6).mul(
    ethers.BigNumber.from(10).pow(12)
  );
}

export function toFloatNumber(number) {
  if (number instanceof ethers.BigNumber) {
    number = number.div(ethers.BigNumber.from(10).pow(12)).toNumber() / 1e6;
  }
  return number;
}

export function toPrettyCurrency(number) {
  if (number instanceof ethers.BigNumber) {
    number = number.div(ethers.BigNumber.from(10).pow(12)).toNumber() / 1e6;
  }
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
  })
    .format(number)
    .replace("$", "TT");
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

  if (!start) {
    return {};
  }

  const s = parse(start);
  const e = parse(end);
  const n = parse(new Date());

  if (!e) {
    return { start: `${s.month} ${s.day} ${s.time}` };
  }
  // Most of the times a duration is within the same day.
  // This is the most common case, so the app handles only this for now.
  if (s.year === e.year && s.month === e.month && s.day === e.day) {
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
  if (!date) {
    date = new Date();
  }
  return [
    [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join(
      "-"
    ),
    [pad(date.getHours()), pad(date.getMinutes())].join(":"),
  ];
}

export function joinDate(date, time) {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  return new Date(year, month - 1, day, hour, minute);
}

export function toShortAddress(address) {
  return address.substr(0, 6) + "…" + address.substr(-4);
}
