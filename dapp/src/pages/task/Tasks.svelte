<script>
  import { parse } from 'qs';
  import { afterUpdate } from 'svelte';
  import { replace, querystring } from 'svelte-spa-router';
  import { tasks, durations, hoursByTask, startDuration, stopDuration, removeDuration, currentTask } from "src/state/odoo";
  import Task from "./Task.svelte";
  import Foldable from "src/components/Foldable.svelte";

  export let list;
  export let stage = null;
  export let openDetails = false;

  let projects = [];

  //function singleTasksFirst(list) {
  //  return [
  //    ...list.filter(task => !task.hasSubtasks),
  //    ...list.filter(task => task.hasSubtasks),
  //  ]
  //}

  $: {
    const objects = list.reduce((projects, task) => {
      if(!projects[task.projectId]) {
        projects[task.projectId] = {
          id: task.projectId,
          name: task.projectName,
          tasks: []
        }
      }
      projects[task.projectId].tasks.push(task);
      return projects;
    }, {});

    Object.values(objects).forEach(project => {
      //project.tasks = singleTasksFirst(project.tasks);
      project.tasks.sort((a, b) => b.lastActivity - a.lastActivity);
      project.lastActivity = project.tasks.reduce((acc, curr) => Math.max(acc, curr.lastActivity), 0);
    });
    projects = Object.values(objects);
    projects.sort((a, b) => b.lastActivity - a.lastActivity);
  }

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

  .header {
    display: flex;
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

{#each projects as project}
  <Foldable key={["project", stage, project.id].join(":")}>
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
      {#if project.tasks.length}
      <ul>
        {#each project.tasks as task}
        <li>
          <Task {stage} {task} {openDetails} />
        </li>
        {/each}
      </ul>
      {:else}
        <p>No tasks.</p>
      {/if}
    </div>
  </Foldable>
{/each}
