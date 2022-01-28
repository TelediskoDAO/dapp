<script>
  import Report from "./Report.svelte";
  import { toPrettyDuration, toPrettyCurrency } from "src/utils";
  import {
    linesByProject,
    totalHours,
    totalValue,
    prospectByProject,
    prospectTotalHours,
    prospectTotalValue,
  } from "src/state/odoo/timesheet";
  import { title } from "src/state/runtime";
  title.set("Reports");
</script>

<style>
  h2 {
    text-align: center;
    margin-bottom: var(--size-s);
  }

  ul {
    padding: 0;
    margin: 0 0 var(--size-m) 0;
    display: flex;
    justify-content: center;
  }

  li {
    list-style-type: none;
    padding: var(--size-xs) var(--size-s);
    margin: 0 var(--size-s);
  }

  ul li span,
  ul li strong {
    margin: var(--size-xs) 0;
    text-align: center;
    display: block;
  }
  ul li strong {
    font-size: var(--font-l);
  }

  .note {
    font-size: var(--font-s);
    color: var(--color-gray-9);
    text-align: center;
  }

  .prospect {
    margin-bottom: var(--size-l);
  }
</style>

<section>
  <div class="prospect">
    <h2>Tasks done</h2>

    <p class="note">
      The following tasks
      <strong>have not been approved</strong>
      by the project controller yet
    </p>

    <ul>
      <li class="value">
        <span>Value</span>
        <strong>{toPrettyCurrency($prospectTotalValue)}</strong>
      </li>

      <li class="time">
        <span>Time</span>
        <strong>{toPrettyDuration($prospectTotalHours)}</strong>
      </li>
    </ul>

    {#if $prospectByProject.length}
      <Report linesByProject={$prospectByProject} />
    {:else}
      <p class="note">No hours logged.</p>
    {/if}
  </div>

  <div class="approved">
    <h2>Task approved</h2>

    <p class="note">You will receive tokens within a week</p>

    <ul>
      <li class="value">
        <span>Value</span>
        <strong>{toPrettyCurrency($totalValue)}</strong>
      </li>

      <li class="time">
        <span>Time</span>
        <strong>{toPrettyDuration($totalHours)}</strong>
      </li>
    </ul>

    {#if $linesByProject.length}
      <Report linesByProject={$linesByProject} />
    {:else}
      <p class="note">
        All
        <strong>approved</strong>
        tasks have been paid already.
      </p>
    {/if}
  </div>
</section>
