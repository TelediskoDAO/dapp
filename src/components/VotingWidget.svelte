<script type="ts">
  import Button from "@smui/button";
  import CircularProgress from "@smui/circular-progress/src/CircularProgress.svelte";
  import { handleVote } from "../handlers/resolutions/vote";
  import { resolutionContract, signer, signerAddress } from "../state/eth";
  import { votingState } from "../state/resolutions/voting";
  import type { ResolutionVoter } from "../types";
  import Alert from "./Alert.svelte";
  import ResolutionUser from "./ResolutionUser.svelte";

  export let resolutionId: string;
  export let signerVoted: ResolutionVoter | null;
  export let resolutionVoters: ResolutionVoter[];

  let votedYes: boolean | null = null;
  let originalVote: boolean | null = null;
  let votingOnBehalfOf: ResolutionVoter[] = [];
  let delegatedTo: ResolutionVoter | null = null;

  function handleVoting() {
    handleVote(resolutionId, votedYes, {
      $signer,
      $resolutionContract,
    });
  }

  $: {
    originalVote = signerVoted?.hasVoted ? signerVoted.hasVotedYes : null;
    if ($signerAddress) {
      votingOnBehalfOf = resolutionVoters.filter(
        (user) =>
          user.address !== $signerAddress && user.delegated === $signerAddress
      );
      delegatedTo = resolutionVoters.find(
        (user) =>
          user.address === $signerAddress && user.delegated !== $signerAddress
      );
    }
    if (signerVoted?.hasVoted && votedYes === null) {
      votedYes = signerVoted.hasVotedYes;
    }
  }

  function onVote(isYes: boolean) {
    votedYes = isYes;
  }
</script>

{#if signerVoted}
  <Alert
    type="info"
    message={`You have already voted ${
      signerVoted.hasVotedYes ? "<b>Yes</b>" : "<b>No</b>"
    }, but if you change your mind you can override your previous vote`}
  />
{/if}
<div class="voting-widget">
  {#if votingOnBehalfOf.length > 0}
    <Alert>
      Voting also on behalf of
      {#each votingOnBehalfOf as votingOnBehalfOfUser, index}
        <ResolutionUser inline ethereumAddress={votingOnBehalfOfUser.address} />
        {#if index < votingOnBehalfOf.length}
          ,
        {/if}
      {/each}
    </Alert>
  {/if}
  {#if delegatedTo}
    <Alert>
      You've currently delegated voting to <ResolutionUser
        inline
        ethereumAddress={delegatedTo.delegated}
      />. You can still vote if you want.
    </Alert>
  {/if}
  {#if !signerVoted}
    <p>I want to vote</p>
  {/if}
  <div
    class={`voting-widget__actions ${
      votedYes !== null ? `voted-${votedYes ? "yes" : "no"}` : "not-voted"
    }`}
  >
    <button on:click={() => onVote(true)} class={votedYes ? "selected" : ""}
      >Yes</button
    >
    <button
      on:click={() => onVote(false)}
      class={typeof votedYes === "boolean" && !votedYes ? "selected" : ""}
      >No</button
    >
  </div>

  {#if $votingState.loading || $votingState.awaitingConfirmation}
    <div class="progress">
      {#if $votingState.awaitingConfirmation}
        <Alert message="Awaiting for the transaction to be put on a block" />
      {/if}
      <div style="text-align: center">
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      </div>
    </div>
  {/if}
  {#if typeof votedYes === "boolean" && !$votingState.loading && !$votingState.awaitingConfirmation && originalVote !== votedYes}
    <Button variant="outlined" on:click={handleVoting} style="width: 100%">
      Submit
    </Button>
  {/if}
</div>

<style>
  .voting-widget {
    margin-bottom: 1rem;
  }
  .voting-widget > p {
    color: var(--color-gray-9);
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  .voting-widget__actions {
    position: relative;
    display: flex;
    margin-bottom: 0.5rem;
  }
  .voting-widget__actions > button {
    position: relative;
    z-index: 2;
    width: 50%;
    padding: 1rem 0;
    border: 1px solid var(--color-gray-1);
    color: var(--color-gray-7);
    background-color: transparent;
  }

  .voting-widget__actions > button:active {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  }

  .voting-widget__actions:after {
    content: "";
    position: absolute;
    z-index: 1;
    width: 50%;
    height: 100%;
    transition: background-color 0.3s, transform 0.2s;
  }

  .voting-widget__actions.voted-yes:after {
    background-color: #a5cd97;
    border-radius: 8px 0 0 8px;
  }

  .voting-widget__actions.voted-no:after {
    background-color: #fe7171;
    border-radius: 0 8px 8px 0;
    transform: translate3d(100%, 0, 0);
  }
  .voting-widget__actions > button.selected {
    color: var(--color-white);
    font-weight: bold;
  }
  .voting-widget__actions > button:first-child {
    border-radius: 8px 0 0 8px;
  }

  .voting-widget__actions.not-voted > button:first-child {
    border-right: 1px solid var(--color-gray-1);
  }

  .voting-widget__actions > button:first-child {
    border-right: none;
  }

  .voting-widget__actions > button:last-child {
    border-left: none;
    border-radius: 0 8px 8px 0;
  }
</style>
