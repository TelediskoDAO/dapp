<script>
  import { durations as d } from "../../../state/teledisko/odoo";
  import Duration from "./Duration.svelte";

  export let taskId;
  export let editable;
  export let durationIds;
  export let createTimeEntry;
  export let onCreateTimeEntryDone;

  let durations, activeDurations, pastDurations;

  $: {
    durations = durationIds.map((durationId) => $d[durationId]);
    // FIXME:
    activeDurations = durations
      .filter((duration) => duration && duration.end === false)
      .sort((a, b) => b.start - a.start);
    pastDurations = durations
      .filter((duration) => duration && duration.end !== false)
      .sort((a, b) => b.start - a.start);
  }
</script>

{#if createTimeEntry}
  <table>
    <Duration {taskId} handleDone={onCreateTimeEntryDone} />
  </table>
{/if}

<table>
  {#if durations.length}
    <thead>
      <tr>
        <th>Duration</th>
        <th>Range</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each activeDurations as duration}
        <Duration {editable} {duration} />
      {/each}
      {#each pastDurations as duration}
        <Duration {editable} {duration} />
      {/each}
    </tbody>
  {/if}
</table>

<style>
  table {
    margin-top: var(--size-s);
    width: 100%;
    padding-bottom: var(--size-m);
  }
</style>
