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
  return {
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
