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
      {$d[duration].start}
    </td>
    <td>
      →
    </td>
    <td>
      {$d[duration].end || "tracking"}
    </td>
    <td>
      {toPrettyTime($d[duration].hours)}
    </td>
    <td>
      <button on:click={() => $removeDuration(duration)}>Remove</button>
    </td>
  </tr>
  {/each}
</table>
{/if}
