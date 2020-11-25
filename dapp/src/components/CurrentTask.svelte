<script>
  import { tasks, currentTask, currentDuration, currentHours, currentHoursTotal } from "src/state/odoo";
  import { toPrettyDuration } from "src/utils";
</script>

<style>
div {
  padding: var(--size-s);
  max-width: var(--max-width);
  margin: 0 auto;
}

h3 {
  margin-top: 0;
}

h3, p {
  font-size: var(--font-s);
}

h4, p {
  margin: 0;
}

h4 {
  margin-bottom: var(--size-xs);
  font-weight: normal;
}
section {
  background-color: #aad2d6;
}
</style>

{#if $currentTask}
<section>
  <h3>Current task</h3>
  <h4>{$currentTask.name}</h4>
  <p>
    <i>timer</i>
    {toPrettyDuration($currentHoursTotal)},
    <a href="#/tasks?scrollToCurrent"><i>open_in_new</i> go to task</a>
  </p>
</section>
{/if}
