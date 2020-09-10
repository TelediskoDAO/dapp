<script>
	import { slide } from 'svelte/transition';
  import { tasks, currentTask, currentDuration, currentHours, currentHoursTotal, durations, tasksBacklog, hoursByTask, startDuration, stopDuration, markAsDone } from "src/state/odoo";
  import { toPrettyDuration } from "src/utils";
  import Durations from "./Durations.svelte";

  export let task;
  export let openDetails = false;

  let createTimeEntry = false;

  $: tracking = $currentTask && $currentTask.id === task.id;
  $: currentHoursProxy = tracking ? currentHours : null;
  $: currentHoursTotalProxy = tracking ? currentHoursTotal : null;

  async function handleStart() {
    if ($currentTask === undefined) {
      await $startDuration(task.id);
    } else {
      const message = `You are tracking "${$currentTask.name}", wanna switch to "${task.name}" instead?`;
      if (confirm(message)){
        await $stopDuration($currentDuration.id);
        await $startDuration(task.id);
      }
    }
  }

  async function handleStop() {
      await $stopDuration($currentDuration.id);
  }

  async function handleMarkAsDone() {
      const message = "Mark the task as done?";
      if (confirm(message)){
        if(tracking) {
          await $stopDuration($currentDuration.id);
        }
        await $markAsDone(task.id);
      }
  }

</script>

<style type="text/scss">
  @import 'src/styles/index';

/*
  @keyframes pulse-red {
    0% {
      box-shadow: 0 0 4px 0 rgba(255, 82, 82, 0.7);
    }

    70% {
      box-shadow: 0 0 4px 10px rgba(255, 82, 82, 0);
    }

    100% {
      box-shadow: 0 0 4px 0 rgba(255, 82, 82, 0);
    }
  }

  button.stop {
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
    animation: pulse-red 2s infinite;
  }
*/


  .task {
    //border-radius: var(--size-xs);
    background: #ffffff;
    transition: all 1s;
    padding: var(--size-s);
    &.hasSubtasks {
      padding: 0;
    }
    &.isSubtask {
    }
  }

  .tracking {
    margin: -10px;
    border-radius: var(--size-xs);
    box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.3);
    position: relative;
    @include border;
  }

  h3 {
    margin: 0;
  }

  .header {
    display: flex;
    align-items: center;
  }
  .body {
    padding: 0;

    p {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
  }

  .hasSubtasks {
    @include border-bottom;
    .header {
      padding: var(--size-s);
    }
    .body {
      padding: 0;
      margin: 0;
    }
  }

  .isSubtask {
    padding: var(--size-s);
    .header {
      padding: 0;
    }
    .body {
      padding: 0;
    }
    p {
      margin-bottom: 0;
    }
  }

  .header button {
    order: -1;
    margin-right: var(--size-s);
    padding: var(--size-s);
    display: block;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .buttons {
    margin-top: var(--size-s);
  }

  .task:not(.tracking):first-child {
    @include border-top;
  }

  .task {
    @include border-bottom;
  }

  .task:not(.tracking):last-child {
    border-bottom: none;
  }

  .task--stage-done h3 {
    text-decoration: line-through;
  }

</style>

<div
  id="task:{task.id}"
  class="task task--stage-{task.stage}"
  class:tracking
  class:hasSubtasks={task.hasSubtasks}
  class:isSubtask={task.isSubtask}>
  <div class="header">
    <h3>
      {task.name}
    </h3>

    {#if !task.hasSubtasks && task.stage !== "done" && task.stage !== "approved"}
      {#if tracking}
      <button class="stop" on:click={handleStop}>
        <i>stop</i>
      </button>
      {:else}
      <button on:click={handleStart}>
        <i>play_arrow</i>
      </button>
      {/if}
    {/if}
  </div>

  <div class="body" class:isSubtask={task.isSubtask}>
    {#if task.hasSubtasks}
      <ul>
      {#each task.subtaskIds as subtaskId}
        {#if $tasks[subtaskId]}
          <li>
            <svelte:self task={$tasks[subtaskId]} />
          </li>
        {/if}
      {/each}
      </ul>
    {:else}
      <p>
        {#if tracking}
          Current session: {toPrettyDuration($currentHoursProxy)}. <br/>
          Total time: {toPrettyDuration($currentHoursTotalProxy)}.
        {:else}
          Total time: {toPrettyDuration($hoursByTask[task.id])}.
        {/if}

        <button on:click={() => {openDetails = !openDetails}}>
          {#if openDetails}
            <i>unfold_less</i>
          {:else}
            <i>unfold_more</i>
          {/if}
          Details
        </button>
      </p>

      {#if openDetails}
        <!--h4>Description</h4>
        <div>
          {@html task.description}
        </div-->

        <div transition:slide={{duration: 200}}>

          <div class="buttons">
            {#if task.stage === "done"}
            <button on:click={handleStart}>
              <i>play_arrow</i>
              Track time
            </button>
            {:else if task.stage !== "approved"}
            <button
              on:click={handleMarkAsDone}
              disabled={!task.hasDurations}>
              <i>done</i>
              Mark as done
            </button>
            {/if}

            <a href="https://odoo.teledisko.com/web#model=project.task&id={task.id}&view_type=form" target="_blank" class="button">
              <i>open_in_new</i> Open in Odoo
            </a>

            {#if task.stage !== "approved"}
            <button on:click={()=>createTimeEntry=true}>
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
            onCreateTimeEntryDone={()=>createTimeEntry=false}
            />
        </div>
      {/if}
    {/if}
  </div>
</div>
