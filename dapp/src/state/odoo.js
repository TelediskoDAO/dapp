import { writable, derived } from "svelte/store";
import { persistable, derivable } from "./utils";
import { group, map } from "src/f";
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

export const upstream = derivable(
  agent,
  async ($agent, set) => {
    if ($agent) {
      const tasks = group(
        await $agent.search("project.task", { user_id: $agent.uid })
      );
      const durationIds = Object.values(tasks).reduce(
        (acc, curr) => acc.concat(curr.duration_entry),
        []
      );
      const durations = group(
        await $agent.read("project.task.duration", durationIds)
      );
      set({ tasks, durations });
    }
  },
  []
);

const STAGES = {
  1: "backlog",
  5: "progress",
  2: "done",
  3: "approved",
};

export const tasks = derived(
  upstream,
  ($upstream) =>
    map($upstream.tasks, (task) => ({
      id: task.id,
      name: task.name,
      isSubtask: task.is_subtask,
      subtaskIds: task.subtask_ids,
      hasSubtasks: task.subtask_ids.length > 0,
      hasDurations: task.duration_entry.length > 0,
      durations: task.duration_entry,
      stage: STAGES[task.stage_id[0]],
    })),
  {}
);

export const durations = derived(
  upstream,
  ($upstream) =>
    map($upstream.durations, (duration) => ({
      id: duration.id,
      taskId: duration.task[0],
      start: duration.start,
      end: duration.end,
      hours: duration.value,
    })),
  {}
);

export const tasksBacklog = derived(
  tasks,
  ($tasks) => Object.values($tasks).filter(({ stage }) => stage === "backlog"),
  []
);

export const tasksProgress = derived(
  tasks,
  ($tasks) => Object.values($tasks).filter(({ stage }) => stage === "progress"),
  []
);

export const hoursByTask = derived([tasks, durations], ([$tasks, $durations]) =>
  Object.keys($tasks).reduce((acc, taskId) => {
    acc[taskId] = $tasks[taskId].durations.reduce(
      (acc, durationId) => acc + $durations[durationId].hours,
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
  const [updatedTask] = await $agent.read("project.task", [taskId]);
  const [newDuration] = await $agent.read("project.task.duration", [id]);
  upstream.update(($upstream) => {
    $upstream.tasks[taskId] = updatedTask;
    $upstream.durations[id] = newDuration;
    return $upstream;
  });
});

export const stopDuration = derived(agent, ($agent) => async (durationId) => {
  const duration = {
    end: now(),
  };
  const result = await $agent.update(
    "project.task.duration",
    durationId,
    duration
  );
  const [updatedDuration] = await $agent.read("project.task.duration", [
    durationId,
  ]);
  upstream.update(($upstream) => {
    $upstream.durations[durationId] = updatedDuration;
    return $upstream;
  });
});

export const removeDuration = derived(agent, ($agent) => async (durationId) => {
  await $agent.remove("project.task.duration", [durationId]);
  upstream.update(($upstream) => {
    const duration = $upstream.durations[durationId];
    const task = $upstream.tasks[duration.task[0]];
    task.duration_entry.splice(task.duration_entry.indexOf(duration.id));
    return $upstream;
  });
});
