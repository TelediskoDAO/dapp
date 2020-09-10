import { clock } from "./clock";
import { writable, derived } from "svelte/store";
import { utc } from "src/utils";
import { persistable, derivable } from "./utils";
import { group, map } from "src/f";
import { session } from "src/net/odoo";

const URL = "https://odoo.teledisko.com/jsonrpc";
const DB = "teledisko";

function parseDate(s) {
  return s ? new Date(s.replace(" ", "T") + "Z") : false;
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
    map($data.tasks, (task) => ({
      id: task.id,
      name: task.name,
      description: task.description,
      isSubtask: task.is_subtask,
      subtaskIds: task.subtask_ids,
      hasSubtasks: task.subtask_ids.length > 0,
      hasDurations: task.duration_entry.length > 0,
      parentId: task.task_id ? task.task_id[0] : null,
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

export const tasksDone = derived(
  taskList,
  ($taskList) =>
    Object.values($taskList).filter(({ stage }) => stage === "done"),
  []
);

export const tasksApproved = derived(
  taskList,
  ($taskList) =>
    Object.values($taskList).filter(({ stage }) => stage === "approved"),
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

// Should be 0 or 1, otherwise the user is tracking multiple tasks at the same time
export const durationsOpen = derived(
  [tasks, durations],
  ([$tasks, $durations]) =>
    Object.values($durations).filter(
      (duration) => duration.start && duration.end === false
    )
);

export const tasksToFix = derived(
  [tasks, durations, durationsOpen],
  ([$tasks, $durations, $durationsOpen]) => {
    let fixme = new Set(
      Object.values($durations)
        .filter((duration) => duration.start === false || duration.hours < 0)
        .map((duration) => duration.taskId)
    );
    if ($durationsOpen.length > 1) {
      fixme = new Set([
        ...fixme,
        ...$durationsOpen.map((duration) => duration.taskId),
      ]);
    }

    return Array.from(fixme).map((taskId) => $tasks[taskId]);
  }
);

//export const durationsOverlap = derived(durations, ($durations) =>
//  $durations.sort((a, b) => a.start - b.start).((duration, i, array) =>
//  )
//);

export const currentDuration = derived(
  [durationsOpen, durations],
  ([$durationsOpen, $durations]) =>
    $durationsOpen && $durationsOpen.length === 1
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

export const markAsDone = derived(
  [agent, tasks, hoursByTask],
  ([$agent, $tasks, $hoursByTask]) => async (taskId) => {
    const task = $tasks[taskId];
    const result = await $agent.update("project.task", taskId, {
      stage_id: STAGES_TO_ID["done"],
      duration: $hoursByTask[taskId],
    });
    const [updatedTask] = await $agent.read("project.task", [taskId]);
    let updatedParentTask;
    if (task.parentId) {
      [updatedParentTask] = await $agent.read("project.task", [task.parentId]);
    }
    upstream.update(($upstream) => {
      $upstream.tasks[taskId] = updatedTask;
      if (updatedParentTask) {
        $upstream.tasks[updatedParentTask.id] = updatedParentTask;
      }
      return $upstream;
    });
  }
);

function calculateHours(start, end) {
  return start && end ? (end - start) / (60 * 60 * 1000) : 0;
}

export const createDuration = derived(
  [agent, tasks, hoursByTask],
  ([$agent, $tasks, $hoursByTask]) => async (taskId, start, end) => {
    const duration = {
      task: taskId,
      start: utc(start),
      end: utc(end),
    };
    const hours = $hoursByTask[taskId] + calculateHours(start, end);
    const durationId = await $agent.create("project.task.duration", duration);
    const [newDuration] = await $agent.read("project.task.duration", [
      durationId,
    ]);
    // If the task is in backlog, put it in progress.
    const task = $tasks[taskId];
    if (task.stage === "backlog") {
      await $agent.update("project.task", taskId, {
        stage_id: STAGES_TO_ID["progress"],
        duration: hours,
      });
    } else {
      await $agent.update("project.task", taskId, {
        duration: hours,
      });
    }
    const [updatedTask] = await $agent.read("project.task", [taskId]);
    upstream.update(($upstream) => {
      $upstream.tasks[taskId] = updatedTask;
      $upstream.durations[durationId] = newDuration;
      return $upstream;
    });
  }
);

export const startDuration = derived(
  [agent, tasks, hoursByTask],
  ([$agent, $tasks, $hoursByTask]) => async (taskId) => {
    const duration = {
      task: taskId,
      start: utc(),
    };
    const hours = $hoursByTask[taskId];
    const durationId = await $agent.create("project.task.duration", duration);
    const [newDuration] = await $agent.read("project.task.duration", [
      durationId,
    ]);
    let updatedParentTask;
    // If the task is in backlog, put it in progress.
    const task = $tasks[taskId];
    if (task.stage === "backlog" || task.stage === "done") {
      await $agent.update("project.task", taskId, {
        stage_id: STAGES_TO_ID["progress"],
        duration: hours,
      });
      if (task.parentId) {
        [updatedParentTask] = await $agent.read("project.task", [
          task.parentId,
        ]);
      }
    } else {
      await $agent.update("project.task", taskId, {
        duration: hours,
      });
    }
    const [updatedTask] = await $agent.read("project.task", [taskId]);
    upstream.update(($upstream) => {
      $upstream.tasks[taskId] = updatedTask;
      if (updatedParentTask) {
        $upstream.tasks[updatedParentTask.id] = updatedParentTask;
      }
      $upstream.durations[durationId] = newDuration;
      return $upstream;
    });
  }
);

export const stopDuration = derived(
  [agent, durations, hoursByTask],
  ([$agent, $durations, $hoursByTask]) => async (durationId) => {
    const now = new Date();
    const duration = $durations[durationId];
    const taskId = duration.taskId;
    const hours = $hoursByTask[taskId] + calculateHours(duration.start, now);
    const result = await $agent.update("project.task.duration", durationId, {
      end: utc(now),
    });
    const [updatedDuration] = await $agent.read("project.task.duration", [
      durationId,
    ]);

    await $agent.update("project.task", taskId, {
      duration: hours,
    });
    const [updatedTask] = await $agent.read("project.task", [taskId]);

    upstream.update(($upstream) => {
      $upstream.tasks[taskId] = updatedTask;
      $upstream.durations[durationId] = updatedDuration;
      return $upstream;
    });
  }
);

export const removeDuration = derived(
  [agent, tasks, durations, hoursByTask],
  ([$agent, $tasks, $durations, $hoursByTask]) => async (durationId) => {
    const duration = $durations[durationId];
    const taskId = duration.taskId;
    await $agent.remove("project.task.duration", [durationId]);
    const hours =
      $hoursByTask[taskId] - calculateHours(duration.start, duration.end);
    // If the task has no durations, then move it to backlog.
    const task = $tasks[taskId];
    if (task.durations.length === 1) {
      await $agent.update("project.task", taskId, {
        stage_id: STAGES_TO_ID["backlog"],
        duration: hours,
      });
    } else {
      await $agent.update("project.task", taskId, {
        duration: hours,
      });
    }
    const [updatedTask] = await $agent.read("project.task", [taskId]);
    upstream.update(($upstream) => {
      const duration = $upstream.durations[durationId];
      $upstream.tasks[taskId] = updatedTask;
      delete $upstream.durations[durationId];
      return $upstream;
    });
  }
);

export const updateDuration = derived(
  [agent, durations, hoursByTask],
  ([$agent, $durations, $hoursByTask]) => async (durationId, start, end) => {
    const duration = $durations[durationId];
    const taskId = duration.taskId;
    const hours =
      $hoursByTask[taskId] -
      calculateHours(duration.start, duration.end) +
      calculateHours(start, end);
    const result = await $agent.update("project.task.duration", durationId, {
      start: utc(start),
      end: utc(end),
    });
    const [updatedDuration] = await $agent.read("project.task.duration", [
      durationId,
    ]);
    await $agent.update("project.task", taskId, {
      duration: hours,
    });
    const [updatedTask] = await $agent.read("project.task", [taskId]);
    upstream.update(($upstream) => {
      $upstream.tasks[taskId] = updatedTask;
      $upstream.durations[durationId] = updatedDuration;
      return $upstream;
    });
  }
);
