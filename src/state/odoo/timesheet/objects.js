import { derived } from "svelte/store";
import { agent, refresh } from "../agent";
import { tasks, durations } from "../project/objects";
import { uid } from "../user";
import { parseLine } from "./parsers";
import { TIER_TO_RATE } from "./constants";

function groupByProject(lines) {
  return Object.values(
    lines.reduce((acc, curr) => {
      if (!acc[curr.projectId]) {
        acc[curr.projectId] = {
          id: curr.projectId,
          name: curr.projectName,
          lines: [],
          hours: 0,
          value: 0,
        };
      }
      acc[curr.projectId].lines.push(curr);
      acc[curr.projectId].hours += curr.hours;
      acc[curr.projectId].value += curr.value;
      return acc;
    }, {})
  );
}

const prospect = derived([tasks, durations], ([$tasks, $durations]) =>
  Object.values(
    Object.values($tasks).reduce((acc, task) => {
      const hours = task.durations.reduce(
        (acc, durationId) => acc + $durations[durationId].hours,
        0
      );
      const value = task.tier ? TIER_TO_RATE[task.tierId] * hours : 0;
      if (value > 0) {
        acc[task.id] = {
          id: task.id,
          projectId: task.projectId,
          projectName: task.projectName,
          taskId: task,
          id: task.id,
          taskName: task.name,
          subtaskId: false,
          subtaskName: false,
          name: task.name,
          tier: task.tier ? task.tier : "?",
          hours,
          value,
          tokenAmount: value,
          tokenized: false,
        };
      }
      return acc;
    }, {})
  )
);

const data = derived(
  [agent, uid, refresh],
  async ([$agent, $uid], set) => {
    if ($agent && $uid) {
      const lines = await $agent.search("account.analytic.line", {
        user_id: $uid,
        tokenized: false,
      });
      set(lines);
    }
  },
  []
);

export const lines = derived(data, ($data) => $data.map(parseLine));

export const linesByProject = derived(lines, groupByProject);

export const totalHours = derived(linesByProject, ($linesByProject) =>
  Object.values($linesByProject).reduce((acc, curr) => acc + curr.hours, 0)
);

export const totalValue = derived(linesByProject, ($linesByProject) =>
  Object.values($linesByProject).reduce((acc, curr) => acc + curr.value, 0)
);

export const prospectByProject = derived(prospect, groupByProject);

export const prospectTotalHours = derived(
  prospectByProject,
  ($prospectByProject) =>
    Object.values($prospectByProject).reduce((acc, curr) => acc + curr.hours, 0)
);

export const prospectTotalValue = derived(
  prospectByProject,
  ($prospectByProject) =>
    Object.values($prospectByProject).reduce((acc, curr) => acc + curr.value, 0)
);
