<script>
  import { durations as d, stopDuration, removeDuration } from "src/state/odoo";
  import { toPrettyTime } from "./utils";
  export let durations;
</script>

{#if durations.length}
<table>
  {#each durations as duration}
  <tr>
    <td>
      {duration}
    </td>
    <td>
      {$d[duration].start}
    </td>
    <td>
      {$d[duration].end}
    </td>
    <td>
      {toPrettyTime($d[duration].hours)}
    </td>
    <td>
      <button on:click={() => $stopDuration(duration)}>Stop</button>
      <button on:click={() => $removeDuration(duration)}>Remove</button>
    </td>
  </tr>
  {/each}
</table>
{/if}
