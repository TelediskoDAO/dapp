<script>
  import Report from "./Report.svelte";
  import { toPrettyDuration, toPrettyCurrency } from "src/utils";
  import { linesByProject, totalHours, totalValue } from "src/state/odoo/timesheet";
  import { title } from "src/state/runtime";
  title.set('Reports');
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
  color: #999;
  text-align: center;
}

</style>

<section>
  <h2>Tasks to tokenize</h2>

  <ul>
    <li class="value">
      <span>
        Value
      </span>
      <strong>
        {toPrettyCurrency($totalValue)}
      </strong>
    </li>

    <li class="time">
      <span>
        Time
      </span>
      <strong>
        {toPrettyDuration($totalHours)}
      </strong>
    </li>
  </ul>

{#if $linesByProject.length}
  <Report linesByProject={$linesByProject} />
{:else}
  <p class="note">
    All <strong>approved</strong> tasks have been paid already.
  </p>
{/if}
</section>
