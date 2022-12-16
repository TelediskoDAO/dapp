<script>
  import { connect, signer } from "../../../stores/wallet";
</script>

<section>
  <h2>Connect Ethereum Wallet</h2>
  {#if $signer}
    <p>Your wallet is connected.</p>
  {:else}
    <button on:click={connect}>Connect</button>
  {/if}
</section>
