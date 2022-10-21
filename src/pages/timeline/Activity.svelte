<script>
  import { toPrettyDuration } from "../../utils";

  export let item;
  let showDetails = false;

  function displayTime(d) {
    if (d) {
      return d.getHours() + ":" + d.getMinutes().toString().padStart(2, "0");
    } else {
      return "now";
    }
  }
</script>

<div on:click={() => (showDetails = !showDetails)} class:showDetails>
  <div class="entry">
    <h5>{item.day.getDate()}/{item.day.getMonth() + 1}</h5>
    <ol class="activity">
      {#each item.activity as entry}
        <li class:showDetails>
          <span
            class="bar"
            style="left: {entry.relativeStart * 100}%; right: {100 -
              entry.relativeEnd * 100}%"
          />
          <div class="metadata">
            <span class="time">
              {displayTime(entry.start)}–{#if entry.end}
                {displayTime(entry.end)}
              {:else}<strong class="timer">now</strong>{/if},
              {toPrettyDuration(entry.hours)}, stage:
              {entry.task.stage}
            </span>
            <br />
            {entry.task.name}
          </div>
        </li>
      {/each}
    </ol>
  </div>
</div>

<style>
  .entry {
    display: flex;
    margin-bottom: var(--size-s);
    height: var(--size-s);
  }

  .showDetails .entry {
    height: auto;
  }

  ol {
    list-style: none;
  }

  h5 {
    width: var(--size-m);
    margin: 0;
  }

  .activity {
    background: #e0e0e0;
    margin: 0;
    flex: 1;
    padding: 0;
  }

  .activity li {
    position: relative;
    height: 0;
  }

  .activity li.showDetails {
    margin-bottom: var(--size-s);
    height: auto;
  }

  .activity li.showDetails .metadata {
    opacity: 1;
  }

  .activity .bar {
    position: absolute;
    top: 0;
    height: var(--size-s);
    background: #00000060;
  }

  .metadata {
    opacity: 0;
    padding: 0 var(--size-xs);
  }

  h5,
  .time {
    font-size: 0.8rem;
  }
</style>
