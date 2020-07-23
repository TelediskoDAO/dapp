<script>
	import { slide } from 'svelte/transition';
  import { tasks, currentTask, currentDuration, currentHours, currentHoursTotal, durations, tasksBacklog, hoursByTask, startDuration, stopDuration, removeDuration } from "src/state/odoo";
  import { toPrettyTime } from "./utils";
  import Durations from "./Durations.svelte";
  export let task;

  let details = false;
  $: tracking = $currentTask && $currentTask.id === task.id;

  function handleStart() {
    if ($currentTask === undefined) {
      $startDuration(task.id);
    } else {
      const message = `You are tracking "${task.name}", wanna switch to "${$currentTask.name}" instead?`;
      if (confirm(message)){
        $stopDuration($currentTask.id);
        $startDuration(task.id);
      }
    }
  }

  function handleStop() {
      $stopDuration($currentDuration.id);
  }
</script>

<style type="text/scss">
  @import 'src/styles/index';

  .task {
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
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
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

</style>

<div class="task" class:tracking class:hasSubtasks={task.hasSubtasks} class:isSubtask={task.isSubtask}>
  <div class="header">
    <h3>
      {task.name}
    </h3>
    {#if !task.hasSubtasks}
      {#if tracking}
      <button on:click={() => handleStop()}>
        <i class="material-icons">stop</i>
      </button>
      {:else}
      <button on:click={() => handleStart()}>
        <i class="material-icons">play_arrow</i>
      </button>
      {/if}
    {/if}
  </div>

  <div class="body" class:isSubtask={task.isSubtask}>
    {#if task.hasSubtasks}
      <ul>
      {#each task.subtaskIds as subtaskId}
        <li>
        <svelte:self task={$tasks[subtaskId]} />
        </li>
      {/each}
      </ul>
    {:else}
      <p>
        {#if tracking}
        Current session: {toPrettyTime($currentHours)}. Total time: {toPrettyTime($currentHoursTotal)}.
        {:else}
        Total time: {toPrettyTime($hoursByTask[task.id])}.
        {/if}

        {#if task.durations.length}
        <button on:click={() => {details = !details}}>
          {details ? "Hide" : "Show"} Details
        </button>
        {/if}
      </p>
      {#if details}
      <div transition:slide={{duration: 200}}>
        <Durations durations={task.durations} />
      </div>
      {/if}
    {/if}
  </div>
</div>
