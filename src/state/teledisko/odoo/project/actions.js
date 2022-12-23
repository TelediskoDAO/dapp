import { derived } from "svelte/store";

import { agent } from "../../../odoo";
import { utc } from "../../../../utils";
import { upstream, tasks, hoursByTask, durations } from "./objects";

const STAGES_TO_ID = {
  backlog: 1,
  progress: 5,
  done: 2,
  approved: 3,
};

export const markAsDone = derived(
  [agent, tasks, hoursByTask],
  ([$agent, $tasks, $hoursByTask]) =>
    async (taskId) => {
      const task = $tasks[taskId];
      const result = await $agent.update("project.task", taskId, {
        stage_id: STAGES_TO_ID["done"],
        duration: $hoursByTask[taskId],
      });
      const [updatedTask] = await $agent.read("project.task", [taskId]);
      let updatedParentTask;
      // FIXME: need to find a better way to ignore virtual parents
      if (
        task.parentId &&
        task.parentId.startsWith &&
        !task.parentId.startsWith("project:")
      ) {
        [updatedParentTask] = await $agent.read("project.task", [
          task.parentId,
        ]);
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
  ([$agent, $tasks, $hoursByTask]) =>
    async (taskId, start, end) => {
      const duration = {
        task: taskId,
        start: utc(start),
        end: end && utc(end),
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
  ([$agent, $tasks, $hoursByTask]) =>
    async (taskId) => {
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
        // FIXME: need to find a better way to ignore virtual parents
        if (
          task.parentId &&
          task.parentId.startsWith &&
          !task.parentId.startsWith("project:")
        ) {
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
  ([$agent, $durations, $hoursByTask]) =>
    async (durationId) => {
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
  ([$agent, $tasks, $durations, $hoursByTask]) =>
    async (durationId) => {
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
  ([$agent, $durations, $hoursByTask]) =>
    async (durationId, start, end) => {
      const duration = $durations[durationId];
      const taskId = duration.taskId;
      const hours =
        $hoursByTask[taskId] -
        calculateHours(duration.start, duration.end) +
        calculateHours(start, end);
      const result = await $agent.update("project.task.duration", durationId, {
        start: utc(start),
        end: end && utc(end),
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
