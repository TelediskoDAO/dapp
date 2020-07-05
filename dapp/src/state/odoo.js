import { writable, derived } from "svelte/store";
import { byKey, persistable, derivable } from "./utils";
import { session } from "src/net/odoo";

const URL = "https://odoo.teledisko.com/jsonrpc";
const DB = "teledisko";

export const username = persistable("odoo.username", "");
export const password = persistable("odoo.password", "");

export const agent = derived(
  [username, password],
  async ([$username, $password], set) => {
    if ($username && $password) {
      const s = await session(URL, DB, $username, $password);
      set(s);
    }
  },
  null
);

export const user = derived(agent, async ($agent, set) => {
  if ($agent) {
  }
});

export const rawTasks = derivable(
  agent,
  async ($agent, set) => {
    if ($agent) {
      set(await $agent.search("project.task", { user_id: $agent.uid }));
    }
  },
  []
);

export const tasks = derived(
  rawTasks,
  ($rawTasks) =>
    $rawTasks.map((task) => ({
      id: task.id,
      name: task.name,
      isSubtask: task.is_subtask,
      subtaskIds: task.subtask_ids,
      hasSubtasks: task.subtask_ids.length > 0,
      hasDurations: task.has_duration_entry,
      durations: task.duration_entry,
    })),
  []
);

//export const tasksBacklog = derived(
//  tasks,
//  $tasks => $tasks.filter(
//)

export const rawDurations = derivable(
  [agent, rawTasks],
  async ([$agent, $rawTasks], set) => {
    if ($agent && $rawTasks) {
      set(
        await $agent.read(
          "project.task.duration",
          $rawTasks.reduce((acc, curr) => acc.concat(curr.duration_entry), [])
        )
      );
    }
  },
  []
);

export const localDurations = writable([]);

export const durations = derived(
  [rawDurations, localDurations],
  ([$rawDurations, $localDurations]) =>
    $rawDurations.concat($localDurations).map((duration) => ({
      id: duration.id,
      taskId: duration.task[0],
      start: duration.start,
      end: duration.end,
      hours: duration.value,
    })),
  []
);

export const taskById = derived(
  tasks,
  ($tasks) =>
    $tasks.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {}),
  {}
);

export const durationById = derived(
  durations,
  ($durations) =>
    $durations.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {}),
  {}
);

export const durationsByTask = derived(
  durations,
  ($duration) =>
    $duration.reduce((acc, curr) => {
      const array = acc[curr.taskId] || [];
      array.push(curr);
      acc[curr.taskId] = array;
      return acc;
    }, {}),
  {}
);

export const durationTotalsByTask = derived(
  durationsByTask,
  ($durationsByTask) =>
    Object.keys($durationsByTask).reduce((acc, curr) => {
      acc[curr] = $durationsByTask[curr].reduce(
        (acc, curr) => acc + curr.hours,
        0
      );
      return acc;
    }, {})
);

function now() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth().toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const hour = d.getHours().toString().padStart(2, "0");
  const minute = d.getMinutes().toString().padStart(2, "0");
  const second = d.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const startDuration = derived(agent, ($agent) => async (taskId) => {
  const duration = {
    task: taskId,
    start: now(),
  };
  const id = await $agent.create("project.task.duration", duration);
  const [newDuration] = await $agent.read("project.task.duration", [id]);
  console.log(newDuration);
  localDurations.update((d) => [...d, newDuration]);
});

export function stopDuration(taskId) {}

export const removeDuration = derived(agent, ($agent) => (durationId) => {
  $agent.remove("project.task.duration", [durationId]);
});

// export const taskSorted = derived(tasks, $tasks => $tasks.sort((a, b) => a.

/*
export const projects = derived(tasks, ($tasks) => 
  $tasks.reduce((acc, task) => acc[task.project_id[0]] = {
    id: task.project_id[0],
    name: task.project_id[1],
  }
, []);
*/
