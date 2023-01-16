<script>
  import { tasksToFix, projectList } from "../../../state/neokingdom/odoo";
  import Task from "./Task.svelte";
  import Tasks from "./Tasks.svelte";
  import { title } from "../../../state/runtime";
  title.set("Time Tracking");
</script>

<section>
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
