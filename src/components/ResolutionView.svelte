<script type="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { location } from "svelte-spa-router";
  import { RESOLUTION_STATES } from "../helpers/resolutions";
  import VotingWidget from "./VotingWidget.svelte";
  import type { ResolutionEntityEnhanced } from "../types";
  import { acl } from "../state/resolutions";
  import ResolutionStateTag from "./ResolutionStateTag.svelte";

  export let resolution: ResolutionEntityEnhanced;
  let isPrint: boolean;

  onMount(() => {
    isPrint = /\/print$/.test($location);
    if (isPrint) {
      window.print();
      window.close();
    }
  });
</script>

<div class="resolution-view">
  <div class="resolution-info">
    <h1>{resolution.title}</h1>
    <small>Created on {resolution.createdAt} by {resolution.createBy}</small>
    <SvelteMarkdown source={resolution.content} />
    <hr />
    <div>Voting breakdown</div>
  </div>
  <div class="resolution-extra">
    <div>
      {resolution.resolutionType.name}
      <ResolutionStateTag label={resolution.state} />
    </div>
    {#if [RESOLUTION_STATES.ENDED, RESOLUTION_STATES.VOTING].includes(resolution.state)}
      <div>
        Total voters: {resolution.votingStatus.votersHaveVoted.length} out of {resolution
          .voters.length}
      </div>
      <div>Voted yes: {resolution.votingStatus.votersHaveVotedYes.length}</div>
      <div>Voted no: {resolution.votingStatus.votersHaveVotedNo.length}</div>
      <div>Quorum: {resolution.hasQuorum ? "Reached" : "Not Reached"}</div>
    {/if}
    {#if resolution.isNegative}
      <hr />
      <small><em>Note: this is a <b>negative resolution</b></em></small>
    {/if}
  </div>

  {#if !isPrint && resolution.state === RESOLUTION_STATES.VOTING && $acl.canVote(resolution.voters)}
    <div class="voting">
      <VotingWidget resolutionId={resolution.id} />
    </div>
  {/if}
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
  .resolution-view {
    display: flex;
    justify-content: space-between;
  }

  .resolution-info {
    width: 70%;
    padding-right: 2em;
  }
  .resolution-extra {
    width: 30%;
    padding: 2em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .voting {
    width: 30%;
  }
</style>
