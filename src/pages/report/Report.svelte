<script>
  import { toPrettyDuration, toPrettyCurrency } from "../../utils";
  export let linesByProject;
</script>

<ol>
  {#each linesByProject as project}
    <li>
      <h4>Project: {project.name}</h4>
      <table>
        <tbody>
          {#each project.lines as line}
            <tr>
              <td>
                {line.name}
                <ul class="metadata">
                  <li>{line.tier} tier</li>
                  <li><i>timer</i>{toPrettyDuration(line.hours)}</li>
                </ul>
              </td>
              <td class="value">{toPrettyCurrency(line.value)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </li>
  {/each}
</ol>

<style>
  ol {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  h4 {
    margin-bottom: var(--size-xs);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tbody tr:nth-child(odd) {
    background-color: #f5f5f5;
  }

  td {
    padding: var(--size-xs);
  }

  td.value {
    text-align: right;
    font-weight: bold;
  }

  .metadata {
    padding: 0;
    margin: var(--size-xs) 0 0 0;
  }
  .metadata li {
    display: inline-block;
    padding: var(--size-xxs) var(--size-xs);
    font-size: var(--font-s);
    border-radius: var(--size-xs);
    background-color: var(--color-gray-1);
    color: #333;
  }
  .metadata li i {
    vertical-align: middle;
    margin-right: var(--size-xs);
  }
</style>
