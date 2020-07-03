<script>
  import { authenticate, provider, address, addressShort } from "../state/eth";

  const title = "Home";
</script>

<style>

</style>

<nav>
  <ul>
    <li>
      <a href="#">Teledisko DAO</a>
    </li>
    <li class="float-right">
      {#if $provider}
        <a on:click={authenticate}>
          {$addressShort}
        </a>
      {:else}
        <a on:click={authenticate}>
          Login
        </a>
      {/if}
    </li>
  </ul>
</nav>
