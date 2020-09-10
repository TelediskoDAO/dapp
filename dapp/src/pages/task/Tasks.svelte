<script>
  import { parse } from 'qs';
  import { afterUpdate } from 'svelte';
  import { replace, querystring } from 'svelte-spa-router';
  import { tasks, durations, tasksBacklog, hoursByTask, startDuration, stopDuration, removeDuration, currentTask } from "src/state/odoo";
  import Task from "./Task.svelte";

  export let list;
  export let openDetails = false;

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

  li {
    background-color: rgba(255, 255, 255, 0.6);
    margin-bottom: var(--size-m);
    box-shadow: 0px 2px 3px rgba(0,0,0,0.1);
    @include border;
    border-top: none;
  }
</style>

{#if list.length}
<ul>
  {#each list as task}
  <li>
    <Task {task} {openDetails} />
  </li>
  {/each}
</ul>
{:else}
  <p>No tasks.</p>
{/if}
