<script lang="ts">
  import { connect, disconnect, signer } from "../stores/wallet";
</script>

{#if $signer}
  <button on:click={disconnect}>Disconnect wallet</button>
{:else}
  <button on:click={connect}>Connect wallet</button>
{/if}
