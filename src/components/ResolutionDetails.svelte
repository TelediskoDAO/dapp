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
  {#if resolution.state === RESOLUTION_STATES.ENDED}
    <div>
      Resolution closed on: {resolution.resolutionTypeInfo.votingEnds}
    </div>
  {/if}
</div>
