import { clock } from "./clock";
import { writable, derived } from "svelte/store";
import { persistable, derivable, now } from "./utils";
import { group, map } from "src/f";
import { session } from "src/net/odoo";

const URL = "https://odoo.teledisko.com/jsonrpc";
const DB = "teledisko";

function parseDate(s) {
  return s ? new Date(s.replace(" ", "T") + "+02:00") : false;
}

export const username = persistable("odoo.username", "");
export const password = persistable("odoo.password", "");
export const upstreamCache = persistable("upstream", []);

export const agent = derived(
  [username, password],
  async ([$username, $password], set) => {
    if ($username && $password) {
      const s = await session(URL, DB, $username, $password);
      set(s);
    } else {
      set(null);
    }
  },
  null
);

export const uid = derivable(agent, ($agent) => $agent && $agent.uid);

export const user = derived(agent, async ($agent, set) => {
  if ($agent) {
    const [data] = await $agent.read("res.users", $agent.uid);
    console.log("User's data", data);
    set({
      name: data.name,
      image: data.image_medium,
    });
  } else {
    set(null);
  }
});

export const upstream = derivable(
  [agent, uid],
  async ([$agent, $uid], set) => {
    if ($agent && $uid) {
      const tasks = group(
        await $agent.search("project.task", { user_id: $uid })
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
  },
  { tasks: {}, durations: {} }
);

const data = derived(
  [upstream, upstreamCache],
  ([$upstream, $upstreamCache], set) => set($upstream /*|| $upstreamCache*/)
);

const STAGES = {
  1: "backlog",
  5: "progress",
  2: "done",
  3: "approved",
};

const STAGES_TO_ID = {
  backlog: 1,
  progress: 5,
  done: 2,
  approved: 3,
};

export const tasks = derived(
  data,
  ($data) =>
    console.log("update tasks") ||
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
    console.log("update durations") ||
    map($data.durations, (duration) => ({
      id: duration.id,
      taskId: duration.task[0],
      start: parseDate(duration.start),
      end: parseDate(duration.end),
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

export const tasksOpen = derived([tasks, durations], ([$tasks, $durations]) =>
  Array.from(
    new Set(
      Object.values($durations)
        .filter((duration) => duration.end === false)
        .map((duration) => duration.taskId)
    )
  ).map((taskId) => $tasks[taskId])
);

//export const durationsOverlap = derived(durations, ($durations) =>
//  $durations.sort((a, b) => a.start - b.start).((duration, i, array) =>
//  )
//);

export const currentDuration = derived(
  [tasksOpen, durations],
  ([$tasksOpen, $durations]) =>
    $tasksOpen && $tasksOpen.length === 1
      ? Object.values($durations).filter(
          (duration) => duration.end === false
        )[0]
      : undefined
);

export const currentTask = derived(
  [tasks, currentDuration],
  ([$tasks, $currentDuration]) =>
    $tasks && $currentDuration && $tasks[$currentDuration.taskId]
);

export const currentHours = derived(
  [currentDuration, clock],
  ([$currentDuration, $clock]) =>
    $currentDuration && ($clock - $currentDuration.start) / (60 * 60 * 1000)
);

export const currentHoursTotal = derived(
  [currentTask, currentDuration, hoursByTask],
  ([$currentTask, $currentDuration, $hoursByTask]) =>
    $currentTask &&
    $currentDuration &&
    hoursByTask &&
    $hoursByTask[$currentTask.id] +
      (new Date() - $currentDuration.start) / (60 * 60 * 1000)
);

/**
 * Modifiers
 */

export async function connectToOdoo(u, p) {
  const s = await session(URL, DB, u, p);
  if (s.uid === false) {
    throw new Error("Login error");
  }
  username.set(u);
  password.set(p);
}

export const createDuration = derived(
  [agent, tasks],
  ([$agent, $tasks]) => async (taskId, start, end) => {
    const duration = {
      task: taskId,
      start,
      end,
    };

    // If the task is in backlog, put it in progress.
    const task = $tasks[taskId];
    if (task.stage === "backlog") {
      await $agent.update("project.task", taskId, {
        stage_id: STAGES_TO_ID["progress"],
      });
    }

    const durationId = await $agent.create("project.task.duration", duration);
    const [updatedTask] = await $agent.read("project.task", [taskId]);
    const [newDuration] = await $agent.read("project.task.duration", [
      durationId,
    ]);
    upstream.update(($upstream) => {
      $upstream.tasks[taskId] = updatedTask;
      $upstream.durations[durationId] = newDuration;
      return $upstream;
    });
  }
);

export const startDuration = derived(
  [agent, tasks],
  ([$agent, $tasks]) => async (taskId) => {
    const duration = {
      task: taskId,
      start: now(),
    };

    // If the task is in backlog or done, put it in progress.
    const task = $tasks[taskId];
    if (task.stage === "backlog" || task.stage === "done") {
      await $agent.update("project.task", taskId, {
        stage_id: STAGES_TO_ID["progress"],
      });
    }

    const durationId = await $agent.create("project.task.duration", duration);
    const [updatedTask] = await $agent.read("project.task", [taskId]);
    const [newDuration] = await $agent.read("project.task.duration", [
      durationId,
    ]);
    upstream.update(($upstream) => {
      $upstream.tasks[taskId] = updatedTask;
      $upstream.durations[durationId] = newDuration;
      return $upstream;
    });
  }
);

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

export const removeDuration = derived(
  [agent, tasks, durations],
  ([$agent, $tasks, $durations]) => async (durationId) => {
    const taskId = $durations[durationId].taskId;
    await $agent.remove("project.task.duration", [durationId]);

    // If the task has no durations, then move it to backlog.
    const task = $tasks[taskId];
    if (task.durations.length === 1) {
      await $agent.update("project.task", taskId, {
        stage_id: STAGES_TO_ID["backlog"],
      });
    }

    const [updatedTask] = await $agent.read("project.task", [taskId]);

    upstream.update(($upstream) => {
      const duration = $upstream.durations[durationId];
      $upstream.tasks[taskId] = updatedTask;
      delete $upstream.durations[durationId];
      console.log("new upstream task id", taskId, durationId, $upstream);
      return $upstream;
    });
  }
);

export const updateDuration = derived(
  agent,
  ($agent) => async (durationId, start, end) => {
    const result = await $agent.update("project.task.duration", durationId, {
      start,
      end,
    });
    const [updatedDuration] = await $agent.read("project.task.duration", [
      durationId,
    ]);
    upstream.update(($upstream) => {
      $upstream.durations[durationId] = updatedDuration;
      return $upstream;
    });
  }
);
