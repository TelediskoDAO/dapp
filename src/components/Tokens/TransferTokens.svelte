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

  let transferAmount = 0;
  let toAddress = "";
  export let maxToTransfer = 0;

  async function onTransfer() {
    await handleTransfer(transferAmount, toAddress, {
      $signer,
      $tokenContract,
    });
    toAddress = "";
  }
</script>

<Title id="offer-tokens-title">Transfer tokens</Title>
<Content id="offer-tokens-content">
  {#if maxToTransfer <= 0}
    <Alert type="warning">
      <p>You don't have any tokens available to transfer</p>
    </Alert>
  {/if}
  {#if maxToTransfer > 0}
    <Textfield bind:value={toAddress} label="Address" type="text" />
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
  {#if maxToTransfer > 0}
    <div class="actions">
      <Button
        on:click={onTransfer}
        disabled={transferAmount === 0 ||
          transferAmount > maxToTransfer ||
          toAddress.trim() === "" ||
          $transferState.loading ||
          $transferState.awaitingConfirmation}
      >
        <Label>Submit transfer</Label>
      </Button>
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
