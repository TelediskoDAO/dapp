<script>
  import { parse } from 'qs';
  import { afterUpdate } from 'svelte';
  import { replace, querystring } from 'svelte-spa-router';
  import { projects, tasks, durations, hoursByTask, startDuration, stopDuration, removeDuration, currentTask } from "src/state/odoo";
  import Task from "./Task.svelte";
  import Foldable from "src/components/Foldable.svelte";

  export let list;
  export let openDetails = false;

  $: sortedList = list.sort((a, b) => a.sequence - b.sequence);
  $: stages = sortedList.reduce((acc, curr) => {acc[curr.id] = ["todo"]; return acc}, {});

	afterUpdate(() => {
    if ($currentTask && scrollToCurrent) {
      const elem = document.getElementById("task:" + $currentTask.id);
      elem && window.setTimeout(() => elem.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'center'}), 0);
      replace("#/tasks");
    }
	});

  $: scrollToCurrent = "scrollToCurrent" in parse($querystring);

  function toggleDone(id) {
    if(stages[id].includes('done')) {
      stages[id] = ['todo'];
    } else {
      stages[id] = ['todo', 'done'];
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
    font-size: var(--font-l);
    flex: 1;
    margin: 0;
  }

  .header button {
    border: none;
  }

  .header i {
    font-size: 24px;
  }

  .metadata {
    text-align: right;
    font-size: var(--font-s);
    color: var(--color-gray-7);
  }

  .metadata .toggle {
    cursor: pointer;
    text-decoration: underline;
  }
</style>

{#each sortedList as project}
  <Foldable
    key={["project", project.id].join(":")}
    show={false}
    showOverride={project.isTracking} >
    <div slot="header" class="header" let:visible>
      <h2>{project.name}</h2>
      <button>
        {#if visible}
          <i>unfold_less</i>
        {:else}
          <i>unfold_more</i>
        {/if}
      </button>
    </div>

    <div slot="body">
      <div class="metadata">
        {#if project.stagesCount.done > 0}
        <p>
          <span
            class="toggle"
            on:click|stopPropagation={toggleDone.bind(null, project.id)}
          >{stages[project.id].includes('done') ? 'Hide' : 'Show'} completed tasks</span>
        </p>
        {/if}
      </div>
      {#if project.taskIds.length}
      <ul>
        {#each project.taskIds as taskId}
        {#if $tasks[taskId] && $tasks[taskId].isParentTask}
        <li>
          <Task stages={stages[project.id]} task={$tasks[taskId]} {openDetails} />
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
