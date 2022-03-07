<script type="ts">
  import Chip, { Text } from "@smui/chips";

  import { RESOLUTION_STATES } from "../helpers/resolutions";

  import type { ResolutionEntityEnhanced } from "../types";

  export let resolution: ResolutionEntityEnhanced;
</script>

<div>
  {resolution.title || "No title..."}
  <Chip chip><Text>{resolution.state}</Text></Chip>
  <Chip chip><Text>{resolution.resolutionType.name}</Text></Chip>
  <div>Created: {resolution.createdAt}</div>
  {#if resolution.updatedAt && resolution.state !== RESOLUTION_STATES.ENDED}
    <div>Updated: {resolution.updatedAt}</div>
  {/if}
  {#if resolution.approvedAt && resolution.state !== RESOLUTION_STATES.ENDED}
    <div>Approved: {resolution.approvedAt}</div>
    <div>
      Voting starts: {resolution.resolutionTypeInfo.noticePeriodEndsAt}
    </div>
    <div>
      Voting ends: {resolution.resolutionTypeInfo.votingEndsAt}
    </div>
  {/if}
  {#if [RESOLUTION_STATES.ENDED, RESOLUTION_STATES.VOTING].includes(resolution.state)}
    <div>
      <div>
        Total voters: {resolution.votingStatus.votersHaveVoted.length} out of {resolution
          .voters.length}
      </div>
      <div>
        Total voters Yes: {resolution.votingStatus.votersHaveVotedYes.length}
      </div>
      <div>
        Total voters No: {resolution.votingStatus.votersHaveVotedNo.length}
      </div>
      <ul>
        {#each resolution.voters.filter((v) => v.hasVoted) as resolutionVoter}
          <li>
            Voter {resolutionVoter.address} has voted {resolutionVoter.hasVotedYes
              ? "Yes"
              : "No"} with voting power {resolutionVoter.votingPower}
          </li>
        {/each}
      </ul>
      <p>Quorum: {resolution.hasQuorum ? "Yes" : "No"}</p>
    </div>
  {/if}
  {#if resolution.state === RESOLUTION_STATES.ENDED}
    <div>
      Resolution closed on: {resolution.resolutionTypeInfo.votingEndsAt}
    </div>
  {/if}
</div>
