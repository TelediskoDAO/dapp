<script>
  import { connect, signer, hasAgent } from "src/state/eth";

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
  {:else if $hasAgent}
    <button on:click={handleConnect}>Connect</button>
  {:else}
    <p>
      No wallet found. Please connect to the DAO using a wallet-enabled browser.
    </p>
  {/if}
  {#if loginError}Login error: {loginError}{/if}
</section>
