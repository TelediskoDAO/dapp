<script>
  import { durations as d } from "src/state/odoo";
  import Duration from "./Duration.svelte";

  export let taskId;
  export let durationIds;

  let create;

  function handleDone() {
    create = false;
  }

  $: durations = durationIds.map(durationId => $d[durationId]);
  $: activeDurations = durations.filter(duration => duration.end === false)
      .sort((a, b) => b.start - a.start);
  $: pastDurations = durations.filter(duration => duration.end !== false)
      .sort((a, b) => b.start - a.start);
</script>

<style type="text/scss">
  table {
    margin-top: var(--size-m);
    width: 100%;
  }
</style>

<table>
  <thead>
    <tr>
      <th>Duration</th>
      <th>Range</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {#each activeDurations as duration}
    <Duration duration={duration} />
  {/each}
  {#each pastDurations as duration}
    <Duration duration={duration} />
  {/each}
  <tbody>
</table>

{#if !durations.length}
  <p>The task has no time trackings. You can either hit the button "<i>play_arrow</i>" to start tracking time, or create a new entry.</p>
{/if}

<table>
{#if create}
  <Duration {taskId} {handleDone} />
{/if}
</table>

{#if !create}
  <button on:click={()=>create=true}>
    <i>more_time</i>
    New time entry
  </button>
{/if}
