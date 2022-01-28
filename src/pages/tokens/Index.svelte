<script>
  import { tokenContract, balance, hasAgent, signer } from "../../state/eth";
  import { user } from "../../state/odoo";
  import { title } from "../../state/runtime";
  import {
    toPrettyCurrency,
    fromFloatNumber,
    toFloatNumber,
    toShortAddress,
  } from "../../utils";
  import CONFIG from "../../config";

  title.set("Tokens");

  let floatAmount;

  function setAmount(perc) {
    floatAmount = (toFloatNumber($balance) * perc) / 100;
  }

  async function handleSellSubmit() {
    try {
      await $tokenContract.transfer(
        CONFIG.oracleAddress,
        fromFloatNumber(floatAmount)
      );
    } catch (e) {
      if (e.code !== 4001) {
        throw e;
      }
    }
  }
</script>

<style>
  .balance h2,
  .balance .address {
    font-size: var(--size-s);
    color: gray;
  }

  .balance .value {
    font-size: var(--size-m);
    font-weight: bold;
    margin: 0;
  }

  .perc button {
    color: gray;
    border: none;
    text-decoration: underline;
  }

  .disclaimer {
    background-color: var(--color-warning-bg);
  }
</style>

{#if $balance && $user}
  <div class="disclaimer">
    <section>
      <p>
        <strong>Note:</strong>
        all transactions are sent to the Rinkeby testnet, and no real value is
        attached to the token. More work has to be done to a) make
        TelediskoTaler a real security token with real value; and b) implement
        all the rules specified in the
        <em>Wuschwelt</em>
        document.
      </p>
      <p>
        In the meantime use this space to experiment and learn how to use and
        manage your tokens.
      </p>
    </section>
  </div>
  <section>
    <div class="balance">
      <h2>Current balance</h2>
      <p class="value">{toPrettyCurrency($balance)}</p>
      <p class="address">{toShortAddress($user.address)}</p>
    </div>
  </section>

  <section>
    <h3>Sell tokens</h3>

    {#if $hasAgent && $tokenContract}
      <form on:submit|preventDefault={handleSellSubmit}>
        <label for="sell-token-amount">Amount</label>
        <span class="perc"><button
            type="button"
            on:click={() => setAmount(100)}
          >100%</button>,
          <button type="button" on:click={() => setAmount(75)}>75%</button>,
          <button type="button" on:click={() => setAmount(50)}>50%</button>,
          <button
            type="button"
            on:click={() => setAmount(25)}
          >25%</button></span>
        <input
          id="sell-token-amount"
          autocomplete="off"
          bind:value={floatAmount}
          min="0"
          max={toFloatNumber($balance)}
          required
        />
        <button>Sell</button>
      </form>
    {:else}
      To sell your tokens connect you need to connect with a wallet enabled
      browser.
    {/if}
  </section>
{/if}
