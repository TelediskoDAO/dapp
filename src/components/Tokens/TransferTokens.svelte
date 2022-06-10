<script lang="ts">
  import Button, { Label } from "@smui/button";
  import { Content, Title } from "@smui/dialog";
  import FormField from "@smui/form-field";
  import Slider from "@smui/slider";
  import CircularProgress from "@smui/circular-progress";

  import Alert from "../Alert.svelte";
  import { signer, tokenContract } from "../../state/eth";
  import { transferState } from "../../state/tokens/transfer";
  import Textfield from "@smui/textfield";
  import { handleTransfer } from "../../handlers/tokens/transfer";
  import { isAddress } from "ethers/lib/utils";

  let transferAmount = 0;
  let toAddress = "";
  export let maxToTransfer = 0;
  export let onTransferred: () => void;

  async function onTransfer() {
    const successful = await handleTransfer(transferAmount, toAddress, {
      $signer,
      $tokenContract,
    });
    if (successful) {
      toAddress = "";
      transferAmount = 0;
      onTransferred();
    }
  }
</script>

<Title id="offer-tokens-title">Transfer tokens</Title>
<Content id="offer-tokens-content">
  {#if maxToTransfer <= 0}
    <Alert type="warning">
      <p>You don't have any tokens available to transfer</p>
    </Alert>
  {:else}
    <Textfield
      bind:value={toAddress}
      label="Address"
      type="text"
      style="width: 100%; margin-bottom: 1rem;"
    />
    <FormField align="end" style="display: flex;">
      <Slider
        style="flex-grow: 1;"
        bind:value={transferAmount}
        max={maxToTransfer}
        disabled={$transferState.loading || $transferState.awaitingConfirmation}
      />
      <Textfield
        bind:value={transferAmount}
        label="Tokens"
        type="number"
        max={maxToTransfer}
      />
    </FormField>
    <div class="actions">
      <Button
        on:click={onTransfer}
        disabled={transferAmount === 0 ||
          transferAmount > maxToTransfer ||
          !isAddress(toAddress) ||
          $transferState.loading ||
          $transferState.awaitingConfirmation}
      >
        <Label>Submit transfer</Label>
      </Button>
    </div>
  {/if}
  {#if $transferState.loading || $transferState.awaitingConfirmation}
    <div class="progress">
      {#if $transferState.awaitingConfirmation}
        <Alert message="Awaiting for the transaction to be put on a block" />
      {/if}
      <div style="text-align: center">
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      </div>
    </div>
  {/if}
</Content>

<style>
  :global(input:hover) {
    box-shadow: none;
  }

  .actions {
    padding-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }
</style>
