<script>
  import { tasksBacklog, tasksProgress } from "src/state/odoo";
  import Tasks from "./Tasks.svelte";
</script>

<style type="text/scss">
  @import 'src/styles/index';

  h2 {
    @include border-bottom-thick;
  }

</style>

<section>
  <h1>Project: <a href="#/project/1234">Aragon</a></h1>

  <h2>Tasks in progress</h2>

  <Tasks list={$tasksProgress} />

  <h2>Tasks in Backlog</h2>

  <Tasks list={$tasksBacklog} />
</section>
