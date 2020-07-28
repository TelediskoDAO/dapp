<script>
  import { tasksToFix, tasksBacklog, tasksProgress } from "src/state/odoo";
  import Tasks from "./Tasks.svelte";
</script>

<style type="text/scss">
  @import 'src/styles/index';

  h2 {
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

</style>

<section>
  <h1>All your tasks</h1>

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

  {#if $tasksProgress.length}
    <h2>Tasks in progress</h2>

    <Tasks list={$tasksProgress} />
  {/if}

  {#if $tasksBacklog.length}
    <h2>Tasks in Backlog</h2>

    <Tasks list={$tasksBacklog} />
  {/if}
</section>
