import { derived } from "svelte/store";
import { agent } from "../agent";
import { uid } from "../user";
import { group, map } from "src/f";
import { parseLine } from "./parsers";

const data = derived(
  [agent, uid],
  async ([$agent, $uid], set) => {
    if ($agent && $uid) {
      const lines = await $agent.search("account.analytic.line", {
        user_id: $uid,
        tokenized: false,
      });
      console.log(lines);
      set(lines);
    }
  },
  []
);

export const lines = derived(data, ($data) => $data.map(parseLine));

export const linesByProject = derived(lines, ($lines) =>
  Object.values(
    $lines.reduce((acc, curr) => {
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
  )
);

export const totalHours = derived(linesByProject, ($linesByProject) =>
  Object.values($linesByProject).reduce((acc, curr) => acc + curr.hours, 0)
);

export const totalValue = derived(linesByProject, ($linesByProject) =>
  Object.values($linesByProject).reduce((acc, curr) => acc + curr.value, 0)
);
