import { clock } from "src/state/clock";
import { derived } from "svelte/store";
import { derivable } from "src/state/utils";
import { group, map } from "src/f";
import { agent } from "../agent";
import { uid } from "../user";
import { parseTask, parseDuration } from "./parsers";

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
      set({ tasks, durations });
    }
  },
  { tasks: {}, durations: {} }
);

const data = derived(upstream, ($upstream, set) => set($upstream));

export const tasks = derived(
  data,
  ($data) => {
    const parsed = map($data.tasks, parseTask);
    Object.values(parsed).forEach(
      ({ parentId, stage }) =>
        parentId !== null && parsed[parentId].stages.add(stage)
    );
    return parsed;
  },
  {}
);

export const durations = derived(
  data,
  ($data) => map($data.durations, parseDuration),
  {}
);

export const taskList = derived(
  tasks,
  ($tasks) => Object.values($tasks).filter(({ isSubtask }) => !isSubtask),
  []
);

export const tasksToDo = derived(
  taskList,
  ($taskList) =>
    Object.values($taskList).filter(({ stages }) => stages.has("todo")),
  []
);

export const tasksDone = derived(
  taskList,
  ($taskList) =>
    Object.values($taskList).filter(({ stages }) => stages.has("done")),
  []
);

export const tasksApproved = derived(
  taskList,
  ($taskList) =>
    Object.values($taskList).filter(({ stages }) => stages.has("approved")),
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
