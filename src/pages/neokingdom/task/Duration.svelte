<script>
  // FIXME durationsOpen should not be here.
  import {
    durationsOpen,
    removeDuration,
    updateDuration,
    createDuration,
    currentTask,
    currentDuration,
    stopDuration,
  } from "../../../state/neokingdom/odoo";
  import { clock } from "../../../state/clock";
  import {
    toPrettyDuration,
    toPrettyRange,
    splitDate,
    joinDate,
  } from "../../../utils";
  import { Cell, Row } from "@smui/data-table";
  import IconButton, { Icon } from "@smui/icon-button";
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";

  export let editable = true;
  export let handleDone = null;
  export let taskId = null;
  export let duration = null;
  let description = duration?.description || "";

  let edit = duration ? false : true;

  let startDate, startTime, endDate, endTime, range, hours;
  let keepTracking = !taskId && !(duration && duration.end);

  if (taskId) {
    [startDate, startTime] = splitDate();
    [endDate, endTime] = splitDate();
  }

  $: {
    let currentTime = Math.max($clock, Date.now());
    range = duration && toPrettyRange(duration.start, duration.end);
    hours =
      duration &&
      (duration.end === false
        ? (currentTime - duration.start) / (60 * 60 * 1000)
        : duration.hours);

    if (!edit) {
      [startDate, startTime] = splitDate(duration.start);
      [endDate, endTime] = splitDate(duration.end);
    }
  }

  async function handleSubmit() {
    // If there is no `duration`, we create a new duration connected to `taskId`
    let start = joinDate(startDate, startTime);
    let end = keepTracking ? false : joinDate(endDate, endTime);
    if (
      $currentTask &&
      ($currentTask.id !== duration?.taskId ||
        (taskId && $currentTask.id !== taskId))
    ) {
      //const message = `You are tracking "${$currentTask.name}". `;
      //if (confirm(message)) {
      await $stopDuration($currentDuration.id);
      //}
    }
    if (duration) {
      await $updateDuration(duration.id, start, end, description);
      edit = false;
    } else if (taskId) {
      await $createDuration(taskId, start, end, description);
      handleDone();
    }
  }
</script>

{#if duration}
  {#if !range.start}
    <Row>
      <Cell><span class="duration"> <i class="warning">warning</i> </span></Cell
      >
      <Cell>Empty interval!</Cell>
      <Cell>-</Cell>
      <Cell class="options">
        <div class="buttons">
          <button
            on:click={() =>
              confirm("Are you sure?") && $removeDuration(duration.id)}
          >
            <i>delete</i>
          </button>
        </div>
      </Cell>
    </Row>
  {:else}
    <Row>
      <Cell>
        {#if hours < 0 || ($durationsOpen.length > 1 && !range.end)}
          <i class="warning">warning</i>
        {/if}
        <span class="duration">{toPrettyDuration(hours)}</span>
        {#if !range.end}<i class="timer">timer</i>{/if}
      </Cell>
      <Cell>
        <span class="range"
          >{range.start}–{#if range.end}
            {range.end}
          {:else}<strong class="timer">now</strong>{/if}</span
        >
      </Cell>
      <Cell>
        <p>
          {duration.description}
        </p>
      </Cell>
      <Cell class="options">
        {#if editable}
          <div class="buttons">
            <IconButton on:click={() => (edit = true)} slot="icon">
              <Icon class="material-icons">edit</Icon>
            </IconButton>
            <IconButton
              on:click={() =>
                confirm("Are you sure?") && $removeDuration(duration.id)}
              slot="icon"
            >
              <Icon class="material-icons">delete</Icon>
            </IconButton>
          </div>
        {/if}
      </Cell>
    </Row>
  {/if}
{/if}

{#if edit}
  <Row class="edit">
    <Cell colspan="4">
      <form on:submit|preventDefault={handleSubmit}>
        <p>
          <span>Start</span>
          <input
            bind:value={startDate}
            on:change={() => taskId && (endDate = startDate)}
            type="date"
            required
          />
          <input
            bind:value={startTime}
            on:change={() => taskId && (endTime = startTime)}
            type="time"
            required
          />
        </p>
        {#if !keepTracking}
          <p>
            <span>End</span>
            <input bind:value={endDate} type="date" min={startDate} />
            <input
              bind:value={endTime}
              type="time"
              min={startDate === endDate ? startTime : ""}
            />
          </p>
        {/if}

        {#if duration?.end}
          <p>
            <label
              >Continue tracking the task
              <input bind:checked={keepTracking} type="checkbox" />
            </label>
          </p>
        {/if}

        <Textfield
          label="Entry description"
          bind:value={description}
          style="width: 100%;"
          helperLine$style="width: 100%;"
          input$rows={4}
          textarea
        />

        <div class="buttons">
          <Button type="submit" variant="outlined">Save</Button>
          {#if duration}
            <Button
              variant="outlined"
              type="reset"
              on:click={() => (edit = false)}>Cancel</Button
            >
          {:else}
            <Button variant="outlined" type="reset" on:click={handleDone}
              >Cancel</Button
            >
          {/if}
        </div>
      </form>
    </Cell>
  </Row>
{/if}

<style>
  .duration {
    font-weight: bold;
  }

  .options {
    text-align: right;
  }

  .timer {
    animation: blink 1s infinite;
  }

  .warning {
    color: var(--color-warning-fg);
    background-color: var(--color-warning-bg);
    padding: var(--size-xs);
  }

  .buttons {
    justify-content: flex-end;
  }

  .buttons :global(button:hover) {
    box-shadow: none;
  }

  p {
    max-width: 20rem;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .edit .buttons {
    justify-content: flex-start;
  }

  .edit span {
    font-weight: bold;
    display: block;
  }

  .edit input[type="date"],
  .edit input[type="time"] {
    height: 100%;
    padding: var(--size-xs) var(--size-xs);
  }
</style>
