<script>
  import {tasks, taskById, durationById, durationsByTask, durationTotalsByTask, startDuration, stopDuration, removeDuration } from "src/state/odoo";
</script>

<h1>Tasks</h1>

<ul>
  {#each $tasks.filter(task => !task.isSubtask) as task}
  <li>
    <p><button on:click={() => $startDuration(task.id)}>Start</button> {task.id}: {task.name}</p>
    <p>Total time: {$durationTotalsByTask[task.id]} hours</p>


    {#if task.hasDurations}
    <table>
      {#each task.durations as duration}
      <tr>
        <td>
          {duration}
        </td>
        <td>
          {$durationById[duration] && $durationById[duration].start}
        </td>
        <td>
          {$durationById[duration] && $durationById[duration].end}
        </td>
        <td>
          {$durationById[duration] && $durationById[duration].hours}
        </td>
        <td>
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
        <p>{subtaskId}: {$taskById[subtaskId].name}</p>
        <p>Total time: {$durationTotalsByTask[subtaskId]} hours</p>
        {#if $taskById[subtaskId].hasDurations}
        <table>
          {#each $taskById[subtaskId].durations as duration}
          <tr>
            <td>
              {duration}
            </td>
            <td>
              {$durationById[duration] && $durationById[duration].start}
            </td>
            <td>
              {$durationById[duration] && $durationById[duration].end}
            </td>
            <td>
              {$durationById[duration] && $durationById[duration].hours}
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
