<script>
  import { connect, signer, hasAgent } from "../../../stores/wallet";

  let loginError;

  async function handleConnect() {
    try {
      await connect();
    } catch (e) {
      loginError = e.toString();
    }
  }
</script>

<section>
  <h2>Connect Ethereum Wallet</h2>
  {#if $signer}
    <p>Your wallet is connected.</p>
  {:else}
    <button on:click={handleConnect}>Connect</button>
  {/if}
  {#if loginError}Login error: {loginError}{/if}
</section>
