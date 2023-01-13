import { derived } from "svelte/store";
import { agent, refresh } from "../../../odoo/agent";
import { uid } from "../../../odoo/user";
import { parseTask, parseDuration, parseProject } from "./parsers";
import { derivable, group, map } from "../../../utils";
import { clock } from "../../../clock";

// Load data from Odoo
export const upstream = derivable(
  [agent, uid, refresh],
  async ([$agent, $uid], set) => {
    if ($agent && $uid) {
      let tasks = group(
        await $agent.search("project.task", [
          ["user_id", "=", $uid],
          ["stage_id", "in", [29, 30, 31]],
        ])
      );
      const childTaskIds = Object.values(tasks).reduce(
        (acc, { child_ids }) => acc.concat(child_ids),
        []
      );
      const childTasks = group(
        await $agent.search("project.task", [["id", "in", childTaskIds]])
      );
      tasks = {
        ...tasks,
        ...childTasks,
      };
      const taskIds = Object.values(tasks).map(({ id }) => id);
      const durations = group(
        await $agent.search("account.analytic.line", [
          ["task_id", "in", taskIds],
        ])
      );

      const projectIds = Object.values(tasks).reduce(
        (acc, curr) => acc.add(curr.project_id[0]),
        new Set()
      );
      const projects = group(
        await $agent.read("project.project", Array.from(projectIds))
      );

      set({ tasks, durations, projects });
    }
  },
  { tasks: {}, durations: {}, projects: {} }
);

// Process data and create models for the app.
const data = derived(upstream, ($upstream) => {
  const now = new Date();

  Object.values($upstream.tasks).forEach((task) => {
    task.durations = Object.values($upstream.durations).filter(
      (duration) => duration.task_id[0] === task.id
    );
  });
  const tasks = map($upstream.tasks, parseTask);
  const durations = map($upstream.durations, parseDuration);
  const projects = map($upstream.projects, parseProject);

  Object.values(durations).forEach(({ taskId, end }) => {
    const task = tasks[taskId];
    const project = projects[task.projectId];
    task.lastActivity = Math.max(task.lastActivity, end === false ? now : end);
    if (end === false) {
      task.isTracking = true;
      project.isTracking = true;
    }
  });

  Object.values(tasks).forEach((task) => {
    // Put all single tasks under a virtual "generic" parent task
    if (task.isSingleTask) {
      const virtualTaskId = "project:" + task.projectId;
      if (!tasks[virtualTaskId]) {
        tasks[virtualTaskId] = {
          id: virtualTaskId,
          name: "Other tasks",
          isParentTask: true,
          isSingleTask: false,
          subtaskIds: [],
          hasSubtasks: true,
          hasDurations: false,
          parentId: null,
          durations: [],
          projectId: task.projectId,
          projectName: task.projectName,
          stages: new Set(),
          lastUpdate: 0,
          lastActivity: 0,
        };
      }
      tasks[virtualTaskId].subtaskIds.push(task.id);
      task.parentId = virtualTaskId;
      task.isSingleTask = false;
      task.isSubtask = true;
      if (!projects[task.projectId].taskIds.includes(virtualTaskId)) {
        projects[task.projectId].taskIds.unshift(virtualTaskId);
      }
    }

    if (task.parentId !== null) {
      tasks[task.parentId].stages = new Set([
        ...task.stages,
        ...tasks[task.parentId].stages,
      ]);
      tasks[task.parentId].lastActivity = new Date(
        Math.max(tasks[task.parentId].lastActivity, task.lastActivity)
      );

      if (task.stage === "done") {
        projects[task.projectId].stagesCount.done++;
      } else if (task.stage === "todo") {
        projects[task.projectId].stagesCount.todo++;
      }
    }
    projects[task.projectId].stages = new Set([
      ...task.stages,
      ...projects[task.projectId].stages,
    ]);
  });

  return { tasks, durations, projects };
});

export const tasks = derived(data, ($data) => $data.tasks, {});

export const durations = derived(data, ($data) => $data.durations, {});

export const projects = derived(data, ($data) => $data.projects, {});

export const taskList = derived(
  tasks,
  ($tasks) => Object.values($tasks).filter(({ isSubtask }) => !isSubtask),
  []
);

export const projectList = derived(
  projects,
  ($projects) => Object.values($projects),
  []
);

export const projectsToDo = derived(
  projects,
  ($projects) =>
    Object.values($projects).filter(({ stages }) => stages.has("todo")),
  []
);

export const projectsDone = derived(
  projects,
  ($projects) =>
    Object.values($projects).filter(({ stages }) => stages.has("done")),
  []
);

export const projectsApproved = derived(
  projects,
  ($projects) =>
    Object.values($projects).filter(({ stages }) => stages.has("approved")),
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
  [currentTask, currentDuration, hoursByTask, clock],
  ([$currentTask, $currentDuration, $hoursByTask]) =>
    $currentTask &&
    $currentDuration &&
    $hoursByTask &&
    $hoursByTask[$currentTask.id] +
      (new Date() - $currentDuration.start) / (60 * 60 * 1000)
);
