<script>
  import { contributors } from "../state/eth";
</script>

<section>
  <h2>Contributors</h2>
  <ul class="demo-list">
    {#each Object.entries($contributors || {}) as [address, value]}
      <li>
        <p>
          {value.name || address}
          {address}
          {value.balance} TDT
        </p>
      </li>
    {/each}
  </ul>
</section>
