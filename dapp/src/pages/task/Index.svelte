<script>
  import { tasksToFix, projectList } from "src/state/odoo";
  import Task from "./Task.svelte";
  import Tasks from "./Tasks.svelte";
  import { title } from "src/state/runtime";
  title.set('Time Tracking');
  export let params = {};
</script>

<style type="text/scss">
  @import 'src/styles/index';

  h1 {
    @include border-bottom-thick;
  }

  .warning {
    color: var(--color-warning-fg);
    background-color: var(--color-warning-bg);
    padding: var(--size-xs);
  }

  .timer {
    animation: blink 1s infinite;
  }

  a {
    padding: var(--size-xs) var(--size-s);
  }

  div {
    margin-bottom: var(--size-s);
  }

  /* FIXME */

  ul {
    list-style-type: none;
    margin: 0 0 var(--size-m) 0;
    padding: 0;
  }

</style>

<section>

  {#if $tasksToFix.length}
    <h2><i class="warning">warning</i> Fix me: problems found in {$tasksToFix.length} task{$tasksToFix.length > 1 ? "s" : ""}</h2>

    <p>
      <strong>Problem:</strong> some time entries have incorrect values, or you are tracking multiple tasks at the same time.
    </p>

    <p>
      <strong>Solution:</strong> In the tasks below, edit or delete the time entries marked with the <i class="warning">warning</i> sign.
    </p>

    <details>
      <summary>Why did it happen?</summary>

      <p>
        If you use the <em>Time Management</em> feature in Odoo, you might have
        multiple time entries <strong>start</strong> but don't specify an
        <strong>end</strong>, or just have wrong time entries.
      </p>
    </details>

    <ul>
    {#each $tasksToFix as task}
    <li>
      <Task task={task} openDetails={true} />
    </li>
    {/each}
    </ul>
  {/if}

  <Tasks stage="todo" list={$projectList} />
</section>
