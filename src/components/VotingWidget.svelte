<script type="ts">
  import Button from "@smui/button";
  import Switch from "@smui/switch";
  import CircularProgress from "@smui/circular-progress/src/CircularProgress.svelte";
  import FormField from "@smui/form-field/src/FormField.svelte";
  import { handleVote } from "../handlers/resolutions/vote";
  import { resolutionContract, signer } from "../state/eth";
  import { votingState } from "../state/resolutions/voting";
  import type { ResolutionVoter } from "../types";
  import Alert from "./Alert.svelte";
  import { onMount } from "svelte";

  export let resolutionId: string;
  export let signerVoted: ResolutionVoter | null;

  let votedYes: boolean;
  let votedNo: boolean;

  function handleVoting() {
    handleVote(resolutionId, votedYes, {
      $signer,
      $resolutionContract,
    });
  }

  onMount(() => {
    if (signerVoted?.hasVoted) {
      votedYes = signerVoted.hasVotedYes;
      votedNo = !signerVoted.hasVotedYes;
    }
  });

  function checkedYes() {
    votedYes = true;
    votedNo = false;
  }

  function checkedNo() {
    votedNo = true;
    votedYes = false;
  }
</script>

{#if signerVoted}
  <Alert
    type="info"
    message={`You have already voted ${
      signerVoted.hasVotedYes ? "YES" : "NO"
    }, but if you change your mind you can override your previous vote`}
  />
{/if}
<div class="voting-widget">
  <FormField>
    <Switch
      color="secondary"
      bind:checked={votedYes}
      on:SMUISwitch:change={checkedYes}
    />
    <span slot="label">I want to vote YES</span>
  </FormField>
  <FormField>
    <Switch
      color="secondary"
      bind:checked={votedNo}
      on:SMUISwitch:change={checkedNo}
    />
    <span slot="label">I want to vote NO</span>
  </FormField>
  {#if $votingState.loading || $votingState.awaitingConfirmation}
    <div class="progress">
      {#if $votingState.loading}
        <Alert message="Awaiting wallet confirmation" />
      {/if}
      {#if $votingState.awaitingConfirmation}
        <Alert message="Awaiting for the transaction to be put on a block" />
      {/if}
      <div style="text-align: center">
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      </div>
    </div>
  {/if}
  {#if (votedYes || votedNo) && !$votingState.loading && !$votingState.awaitingConfirmation}
    <Button variant="outlined" on:click={handleVoting} style="width: 100%">
      Submit
    </Button>
  {/if}
</div>
