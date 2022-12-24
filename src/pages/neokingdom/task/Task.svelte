<script>
  import Button, { Icon, Label } from "@smui/button";
  import Menu from "@smui/menu";
  import List, { Item, Graphic, Text } from "@smui/list";

  import { slide } from "svelte/transition";
  import {
    tasks,
    currentTask,
    currentDuration,
    currentHoursTotal,
    hoursByTask,
    startDuration,
    stopDuration,
    markAsDone,
  } from "../../../state/neokingdom/odoo";
  import { toPrettyDuration } from "../../../utils";
  import Durations from "./Durations.svelte";

  export let task;
  export let stages = ["todo"];
  export let openDetails = false;

  let createTimeEntry = false;
  let working = false;
  let menu;

  $: subtasks = task.subtaskIds.map((id) => $tasks[id]).filter((task) => task);
  $: tracking = $currentTask && $currentTask.id === task.id;
  $: currentHoursTotalProxy = tracking
    ? $currentHoursTotal
    : $hoursByTask[task.id];

  async function handleStart() {
    working = true;
    if ($currentTask === undefined) {
      await $startDuration(task.id);
    } else {
      const message = `You are tracking "${$currentTask.name}", wanna switch to "${task.name}" instead?`;
      if (confirm(message)) {
        await $stopDuration($currentDuration.id);
        await $startDuration(task.id);
      }
    }
    working = false;
  }

  async function handleStop() {
    working = true;
    await $stopDuration($currentDuration.id);
    working = false;
  }

  async function handleMarkAsDone() {
    const message = "Mark the task as done?";
    if (confirm(message)) {
      if (tracking) {
        await $stopDuration($currentDuration.id);
      }
      await $markAsDone(task.id);
    }
  }
</script>

<!--{task.id}, {task.name}, {task.lastUpdate}, {Array.from(task.stages).toString()}-->

{#if stages.some((s) => task.stages.has(s))}
  <div
    id="task:{task.id}"
    class="task task--stage-{task.stage}"
    class:tracking
    class:hasSubtasks={task.hasSubtasks}
    class:isSubtask={task.isSubtask}
    class:isParentTask={task.isParentTask}
    class:isSingleTask={task.isSingleTask}
  >
    <div class="header">
      <h3>
        {task.name}
      </h3>

      {#if !task.hasSubtasks}
        <button
          class="details"
          on:click={() => {
            openDetails = !openDetails;
          }}
        >
          {#if openDetails}
            <i>unfold_less</i>
          {:else}
            <i>unfold_more</i>
          {/if}
        </button>

        {#if task.stage !== "approved"}
          {#if task.stage === "todo"}
            {#if tracking}
              <button class="stop" disabled={working} on:click={handleStop}>
                <i>stop</i>
              </button>
            {:else}
              <button class="start" disabled={working} on:click={handleStart}>
                <i>play_arrow</i>
              </button>
            {/if}
          {:else}
            <button class="done" disabled={true}>
              <i>done</i>
            </button>
          {/if}
        {/if}
      {/if}
    </div>

    <div class="body" class:isSubtask={task.isSubtask}>
      {#if task.hasSubtasks}
        <ul>
          {#each subtasks as subtask}
            <li>
              <svelte:self task={subtask} {stages} />
            </li>
          {/each}
        </ul>
      {:else if openDetails}
        <!--h4>Description</h4>
        <div>
          {@html task.description}
        </div-->

        <div transition:slide={{ duration: 200 }}>
          <p>
            <strong>Total time:</strong>
            {toPrettyDuration(currentHoursTotalProxy)}.
            {#if task.tier}
              <strong>Tier:</strong> {task.tier}
            {/if}
          </p>

          <div class="menu">
            {#if task.stage !== "approved"}
              <Button
                variant="outlined"
                on:click={handleMarkAsDone}
                disabled={!task.hasDurations}
              >
                <Icon class="material-icons">done</Icon>
                <Label>Mark as done</Label>
              </Button>
            {/if}
            <div>
              <Button variant="outlined" on:click={() => menu.setOpen(true)}>
                <Graphic class="material-icons" style="margin-right: 0"
                  >settings</Graphic
                >
              </Button>
              <Menu anchorCorner="TOP_LEFT" bind:this={menu}>
                <List>
                  {#if task.stage === "done"}
                    <Item disabled={working} on:SMUI:action={handleStart}>
                      <Graphic class="material-icons">play_arrow</Graphic>
                      <Text>Track time</Text>
                    </Item>
                  {/if}
                  <Item
                    on:SMUI:action={() => {
                      window.open(
                        `https://odoo.neokingdom.org/web#model=project.task&id=${task.id}&view_type=form`,
                        "_blank"
                      );
                    }}
                  >
                    <Graphic class="material-icons">open_in_new</Graphic>
                    <Text>Open in odoo</Text>
                  </Item>

                  {#if task.stage !== "approved"}
                    <Item on:SMUI:action={() => (createTimeEntry = true)}>
                      <Graphic class="material-icons">more_time</Graphic>
                      <Text>New time entry</Text>
                    </Item>
                  {/if}
                </List>
              </Menu>
            </div>
          </div>

          <Durations
            taskId={task.id}
            editable={task.stage !== "approved"}
            durationIds={task.durations}
            {createTimeEntry}
            onCreateTimeEntryDone={() => (createTimeEntry = false)}
          />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  button.done {
    background-color: var(--color-green);
  }

  button.done,
  button.start,
  button.stop {
    border-radius: 100%;
  }

  .task {
    background: #ffffff;
    transition: all 1s;
  }
  .task.hasSubtasks {
    padding: 0;
  }

  .tracking .stop {
    background-color: var(--color-blue);
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    flex-grow: 1;
    font-weight: normal;
  }

  .isSingleTask {
    margin-bottom: var(--size-s);
  }

  .isParentTask {
    margin-bottom: var(--size-m);
  }

  .isParentTask > .header h3 {
    font-weight: bold;
  }

  .header {
    display: flex;
    align-items: center;
  }

  .body {
    padding: 0;
  }

  .hasSubtasks .header {
    margin-bottom: var(--size-s);
  }

  .isSubtask .header {
    padding: 0;
  }
  .isSubtask p {
    margin: 0;
  }

  .header .start,
  .header .stop,
  .header .done {
    order: -1;
    margin-right: var(--size-s);
    display: block;
  }
  .header .details {
    border: none;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .menu {
    margin-top: var(--size-s);
    display: flex;
    gap: 5px;
  }

  i {
    vertical-align: bottom;
  }
</style>
