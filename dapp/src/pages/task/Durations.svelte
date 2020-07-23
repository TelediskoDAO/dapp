<script>
  import { durations as d, stopDuration, removeDuration } from "src/state/odoo";
  import { toPrettyDuration, toPrettyTime } from "./utils";
  export let durations;
</script>

{#if durations.length}
<table>
  {#each durations as duration}
  <tr>
    <td>
      {toPrettyTime($d[duration].start)}
    </td>
    <td>
      →
    </td>
    <td>
      {$d[duration].end ? toPrettyTime($d[duration].end) : "tracking"}
    </td>
    <td>
      {toPrettyDuration($d[duration].hours)}
    </td>
    <td>
      <button on:click={() => $removeDuration(duration)}>Remove</button>
    </td>
  </tr>
  {/each}
</table>
{/if}
