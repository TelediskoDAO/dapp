<script>
  import { removeDuration, updateDuration, createDuration } from "src/state/odoo";
  import { toPrettyDuration, toPrettyRange } from "./utils";

  export let handleDone = null;
  export let taskId = null;
  export let duration = null;

  let edit;
  let start;
  let end;

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

{#if edit}
  <form on:submit|preventDefault={handleSubmit}>
    <table>
      <tr>
          <td>
            <input bind:value={start} type="datetime-local" />
          </td>
          <td>
            <span class="material-icons">
              arrow_forward
            </span>
          </td>
          <td>
            <input
              bind:value={end}
              type="datetime-local"
              min={start}
            />
          </td>
          <td>
            <button type="submit">Save</button>
            {#if duration}
              <button type="reset" on:click={() => edit = false}>Cancel</button>
            {:else}
              <button type="reset" on:click={() => confirm('Are you sure?') && handleDone()}>Cancel</button>
            {/if}
          </td>
      </tr>
    </table>
  </form>
{:else}
  <table>
    <tr>
      <td>
        {toPrettyRange(duration.start, duration.end)}
      </td>
      <td>
        Session
        <strong>{toPrettyDuration(duration.hours)}</strong>
      </td>
      <td>
        <button on:click={() => edit = true}>Edit</button>
        <button on:click={() => confirm('Are you sure?') && $removeDuration(duration.id)}>Remove</button>
      </td>
    </tr>
  </table>
{/if}
