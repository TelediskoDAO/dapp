<script>
	import { slide } from 'svelte/transition';
  import { tasks, durations, tasksBacklog, hoursByTask, startDuration, stopDuration, removeDuration } from "src/state/odoo";
  import { toPrettyTime } from "./utils";
  import Durations from "./Durations.svelte";
  export let task;
  let details = false;
</script>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    border-bottom: 1px solid black;
  }

  .header {
    display: flex;
  }

  .header button {
    order: -1;
  }
</style>

<div class="header">
  <h3>
    {task.name}
  </h3>
  {#if !task.hasSubtasks}
    <button on:click={() => $startDuration(task.id)}>
      <i class="material-icons">play_arrow</i>
    </button>
  {/if}
</div>

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
    Total time: {toPrettyTime($hoursByTask[task.id])}.
    <button on:click={() => {details = !details}}>
      {details ? "Hide" : "Show"} Details
    </button>
  </p>
  {#if details}
  <div transition:slide={{duration: 200}}>
    <Durations durations={task.durations} />
  </div>
  {/if}
{/if}
