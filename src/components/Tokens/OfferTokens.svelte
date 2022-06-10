<script lang="ts">
  import Button, { Label } from "@smui/button";
  import { Content, Title } from "@smui/dialog";
  import FormField from "@smui/form-field";
  import Slider from "@smui/slider";
  import CircularProgress from "@smui/circular-progress";

  import Alert from "../Alert.svelte";
  import { handleOffer } from "../../handlers/tokens/offer";
  import { signer, tokenContract } from "../../state/eth";
  import { offerState } from "../../state/tokens/offer";
  import Textfield from "@smui/textfield";

  let offer = 0;
  export let maxToOffer = 0;
  export let onOffered: () => void;

  async function onOffer() {
    const successful = await handleOffer(offer, {
      $signer,
      $tokenContract,
    });
    if (successful) {
      onOffered();
      offer = 0;
    }
  }
</script>

<Title id="offer-tokens-title">Offer tokens</Title>
<Content id="offer-tokens-content">
  <Alert type={maxToOffer > 0 ? "info" : "warning"}>
    {#if maxToOffer > 0}
      <p>
        You can offer max <b>{maxToOffer}</b>TT (Your locked amount minus your
        active offers tokens)
      </p>
    {:else}
      <p>You don't have any tokens available to offer</p>
    {/if}
  </Alert>
  {#if maxToOffer > 0}
    <FormField align="end" style="display: flex;">
      <Slider
        style="flex-grow: 1;"
        bind:value={offer}
        max={maxToOffer}
        disabled={$offerState.loading || $offerState.awaitingConfirmation}
      />
      <Textfield
        bind:value={offer}
        label="Tokens"
        type="number"
        max={maxToOffer}
      />
    </FormField>
    <div class="actions">
      <Button
        on:click={onOffer}
        disabled={offer === 0 ||
          offer > maxToOffer ||
          $offerState.loading ||
          $offerState.awaitingConfirmation}
      >
        <Label>Submit offer</Label>
      </Button>
    </div>
  {/if}
  {#if $offerState.loading || $offerState.awaitingConfirmation}
    <div class="progress">
      {#if $offerState.awaitingConfirmation}
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
