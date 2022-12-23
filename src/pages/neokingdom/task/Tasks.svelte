<script>
  import { parse } from "qs";
  import { afterUpdate } from "svelte";
  import { replace, querystring } from "svelte-spa-router";
  import { tasks, currentTask } from "../../../state/neokingdom/odoo";
  import Task from "./Task.svelte";
  import Foldable from "../../../components/Foldable.svelte";
  import Accordion, { Content, Header, Panel } from "@smui-extra/accordion";
  import IconButton, { Icon } from "@smui/icon-button";

  export let list;
  export let openDetails = false;

  $: sortedList = list.sort((a, b) => a.sequence - b.sequence);
  $: stages = sortedList.reduce((acc, curr) => {
    acc[curr.id] = ["todo"];
    return acc;
  }, {});

  afterUpdate(() => {
    if ($currentTask && scrollToCurrent) {
      const elem = document.getElementById("task:" + $currentTask.id);
      elem &&
        window.setTimeout(
          () =>
            elem.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "center",
            }),
          0
        );
      replace("#/tasks");
    }
  });

  $: scrollToCurrent = "scrollToCurrent" in parse($querystring);

  function toggleDone(id) {
    if (stages[id].includes("done")) {
      stages[id] = ["todo"];
    } else {
      stages[id] = ["todo", "done"];
    }
  }
</script>

{#each sortedList as project}
  <Accordion>
    <Panel>
      <Header>
        {project.name}
        <IconButton slot="icon" toggle>
          <Icon class="material-icons" on>expand_less</Icon>
          <Icon class="material-icons">expand_more</Icon>
        </IconButton>
      </Header>
      <Content>
        <div class="metadata">
          {#if project.stagesCount.done > 0}
            <p>
              <span
                class="toggle"
                on:click|stopPropagation={toggleDone.bind(null, project.id)}
                >{stages[project.id].includes("done") ? "Hide" : "Show"}
                completed tasks</span
              >
            </p>
          {/if}
        </div>
        {#if project.taskIds.length}
          <ul>
            {#each project.taskIds as taskId}
              {#if $tasks[taskId] && $tasks[taskId].isParentTask}
                <li>
                  <Task
                    stages={stages[project.id]}
                    task={$tasks[taskId]}
                    {openDetails}
                  />
                </li>
              {/if}
            {/each}
          </ul>
        {:else}
          <p>No tasks.</p>
        {/if}
      </Content>
    </Panel>
  </Accordion>
{/each}

<style>
  ul {
    list-style-type: none;
    margin: 0 0 var(--size-m) 0;
    padding: 0;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: var(--size-s);
    border-bottom: var(--line-size) solid var(--line-color);
  }

  .header h2 {
    font-size: var(--font-l);
    flex: 1;
    margin: 0;
  }

  .header button {
    border: none;
  }

  .header i {
    font-size: 24px;
  }

  .metadata {
    text-align: right;
    font-size: var(--font-s);
    color: var(--color-gray-7);
  }

  .metadata .toggle {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
