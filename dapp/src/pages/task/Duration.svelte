<script>
  // FIXME durationsOpen should not be here.
  import { durationsOpen, removeDuration, updateDuration, createDuration } from "src/state/odoo";
  import { clock } from "src/state/clock";
  import { toPrettyDuration, toPrettyRange, splitDate } from "src/utils";

  export let editable = true;
  export let handleDone = null;
  export let taskId = null;
  export let duration = null;

  let edit = duration ? false : true;
  let action;

  let startDate, startTime, endDate, endTime, range, hours;

  if (taskId) {
    [startDate, startTime] = splitDate();
    [endDate, endTime] = splitDate();
  }

  $: {
    let currentTime = Math.max($clock, Date.now());
    range = duration && toPrettyRange(duration.start, duration.end);
    hours = duration && (duration.end === false ? (currentTime - duration.start) / (60 * 60 * 1000) : duration.hours);

    if(!edit) {
      [startDate, startTime] = splitDate(duration.start);
      [endDate, endTime] = splitDate(duration.end);
    }
  }

  async function handleSubmit() {
    // If there is no `duration`, we create a new duration connected to `taskId`
    let start = new Date([startDate, startTime].join(' '));
    let end = new Date([endDate, endTime].join(' '));
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

.buttons {
  justify-content: flex-end;
}

.warning {
  color: var(--color-warning-fg);
  background-color: var(--color-warning-bg);
  padding: var(--size-xs);
}

</style>

{#if duration}
  {#if !range.start}
  <tr>
    <td>
      <span class="duration">
        <i class="warning">warning</i>
      </span>
    </td>
    <td>
      Empty interval!
    </td>

    <td class="options">
      <div class="buttons">
        <button on:click={() => confirm('Are you sure?') && $removeDuration(duration.id)}>
          <i>delete</i>
        </button>
      </div>
    </td>
  </tr>
  {:else}
  <tr>
    <td>
      {#if hours < 0 || ($durationsOpen.length > 1 && !range.end)}
        <i class="warning">warning</i>
      {/if}
      <span class="duration">{toPrettyDuration(hours)}</span>
      {#if !range.end}
        <i class="timer">timer</i>
      {/if}
    </td>
    <td>
      <span class="range">{range.start}–{#if range.end}{range.end}{:else}<strong class="timer">now</strong>{/if}</span>
    </td>

    <td class="options">
      {#if editable}
      <div class="buttons">
        <button on:click={() => edit = true}>
          <i>edit</i>
        </button><button on:click={() => confirm('Are you sure?') && $removeDuration(duration.id)}>
          <i>delete</i>
        </button>
      </div>
      {/if}
    </td>
  </tr>
  {/if}
{/if}

{#if edit}
<tr>
  <td colspan="3">
    <form on:submit|preventDefault={handleSubmit}>
      <p>
        <label>Start<br/>
          <input bind:value={startDate} on:change={()=>taskId && (endDate=startDate)} type="date" required />
          <input bind:value={startTime} on:change={()=>taskId && (endTime=startTime)} type="time" required />
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
          <button type="reset" on:click={() => handleDone()}>Cancel</button>
        {/if}
      </div>
    </form>
  </td>
</tr>
{/if}
