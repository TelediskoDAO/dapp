<script>
  import { tasksToFix, projectList } from "../../state/odoo";
  import Task from "./Task.svelte";
  import Tasks from "./Tasks.svelte";
  import { title } from "../../../state/runtime";
  title.set("Time Tracking");
</script>

<section>
  {#if $tasksToFix.length}
    <h2>
      <i class="warning">warning</i>
      Fix me: problems found in
      {$tasksToFix.length}
      task{$tasksToFix.length > 1 ? "s" : ""}
    </h2>

    <p>
      <strong>Problem:</strong>
      some time entries have incorrect values, or you are tracking multiple tasks
      at the same time.
    </p>

    <p>
      <strong>Solution:</strong>
      In the tasks below, edit or delete the time entries marked with the
      <i class="warning">warning</i>
      sign.
    </p>

    <details>
      <summary>Why did it happen?</summary>

      <p>
        If you use the
        <em>Time Management</em>
        feature in Odoo, you might have multiple time entries
        <strong>start</strong>
        but don't specify an
        <strong>end</strong>, or just have wrong time entries.
      </p>
    </details>

    <ul>
      {#each $tasksToFix as task}
        <li>
          <Task {task} openDetails={true} />
        </li>
      {/each}
    </ul>
  {/if}

  <Tasks stage="todo" list={$projectList} />
</section>

<style>
  .warning {
    color: var(--color-warning-fg);
    background-color: var(--color-warning-bg);
    padding: var(--size-xs);
  }
  ul {
    list-style-type: none;
    margin: 0 0 var(--size-m) 0;
    padding: 0;
  }
</style>
