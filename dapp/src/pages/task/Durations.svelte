<script>
  import { durations as d } from "src/state/odoo";
  import Duration from "./Duration.svelte";

  export let taskId;
  export let editable;
  export let durationIds;
  export let createTimeEntry;
  export let onCreateTimeEntryDone;

  let durations, activeDurations, pastDurations;

  $: {
    durations = durationIds.map(durationId => $d[durationId]);
    // FIXME:
    activeDurations = durations.filter(duration => duration && duration.end === false)
      .sort((a, b) => b.start - a.start);
    pastDurations = durations.filter(duration => duration && duration.end !== false)
      .sort((a, b) => b.start - a.start);
  }
</script>

<style type="text/scss">
  table {
    margin-top: var(--size-m);
    width: 100%;
  }

  .new-entry{
    text-align: right;
  }
</style>

{#if createTimeEntry}
<table>
  <Duration {taskId} handleDone={onCreateTimeEntryDone} />
</table>
{/if}

{#if durations.length}
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
    <Duration {editable} duration={duration} />
  {/each}
  {#each pastDurations as duration}
    <Duration {editable} duration={duration} />
  {/each}
  </tbody>
</table>
{/if}

{#if !durations.length}
  <p>The task has no time trackings. You need to have at least one time entry to mark the task as done. You can either hit the button "<i>play_arrow</i>" to start tracking time, or create a new entry.</p>
{/if}
