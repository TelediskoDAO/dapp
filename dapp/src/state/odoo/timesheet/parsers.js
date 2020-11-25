export function parseLine(line) {
  return {
    id: line.id,
    projectId: line.project_id[0],
    projectName: line.project_id[1],
    taskId: line.task_id[0],
    taskName: line.task_id[1],
    subtaskId: line.subtask_id && line.subtask_id[0],
    subtaskName: line.subtask_id && line.subtask_id[1],
    name: line.name,
    tier: "senior", //line.tier,
    hours: line.unit_amount,
    value: line.unit_amount * 75,
    tokenAmount: line.token_amount,
    tokenized: line.tokenized,
  };
}
