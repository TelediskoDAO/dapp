<script>
  import { parse } from 'qs';
  import { afterUpdate } from 'svelte';
  import { replace, querystring } from 'svelte-spa-router';
  import { projects, tasks, durations, hoursByTask, startDuration, stopDuration, removeDuration, currentTask } from "src/state/odoo";
  import Task from "./Task.svelte";
  import Foldable from "src/components/Foldable.svelte";

  export let list;
  export let openDetails = false;

  let stages = ['todo'];

  $: sortedList = list.sort((a, b) => a.sequence - b.sequence);

	afterUpdate(() => {
    if ($currentTask && scrollToCurrent) {
      const elem = document.getElementById("task:" + $currentTask.id);
      elem && window.setTimeout(() => elem.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'center'}), 0);
      replace("#/tasks");
    }
	});

  $: scrollToCurrent = "scrollToCurrent" in parse($querystring);

  function toggleDone() {
    if(stages.includes('done')) {
      stages = ['todo'];
    } else {
      stages = ['todo', 'done'];
    }
  }
</script>

<style type="text/scss">
  @import 'src/styles/index';

  ul {
    list-style-type: none;
    margin: 0 0 var(--size-m) 0;
    padding: 0;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: var(--size-s);
    @include border-bottom;
  }

  .header h2 {
    font-size: 1.2rem;
    flex: 1;
    margin: 0;
  }

  .header button {
    border: none;
  }

  .header i {
    font-size: 24px;
  }
</style>

{#each sortedList as project}
  <Foldable
    key={["project", project.id].join(":")}
    show={false}
    showOverride={project.isTracking} >
    <div slot="header" class="header" let:visible>
      <h2>{project.name}</h2>
      <p on:click|stopPropagation={toggleDone}>
        {stages.includes('done') ? 'Hide' : 'Show'}
        <strong>done</strong>
      </p>
      <button>
        {#if visible}
          <i>unfold_less</i>
        {:else}
          <i>unfold_more</i>
        {/if}
      </button>
    </div>

    <div slot="body">
      {#if project.taskIds.length}
      <ul>
        {#each project.taskIds as taskId}
        {#if $tasks[taskId] && $tasks[taskId].isParentTask}
        <li>
          <Task {stages} task={$tasks[taskId]} {openDetails} />
        </li>
        {/if}
        {/each}
      </ul>
      {:else}
        <p>No tasks.</p>
      {/if}
    </div>
  </Foldable>
{/each}
