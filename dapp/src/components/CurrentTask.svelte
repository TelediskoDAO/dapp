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

h4, p {
  margin: 0;
}

h4 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: var(--size-xs);
}
section {
  background-color: var(--color-blue);
}
</style>

{#if $currentTask}
<section>
  <h4>{$currentTask.name}</h4>
  <p>
    <i>timer</i>
    {toPrettyDuration($currentHoursTotal)},
    <a href="#/tasks?scrollToCurrent"><i>open_in_new</i> go to task</a>
  </p>
</section>
{/if}
