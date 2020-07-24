<script>
  import { durations as d } from "src/state/odoo";
  import Duration from "./Duration.svelte";

  export let taskId;
  export let durations;

  let create;

  function handleDone() {
    create = false;
  }

</script>

{#if durations.length}
  {#each durations as duration}
    <Duration duration={$d[duration]} />
  {/each}
{:else}
  <p>There are no durations for this task. You can either hit the button "<span class="material-icons">play_arrow</span>" to start tracking time, or create a new entry.
{/if}

{#if create}
  <Duration {taskId} {handleDone} />
{:else}
  <button on:click={()=>create=true}>Create duration</button>
{/if}
