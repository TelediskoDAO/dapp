<script>
  import { removeDuration, updateDuration, createDuration } from "src/state/odoo";
  import { clock } from "src/state/clock";
  import { toPrettyDuration, toPrettyRange } from "./utils";

  export let handleDone = null;
  export let taskId = null;
  export let duration = null;

  let edit;
  let start;
  let end;
  let action;

  $: hours = duration && (duration.end === false ? ($clock - duration.start) / (60 * 60 * 1000) : duration.hours);
  $: range = duration && toPrettyRange(duration.start, duration.end);

  if(duration) {
    edit = false;
    start = duration.start.toISOString().slice(0, 16);
    end = duration.end ? duration.end.toISOString().slice(0, 16) : "";
  } else if (taskId) {
    edit = true;
    start = "";
    end = "";
  } else {
    throw new Error("Set a duration or a taskId");
  }

  function handleSubmit() {
    // If there is no `duration`, we create a new duration connected to `taskId`

    if (duration) {
      $updateDuration(duration.id, start, end);
      edit = false;
    } else if (taskId) {
      $createDuration(taskId, start, end);
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

<tr>
{#if edit}
  <td colspan="3">
    <form on:submit|preventDefault={handleSubmit}>
      <p>
        <label>Start<br/>
          <input bind:value={start} type="datetime-local" required />
        </label>
      </p>
      <p>
        <label>End<br/>
          <input
            bind:value={end}
            type="datetime-local"
            min={start}
            required
          />
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
{:else}
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

    <!--select on:change={handleSelect} bind:value={action}>
      <option selected>Action</option>
      <option>Edit</option>
      <option>Delete</option>
    </select>
  </td-->
{/if}
</tr>
