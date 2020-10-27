<script>
  import { parse } from 'qs';
  import { afterUpdate } from 'svelte';
  import { replace, querystring } from 'svelte-spa-router';
  import { tasks, durations, hoursByTask, startDuration, stopDuration, removeDuration, currentTask } from "src/state/odoo";
  import Task from "./Task.svelte";

  export let list;
  export let stage = null;
  export let openDetails = false;

  function singleTasksFirst(list) {
    return [
      ...list.filter(task => !task.hasSubtasks),
      ...list.filter(task => task.hasSubtasks),
    ]
  }

  console.log('list is', list);
  $: sorted = singleTasksFirst(list);

	afterUpdate(() => {
    if ($currentTask && scrollToCurrent) {
      const elem = document.getElementById("task:" + $currentTask.id);
      elem && elem.scrollIntoView({behavior: "smooth"});
      replace("#/tasks");
    }
	});

  $: scrollToCurrent = "scrollToCurrent" in parse($querystring);
</script>

<style type="text/scss">
  @import 'src/styles/index';

  ul {
    list-style-type: none;
    margin: 0 0 var(--size-m) 0;
    padding: 0;
  }
</style>

{#if sorted.length}
<ul>
  {#each sorted as task}
  <li>
    <Task {stage} {task} {openDetails} />
  </li>
  {/each}
</ul>
{:else}
  <p>No tasks.</p>
{/if}
