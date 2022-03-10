<script type="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { location } from "svelte-spa-router";
  import { RESOLUTION_STATES } from "../helpers/resolutions";
  import VotingWidget from "./VotingWidget.svelte";
  import type { ResolutionEntityEnhanced, ResolutionVoter } from "../types";
  import { acl } from "../state/resolutions";
  import ResolutionStateTag from "./ResolutionStateTag.svelte";
  import Countdown from "./Countdown.svelte";
  import { signerAddress } from "../state/eth";

  export let resolution: ResolutionEntityEnhanced;
  let isPrint: boolean;
  let signerVoted: ResolutionVoter | null = null;

  onMount(() => {
    isPrint = /\/print$/.test($location);
    if (isPrint) {
      window.print();
      window.close();
    }
  });

  $: {
    if ($signerAddress) {
      signerVoted = resolution.votingStatus.votersHaveVoted.find(
        (voter) => voter.address === $signerAddress
      );
    }
  }
</script>

<div class="view">
  <div class="info">
    <h1>{resolution.title}</h1>
    <small>Created on {resolution.createdAt} by {resolution.createBy}</small>
    <h3 class="secondary-title">Content of the resolution:</h3>
    <div class="content">
      <SvelteMarkdown source={resolution.content} />
    </div>
    {#if [RESOLUTION_STATES.ENDED, RESOLUTION_STATES.VOTING].includes(resolution.state)}
      <h3 class="secondary-title">Voting breakdown</h3>
    {/if}
  </div>
  <div class="extra">
    <div>
      <div class="extra__heading">
        <h4 class="secondary-title">
          {resolution.resolutionType.name}
        </h4>
        <ResolutionStateTag label={resolution.state} />
      </div>
      {#if RESOLUTION_STATES.PRE_DRAFT !== resolution.state}
        <hr />
      {/if}
      {#if RESOLUTION_STATES.VOTING !== resolution.state && !isPrint && $acl.canVote(resolution.voters)}
        <div class="voting">
          <VotingWidget resolutionId={resolution.id} />
        </div>
      {/if}
      {#if RESOLUTION_STATES.ENDED === resolution.state}
        <div>
          Total voters: {resolution.votingStatus.votersHaveVoted.length} out of {resolution
            .voters.length}
        </div>
        <div>
          Voted yes: {resolution.votingStatus.votersHaveVotedYes.length}
        </div>
        <div>Voted no: {resolution.votingStatus.votersHaveVotedNo.length}</div>
        <div>Quorum: {resolution.hasQuorum ? "Reached" : "Not Reached"}</div>
      {/if}
      {#if RESOLUTION_STATES.NOTICE === resolution.state}
        <div class="centered">
          <p>Resolution has been approved.</p>
          <div class="voting-starts">
            <Countdown
              targetDate={resolution.resolutionTypeInfo.noticePeriodEnds}
              prefixLabel="Voting starts"
              inline={false}
            />
          </div>
        </div>
      {/if}
      {#if resolution.isNegative}
        <hr />
        <small><em>Note: this is a <b>negative resolution</b></em></small>
      {/if}
    </div>
  </div>
</div>

<style>
  h1 {
    margin: 0;
    padding: 0;
    padding-bottom: 0.5rem;
  }
  h1 + small {
    display: block;
    margin-bottom: 2rem;
    color: var(--color-gray-7);
  }
  .centered {
    text-align: center;
  }

  .voting-starts :global(.label) {
    color: var(--color-gray-7);
    font-weight: 300;
  }

  .voting-starts :global(.value) {
    padding-top: 0.2rem;
    font-size: 1.2rem;
    color: var(--color-gray-9);
    font-weight: 300;
  }

  .secondary-title {
    font-weight: 300;
  }

  .content {
    padding: 2rem;
    border-left: 1px solid var(--color-gray-1);
    background-color: #fafafa;
  }
  .view {
    display: flex;
    justify-content: space-between;
  }

  .info {
    width: 70%;
    padding-right: 2em;
  }
  .extra {
    width: 30%;
  }
  .extra > div {
    padding: 2em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .extra__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .extra__heading > h4 {
    margin: 0;
    padding: 0;
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
</style>
