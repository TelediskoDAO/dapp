<script>
  import { tasksOpen, tasksBacklog, tasksProgress } from "src/state/odoo";
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

  {#if $tasksOpen.length > 1}
  <h2><i class="warning">warning</i> Fix me: {$tasksOpen.length} concurrent trackings found</h2>

  <p>
    <strong>Problem:</strong> You are time tracking multiple tasks at the same time.
  </p>

  <p>
    <strong>Solution:</strong> In the tasks below, edit or delete the time entries that are <strong><i class="timer">timer</i> active</strong>.
  </p>

  <details>
    <summary>Why did it happen?</summary>

    <p>
      If you use the <em>Time Management</em> feature in Odoo, you might have
      some time entries that have a <strong>start</strong> but don't specify an
      <strong>end</strong>.
    </p>
  </details>

  <Tasks list={$tasksOpen} openDetails={true} />
  {/if}

  <div>
  <h2>Tasks in progress</h2>

  <Tasks list={$tasksProgress} />

  <h2>Tasks in Backlog</h2>

  <Tasks list={$tasksBacklog} />
</section>
