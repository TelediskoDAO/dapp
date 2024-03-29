<script lang="ts">
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import Alert from "../Alert.svelte";

  import type { ComputedBalances } from "../../types";

  export let computedBalances: ComputedBalances;
  export let onTransferClicked = () => {};
  export let onOfferClicked = () => {};
</script>

<div class="balances">
  <div class="balance-box balance-box--main">
    <h2 class="balance-box__title">Total Balance</h2>
    {#if computedBalances}
      <div class="balance-box__total"><b>{computedBalances.total}</b> TT</div>
    {:else}
      <CircularProgress style="height: 32px; width: 32px;" indeterminate />
    {/if}
  </div>
  <div class="balance-box--multiple">
    <div class="balance-box balance-box--secondary">
      <div>
        <h4 class="balance-box__title">Tradable</h4>
        {#if computedBalances}
          <div class="balance-box__total">
            <b>{computedBalances.unlocked}</b> TT
          </div>
        {:else}
          <CircularProgress style="height: 32px; width: 32px;" indeterminate />
        {/if}
      </div>
      <Button
        variant="outlined"
        on:click={onTransferClicked}
        style="flex: 1"
        disabled={!computedBalances}
      >
        <Label>Transfer tokens</Label>
      </Button>
    </div>
    <div class="balance-box balance-box--secondary">
      <div>
        <h4 class="balance-box__title">Locked</h4>
        {#if computedBalances}
          <div class="balance-box__total">
            <b>{computedBalances.locked}</b> TT
          </div>
        {:else}
          <CircularProgress style="height: 32px; width: 32px;" indeterminate />
        {/if}
      </div>
      <Button
        variant="outlined"
        on:click={onOfferClicked}
        style="flex: 1"
        disabled={!computedBalances}
      >
        <Label>Offer tokens</Label>
      </Button>
    </div>
    <div class="balance-box balance-box--secondary">
      <div>
        <h4 class="balance-box__title">Vesting</h4>
        {#if computedBalances}
          <div class="balance-box__total">
            <b>{computedBalances.vesting}</b> TT
          </div>
        {:else}
          <CircularProgress style="height: 32px; width: 32px;" indeterminate />
        {/if}
      </div>
    </div>
  </div>
  {#if computedBalances?.currentlyOffered > 0 && computedBalances?.maxToOffer > 0}
    <div style="width: 100%; margin-top: 2rem">
      <Alert type="info">
        <p>
          <b>Heads up</b>: you're currently offering
          <b>{computedBalances?.currentlyOffered}</b>TT. You can then offer max
          <b>{computedBalances?.maxToOffer}</b>TT (Your locked amount minus your
          active offers tokens)
        </p>
      </Alert>
    </div>
  {/if}
</div>

<style>
  .balances {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 2rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    border-radius: 2px;
    background-color: #fafafa;
  }

  .balance-box__title {
    color: var(--color-gray-9);
  }

  .balance-box--main {
    flex-grow: 1;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    border-bottom: 1px solid var(--color-gray-1);
  }

  .balance-box--main .balance-box__title {
    font-size: 2rem;
    margin: 0;
    padding: 0;
    padding-bottom: 0.5rem;
  }

  .balance-box--main .balance-box__total b {
    font-size: 3rem;
  }

  .balance-box--secondary {
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .balance-box--secondary > div {
    text-align: center;
    padding-right: 2rem;
    width: 170px;
  }

  .balance-box--secondary:not(:first-child):not(:last-child) {
    border-top: 1px solid var(--color-gray-1);
    border-bottom: 1px solid var(--color-gray-1);
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .balance-box--secondary .balance-box__title {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    padding-bottom: 0.3rem;
  }

  .balance-box--secondary .balance-box__total b {
    font-size: 2rem;
  }

  .balance-box--multiple {
    width: 100%;
  }

  @media screen and (min-width: 1024px) {
    .balance-box--main {
      padding-bottom: 0;
      margin-bottom: 0;
      border-right: 1px solid var(--color-gray-1);
      border-bottom: none;
    }

    .balance-box--multiple {
      max-width: 70%;
      padding-left: 4rem;
    }
  }
</style>
