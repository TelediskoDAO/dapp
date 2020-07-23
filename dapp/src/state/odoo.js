import { clock } from "./clock";
import { writable, derived } from "svelte/store";
import { persistable, derivable, now } from "./utils";
import { group, map } from "src/f";
import { session } from "src/net/odoo";

const URL = "https://odoo.teledisko.com/jsonrpc";
const DB = "teledisko";

export const username = persistable("odoo.username", "");
export const password = persistable("odoo.password", "");
export const upstreamCache = persistable("upstream", []);

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

export const upstream = derivable(agent, async ($agent, set) => {
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
    upstreamCache.set({ tasks, durations });
    set({ tasks, durations });
  }
});

const data = derived(
  [upstream, upstreamCache],
  ([$upstream, $upstreamCache], set) => set($upstream || $upstreamCache),
  {}
);

const STAGES = {
  1: "backlog",
  5: "progress",
  2: "done",
  3: "approved",
};

export const tasks = derived(
  data,
  ($data) =>
    map($data.tasks, (task) => ({
      id: task.id,
      name: task.name,
      description: task.description,
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
  data,
  ($data) =>
    map($data.durations, (duration) => ({
      id: duration.id,
      taskId: duration.task[0],
      start: duration.start,
      end: duration.end,
      hours: duration.value,
    })),
  {}
);

export const taskList = derived(
  tasks,
  ($tasks) => Object.values($tasks).filter(({ isSubtask }) => !isSubtask),
  []
);

export const tasksBacklog = derived(
  taskList,
  ($taskList) =>
    Object.values($taskList).filter(({ stage }) => stage === "backlog"),
  []
);

export const tasksProgress = derived(
  taskList,
  ($taskList) =>
    Object.values($taskList).filter(({ stage }) => stage === "progress"),
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

export const currentDuration = derived(
  durations,
  ($durations) =>
    Object.values($durations).filter((duration) => duration.end === false)[0]
);

export const currentTask = derived(
  [tasks, currentDuration],
  ([$tasks, $currentDuration]) =>
    $tasks && $currentDuration && $tasks[$currentDuration.taskId]
);

export const currentHours = derived(
  [currentDuration, clock],
  ([$currentDuration, $clock]) =>
    $currentDuration &&
    (new Date() - new Date($currentDuration.start)) / (60 * 60 * 1000)
);

export const currentHoursTotal = derived(
  [currentTask, currentDuration, hoursByTask],
  ([$currentTask, $currentDuration, $hoursByTask]) =>
    $currentTask &&
    $currentDuration &&
    hoursByTask &&
    $hoursByTask[$currentTask.id] +
      (new Date() - new Date($currentDuration.start)) / (60 * 60 * 1000)
);

/**
 * Modifiers
 */

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
    task.duration_entry.splice(task.duration_entry.indexOf(duration.id), 1);
    return $upstream;
  });
});
