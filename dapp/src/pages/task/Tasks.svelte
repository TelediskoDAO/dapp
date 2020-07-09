<script>
  import { tasks, durations, tasksBacklog, hoursByTask, startDuration, stopDuration, removeDuration } from "src/state/odoo";
  import Task from "./Task.svelte";
  export let list;
</script>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>

<ul>
  {#each list as task}
  <li>
    <Task {task} />
  </li>
  {/each}
</ul>
