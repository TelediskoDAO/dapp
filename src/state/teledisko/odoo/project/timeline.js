import { derived } from "svelte/store";
import { agent } from "../../../odoo/agent";
import { uid } from "../../../odoo/user";
import { group, map } from "../../../utils";
import { parseTask, parseDuration } from "./parsers";

function midnight(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysBetween(start, end) {
  if (!end) {
    end = new Date();
  }
  const days = [];
  const midnightStart = midnight(start);
  const midnightEnd = midnight(end);
  for (let d = midnightStart; d <= midnightEnd; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
}

function sameDay(a, b) {
  return (
    a.getYear() === b.getYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDate(d) {
  return [
    d.getFullYear(),
    (d.getMonth() + 1).toString().padStart(2, "0"),
    d.getDate().toString().padStart(2, "0"),
  ].join("-");
}

const data = derived(
  [agent, uid],
  async ([$agent, $uid], set) => {
    if ($agent && $uid) {
      const durations = group(
        await $agent.search("project.task.duration", { create_uid: $uid })
      );
      const taskIds = Object.values(durations).reduce(
        (acc, curr) => acc.concat(curr.task[0]),
        []
      );
      const tasks = group(await $agent.read("project.task", taskIds));
      set({ tasks, durations });
    }
  },
  { tasks: {}, durations: {} }
);

const tasks = derived(data, ($data) => map($data.tasks, parseTask), {});

const durations = derived(
  data,
  ($data) => map($data.durations, parseDuration),
  {}
);

const activityPerDayObjects = derived(
  [tasks, durations],
  ([$tasks, $durations]) =>
    $tasks &&
    $durations &&
    Object.values($durations).reduce((acc, curr) => {
      const { start, end } = curr;

      if (!start) {
        console.log("Duration has no start, skipping", curr);
        return acc;
      }

      const days = daysBetween(start, end);
      days.forEach((day) => {
        const key = getDate(day);
        const solve = new Date(day);
        solve.setHours(0, 0, 0, 0);
        const coagula = new Date(day);
        coagula.setHours(23, 59, 59, 999);
        const total = coagula - solve;
        const e = {
          duration: curr,
          task: $tasks[curr.taskId],
        };
        if (sameDay(day, start)) {
          e.start = start;
        } else {
          e.start = solve;
        }
        if (!end || sameDay(day, end)) {
          e.end = end;
        } else {
          e.end = coagula;
        }
        e.relativeStart = (e.start - solve) / total;
        e.relativeEnd = ((e.end || new Date()) - solve) / total;
        e.hours = ((e.end || new Date()) - e.start) / (60 * 60 * 1000);
        if (acc[key] === undefined) {
          acc[key] = {
            day: day,
            activity: [],
          };
        }
        acc[key].activity.push(e);
      });
      return acc;
    }, {})
);

export const activityPerDay = derived(
  activityPerDayObjects,
  ($activityPerDayObjects) =>
    Object.keys($activityPerDayObjects)
      .sort()
      .reverse()
      .map((k) => {
        const v = $activityPerDayObjects[k];
        v.activity.sort((a, b) => a.start - b.start);
        return v;
      })
);
