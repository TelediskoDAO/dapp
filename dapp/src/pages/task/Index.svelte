<script>
  import { tasksBacklog, tasksProgress } from "src/state/odoo";
  import Tasks from "./Tasks.svelte";
</script>

<h1>Tasks</h1>

<h2>In progress</h2>

<Tasks list={$tasksProgress} />

<h2>Backlog</h2>

<Tasks list={$tasksBacklog} />
