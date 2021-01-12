<script>
  import Activity from "./Activity.svelte";
  import { activityPerDay } from "src/state/odoo/project";
  import { title } from "src/state/runtime";
  title.set("Timeline");
</script>

<style>
  .entry {
    display: flex;
    margin-bottom: var(--size-xs);
    position: sticky;
    top: var(--size-m);
    background: #ffffffdd;
  }

  ol {
    list-style: none;
  }

  h5 {
    width: var(--size-m);
    margin: 0;
  }

  .time {
    position: relative;
    height: var(--size-s);
    margin: 0;
    flex: 1;
    padding: 0;
  }

  .time li {
    top: 0;
    position: absolute;
    font-size: 0.8rem;
    transform: translateX(-50%);
  }

  .time li::before {
    content: "";
    position: absolute;
    height: var(--size-xs);
    border-left: 1px solid black;
    top: 98%;
    bottom: 100%;
    left: 50%;
    right: 50%;
  }

  .metadata {
    color: #666;
  }
</style>

<section>
  <div class="entry">
    <ol class="time">
      <li style="left: 0">0h</li>
      <li style="left: 12.5%">3h</li>
      <li style="left: 25%">6h</li>
      <li style="left: 37.5%">9h</li>
      <li style="left: 50%">12h</li>
      <li style="left: 62.5%">15h</li>
      <li style="left: 75%">18h</li>
      <li style="left: 87.5%">21h</li>
      <li style="left: 100%">24h</li>
    </ol>
  </div>

  {#each $activityPerDay as item}
    <Activity {item} />
  {/each}
</section>
