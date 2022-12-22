const STAGES = {
  29: "backlog",
  30: "progress",
  31: "done",
  32: "approved",
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
    userId: task.user_id[0],
    name: task.name,
    description: task.description,
    isTracking: false,
    isParentTask: task.child_ids.length > 0 && !task.parent_id,
    isSingleTask: task.child_ids.length === 0 && !task.parent_id,
    isSubtask: !!task.parent_id,
    subtaskIds: task.child_ids,
    hasSubtasks: task.child_ids.length > 0,
    hasDurations: true, // todo fixme => task.duration_entry.length > 0,
    parentId: task.task_id ? task.task_id[0] : null,
    durations: [], // todo fixme => task.duration_entry,
    projectId: task.project_id[0],
    projectName: task.project_id[1],
    tier: task.tier && task.tier[1],
    tierId: task.tier && task.tier[0],
    lastUpdate: parseDate(task.write_date),
    lastActivity: 0,
    stage,
    stages,
  };
}

export function parseDuration(duration) {
  return {
    id: duration.id,
    taskId: duration.task_id[0],
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
