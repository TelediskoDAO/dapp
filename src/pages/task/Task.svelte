<script>
  import { slide } from "svelte/transition";
  import {
    tasks,
    currentTask,
    currentDuration,
    currentHoursTotal,
    hoursByTask,
    startDuration,
    stopDuration,
    markAsDone,
  } from "../../state/odoo";
  import { toPrettyDuration } from "../../utils";
  import Durations from "./Durations.svelte";

  export let task;
  export let stages = ["todo"];
  export let openDetails = false;

  let createTimeEntry = false;
  let working = false;

  $: subtasks = task.subtaskIds.map((id) => $tasks[id]).filter((task) => task);
  $: tracking = $currentTask && $currentTask.id === task.id;
  $: currentHoursTotalProxy = tracking
    ? $currentHoursTotal
    : $hoursByTask[task.id];

  async function handleStart() {
    working = true;
    if ($currentTask === undefined) {
      await $startDuration(task.id);
    } else {
      const message = `You are tracking "${$currentTask.name}", wanna switch to "${task.name}" instead?`;
      if (confirm(message)) {
        await $stopDuration($currentDuration.id);
        await $startDuration(task.id);
      }
    }
    working = false;
  }

  async function handleStop() {
    working = true;
    await $stopDuration($currentDuration.id);
    working = false;
  }

  async function handleMarkAsDone() {
    const message = "Mark the task as done?";
    if (confirm(message)) {
      if (tracking) {
        await $stopDuration($currentDuration.id);
      }
      await $markAsDone(task.id);
    }
  }
</script>

<!--{task.id}, {task.name}, {task.lastUpdate}, {Array.from(task.stages).toString()}-->

{#if stages.some((s) => task.stages.has(s))}
  <div
    id="task:{task.id}"
    class="task task--stage-{task.stage}"
    class:tracking
    class:hasSubtasks={task.hasSubtasks}
    class:isSubtask={task.isSubtask}
    class:isParentTask={task.isParentTask}
    class:isSingleTask={task.isSingleTask}
  >
    <div class="header">
      <h3>
        {task.name}
      </h3>

      {#if !task.hasSubtasks}
        <button
          class="details"
          on:click={() => {
            openDetails = !openDetails;
          }}
        >
          {#if openDetails}
            <i>unfold_less</i>
          {:else}
            <i>unfold_more</i>
          {/if}
        </button>

        {#if task.stage !== "approved"}
          {#if task.stage === "todo"}
            {#if tracking}
              <button class="stop" disabled={working} on:click={handleStop}>
                <i>stop</i>
              </button>
            {:else}
              <button class="start" disabled={working} on:click={handleStart}>
                <i>play_arrow</i>
              </button>
            {/if}
          {:else}
            <button class="done" disabled={true}>
              <i>done</i>
            </button>
          {/if}
        {/if}
      {/if}
    </div>

    <div class="body" class:isSubtask={task.isSubtask}>
      {#if task.hasSubtasks}
        <ul>
          {#each subtasks as subtask}
            <li>
              <svelte:self task={subtask} {stages} />
            </li>
          {/each}
        </ul>
      {:else if openDetails}
        <!--h4>Description</h4>
        <div>
          {@html task.description}
        </div-->

        <div transition:slide={{ duration: 200 }}>
          <p>
            <strong>Total time:</strong>
            {toPrettyDuration(currentHoursTotalProxy)}.
            {#if task.tier}
              <strong>Tier:</strong> {task.tier}
            {/if}
          </p>

          <div class="buttons">
            {#if task.stage === "done"}
              <button disabled={working} on:click={handleStart}>
                <i>play_arrow</i>
                Track time
              </button>
            {:else if task.stage !== "approved"}
              <button on:click={handleMarkAsDone} disabled={!task.hasDurations}>
                <i>done</i>
                Mark as done
              </button>
            {/if}

            <a
              href="https://odoo.teledisko.com/web#model=project.task&id={task.id}&view_type=form"
              target="_blank"
              class="button"
            >
              <i>open_in_new</i> Open in Odoo
            </a>

            {#if task.stage !== "approved"}
              <button on:click={() => (createTimeEntry = true)}>
                <i>more_time</i>
                New time entry
              </button>
            {/if}
          </div>

          <Durations
            taskId={task.id}
            editable={task.stage !== "approved"}
            durationIds={task.durations}
            {createTimeEntry}
            onCreateTimeEntryDone={() => (createTimeEntry = false)}
          />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  button.done {
    background-color: var(--color-green);
  }

  button.done,
  button.start,
  button.stop {
    border-radius: 100%;
  }

  .task {
    background: #ffffff;
    transition: all 1s;
  }
  .task.hasSubtasks {
    padding: 0;
  }

  .tracking .stop {
    background-color: var(--color-blue);
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    flex-grow: 1;
    font-weight: normal;
  }

  .isSingleTask {
    margin-bottom: var(--size-s);
  }

  .isParentTask {
    margin-bottom: var(--size-m);
  }

  .isParentTask > .header h3 {
    font-weight: bold;
  }

  .header {
    display: flex;
    align-items: center;
  }

  .body {
    padding: 0;
  }

  .hasSubtasks .header {
    margin-bottom: var(--size-s);
  }

  .isSubtask .header {
    padding: 0;
  }
  .isSubtask p {
    margin: 0;
  }

  .header .start,
  .header .stop,
  .header .done {
    order: -1;
    margin-right: var(--size-s);
    display: block;
  }
  .header .details {
    border: none;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .buttons {
    margin-top: var(--size-s);
  }

  i {
    vertical-align: bottom;
  }
</style>
