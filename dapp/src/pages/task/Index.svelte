<script>
  import active from 'svelte-spa-router/active'
  import { tasksToFix, tasksToDo, tasksDone, tasksApproved } from "src/state/odoo";
  import Tasks from "./Tasks.svelte";
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

  :global(a.active) {
    color: white !important;
    background: black;
  }
</style>

<section>

  <div>
    <a href="#/tasks" use:active>To Do</a>
    /
    <a href="#/tasks/done" use:active>Done</a>
    /
    <a href="#/tasks/approved" use:active>Approved</a>
  </div>

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

    <Tasks list={$tasksToFix} openDetails={true} />
  {/if}

  {#if params.stage === "done"}
    <Tasks stage="done" list={$tasksDone} />
  {:else if params.stage === "approved"}
    <Tasks stage="approved" list={$tasksApproved} />
  {:else}
    <Tasks stage="todo" list={$tasksToDo} />
  {/if}
</section>
