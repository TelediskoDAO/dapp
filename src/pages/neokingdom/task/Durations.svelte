<script>
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import { durations as d } from "../../../state/neokingdom/odoo";
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
  <DataTable
    table$aria-label="Durations list"
    style="width: 100%; margin: 1rem 0; margin-bottom: 2rem;"
  >
    <Body>
      {#key taskId}
        <Duration {taskId} handleDone={onCreateTimeEntryDone} />
      {/key}
    </Body>
  </DataTable>
{/if}

<DataTable
  table$aria-label="Durations list"
  style="width: 100%; margin: 1rem 0; margin-bottom: 2rem;"
>
  <Head>
    <Row>
      <Cell>Duration</Cell>
      <Cell>Range</Cell>
      <Cell>Description</Cell>
      <Cell />
    </Row>
  </Head>
  <Body>
    {#each activeDurations as duration}
      {#key duration.id}
        <Duration {editable} {duration} />
      {/key}
    {/each}
    {#each pastDurations as duration}
      {#key duration.id}
        <Duration {editable} {duration} />
      {/key}
    {/each}
  </Body>
</DataTable>
