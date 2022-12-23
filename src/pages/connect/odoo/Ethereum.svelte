<script>
  import Button, { Label } from "@smui/button";
  import { connect, signer } from "../../../stores/wallet";
</script>

<section>
  <h2>Your Wallet</h2>
  {#if $signer}
    <p>Your wallet is connected.</p>
  {:else}
    <Button variant="outlined" on:click={connect}>
      <Label>Connect Wallet</Label>
    </Button>
  {/if}
</section>
