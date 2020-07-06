<script>
  import { tasks, durations, tasksBacklog, hoursByTask, startDuration, stopDuration, removeDuration } from "src/state/odoo";
  export let list;
</script>

<ul>
  {#each list as task}
  <li>
    <p>
      <button on:click={() => $startDuration(task.id)}>Start</button>
      {task.id}: {task.name}</p>
    <p>Total time: {$hoursByTask[task.id]} hours</p>


    {#if task.hasDurations}
    <table>
      {#each task.durations as duration}
      <tr>
        <td>
          {duration}
        </td>
        <td>
          {$durations[duration].start}
        </td>
        <td>
          {$durations[duration].end}
        </td>
        <td>
          {$durations[duration].hours}
        </td>
        <td>
          <button on:click={() => $stopDuration(duration)}>Stop</button>
          <button on:click={() => $removeDuration(duration)}>Remove</button>
        </td>
      </tr>
      {/each}
    </table>
    {/if}

    {#if task.hasSubtasks}
    <ul>
    {#each task.subtaskIds as subtaskId}
      <li>
        <p>{subtaskId}: {$tasks[subtaskId].name}</p>
        <p>Total time: {$hoursByTask[subtaskId]} hours</p>
        {#if $tasks[subtaskId].hasDurations}
        <table>
          {#each $tasks[subtaskId].durations as duration}
          <tr>
            <td>
              {duration}
            </td>
            <td>
              {$durations[duration] && $durations[duration].start}
            </td>
            <td>
              {$durations[duration] && $durations[duration].end}
            </td>
            <td>
              {$durations[duration] && $durations[duration].hours}
            </td>
            <td>
              <button on:click={() => $removeDuration(duration)}>Remove</button>
            </td>
          </tr>
          {/each}
        </table>
        {/if}
      </li>
    {/each}
    </ul>
    {/if}

  </li>
  {/each}
</ul>
