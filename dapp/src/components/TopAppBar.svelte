<script>
  import { authenticate, provider, address, addressShort } from "../state/eth";
  import { user } from "src/state/odoo";
</script>

<style>

li {
  display: flex;
  align-items: center;
}

img {
  width: var(--size-m);
  display: block;
  margin-right: var(--size-xs);
}

</style>

<nav>
  <ul>
    <li>
      <a href="#">Teledisko DAO</a>
    </li>

    <li>
      {#if $user}
        <img src="data:image/jpeg;base64,{$user.image}" />
        {$user.name}
      {:else}
        <a href="#/connect/odoo">
          Login
        </a>
      {/if}
    </li>

    <!--li class="float-right">
      {#if $provider}
        <a on:click={authenticate}>
          {$addressShort}
        </a>
      {:else}
        <a on:click={authenticate}>
          Login
        </a>
      {/if}
    </li-->
  </ul>
</nav>
