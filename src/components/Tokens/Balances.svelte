<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Alert from "../Alert.svelte";

  export let total: number;
  export let onTransferClicked = () => {};
  export let onOfferClicked = () => {};
</script>

<div class="balances">
  <div class="balance-box balance-box--main">
    <h2 class="balance-box__title">Total Balance</h2>
    <div class="balance-box__total"><b>42</b> TT</div>
  </div>
  <div class="balance-box--multiple">
    <div class="balance-box balance-box--secondary">
      <div>
        <h4 class="balance-box__title">Vesting</h4>
        <div class="balance-box__total"><b>42</b> TT</div>
      </div>
    </div>
    <div class="balance-box balance-box--secondary">
      <div>
        <h4 class="balance-box__title">Tradable</h4>
        <div class="balance-box__total"><b>42</b> TT</div>
      </div>
      <Button variant="outlined" on:click={onTransferClicked} style="flex: 1">
        <Label>Transfer tokens</Label>
      </Button>
    </div>
    <div class="balance-box balance-box--secondary">
      <div>
        <h4 class="balance-box__title">Locked</h4>
        <div class="balance-box__total"><b>42</b> TT</div>
      </div>
      <Button variant="outlined" on:click={onOfferClicked} style="flex: 1">
        <Label>Offer tokens</Label>
      </Button>
    </div>
  </div>
  <div style="width: 100%; margin-top: 2rem">
    <Alert type="info">
      <p>
        You can offer max 12 tokens (Your locked amount minus your active
        offers)
      </p>
    </Alert>
  </div>
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
    text-align: center;
    border-right: 1px solid var(--color-gray-1);
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
    padding-left: 4rem;
    max-width: 70%;
  }
</style>
