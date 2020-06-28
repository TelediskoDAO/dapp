async function myTasks(s) {
  const tasks = await s.r("project.task", { user_id: s.uid });
  for (let task of tasks) {
    console.log(task.id, task.name);
  }
}

async function myTrackings(s) {
  const durations = await s.r("project.task.duration", { create_uid: s.uid });
  const tasks = {};
  let total = 0;
  for (let duration of durations) {
    const [id, name] = duration.task;
    const value = duration.value;
    tasks[id] = {
      name,
      hours: value + (tasks[id] ? tasks[id].hours : 0),
    };
    total += value;
  }

  for (let key of Object.keys(tasks)) {
    console.log(`[${key}] ${tasks[key].name}: ${tasks[key].hours}h`);
  }
  console.log(`${total}h`);
  //  const task = tasks[key];
  //  const [id, name] = task.task;
  //  const hours = console.log(task);
  //  console.log;
  //}
}
module.exports = {
  myTasks,
  myTrackings,
};
