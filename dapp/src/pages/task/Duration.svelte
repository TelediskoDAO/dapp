<script>
  import { removeDuration, updateDuration, createDuration } from "src/state/odoo";
  import { clock } from "src/state/clock";
  import { toPrettyDuration, toPrettyRange, splitDate } from "./utils";

  export let handleDone = null;
  export let taskId = null;
  export let duration = null;

  let edit;
  let action;

  let startDate, startTime, endDate, endTime;

  $: hours = duration && (duration.end === false ? ($clock - duration.start) / (60 * 60 * 1000) : duration.hours);
  $: range = duration && toPrettyRange(duration.start, duration.end);

  if(duration) {
    edit = false;
    [startDate, startTime] = splitDate(duration.start);
    [endDate, endTime] = splitDate(duration.end);
  } else if (taskId) {
    edit = true;
    [startDate, startTime] = splitDate();
    [endDate, endTime] = splitDate();
  } else {
    throw new Error("Set a duration or a taskId");
  }

  async function handleSubmit() {
    // If there is no `duration`, we create a new duration connected to `taskId`
    let start = [startDate, startTime].join('T');
    let end = [endDate, endTime].join('T');
    if (duration) {
      await $updateDuration(duration.id, start, end);
      edit = false;
    } else if (taskId) {
      await $createDuration(taskId, start, end);
      handleDone();
    }
  }

</script>

<style type="text/scss">
@import 'src/styles/index';

.duration {
  font-weight: bold;
}

.options {
  text-align: right;
}

.timer {
  animation: blink 1s infinite;
}

</style>

{#if duration}
<tr>
  <td>
    <span class="duration">{toPrettyDuration(hours)}</span>
    {#if !range.end}
    <i class="timer">timer</i>
    {/if}
  </td>
  <td>
    <span class="range">{range.start}–{#if range.end}{range.end}{:else}<strong class="timer">now</strong>{/if}</span>
  </td>

  <td class="options">

    <div class="buttons">
      <button on:click={() => edit = true}>
      <i>edit</i>
      </button><button on:click={() => confirm('Are you sure?') && $removeDuration(duration.id)}>
      <i>delete</i>
      </button>
    </div>
  </td>
</tr>
{/if}

{#if edit}
<tr>
  <td colspan="3">
    <form on:submit|preventDefault={handleSubmit}>
      <p>
        <label>Start<br/>
          <input bind:value={startDate} type="date" required />
          <input bind:value={startTime} type="time" required />
        </label>
      </p>
      <p>
        <label>End<br/>
          <input bind:value={endDate} type="date" min={startDate} required />
          <input bind:value={endTime} type="time" min={startDate === endDate ? startTime : ""} required />
        </label>
      </p>
      <div class="buttons">
        <button type="submit">Save</button>
        {#if duration}
          <button type="reset" on:click={() => edit = false}>Cancel</button>
        {:else}
          <button type="reset" on:click={() => confirm('Are you sure?') && handleDone()}>Cancel</button>
        {/if}
      </div>
    </form>
  </td>
</tr>
{/if}
