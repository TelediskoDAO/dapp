const STAGES = {
  1: "backlog",
  5: "progress",
  2: "done",
  3: "approved",
};

function parseDate(s) {
  return s ? new Date(s.replace(" ", "T") + "Z") : false;
}

export function parseTask(task) {
  const upstreamStage = STAGES[task.stage_id[0]];
  const stage = ["backlog", "progress"].includes(upstreamStage)
    ? "todo"
    : upstreamStage;
  const stages = new Set([stage]);
  return {
    id: task.id,
    name: task.name,
    description: task.description,
    isTracking: false,
    isParentTask: task.subtask_ids.length > 0 && !task.is_subtask,
    isSingleTask: task.subtask_ids.length === 0 && !task.is_subtask,
    isSubtask: task.is_subtask,
    subtaskIds: task.subtask_ids,
    hasSubtasks: task.subtask_ids.length > 0,
    hasDurations: task.duration_entry.length > 0,
    parentId: task.task_id ? task.task_id[0] : null,
    durations: task.duration_entry,
    projectId: task.project_id[0],
    projectName: task.project_id[1],
    tier: task.tier && task.tier[1],
    lastUpdate: parseDate(task.write_date),
    lastActivity: 0,
    stage,
    stages,
  };
}

export function parseDuration(duration) {
  return {
    id: duration.id,
    taskId: duration.task[0],
    start: parseDate(duration.start),
    end: parseDate(duration.end),
    hours: duration.value,
  };
}

export function parseProject(project) {
  return {
    id: project.id,
    name: project.name,
    sequence: project.sequence,
    taskIds: project.task_ids,
    isTracking: false,
    stages: new Set(),
    stagesCount: {
      todo: 0,
      done: 0,
    },
  };
}
