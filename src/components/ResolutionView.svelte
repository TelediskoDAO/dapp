<script type="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { location } from "svelte-spa-router";
  import { RESOLUTION_STATES } from "../helpers/resolutions";
  import VotingWidget from "./VotingWidget.svelte";
  import type { ResolutionEntityEnhanced } from "../types";
  import ResolutionDetails from "./ResolutionDetails.svelte";

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
  <ResolutionDetails {resolution} />
  <SvelteMarkdown source={resolution.content} />

  {#if resolution.isNegative}
    <small><em>Negative resolution</em></small>
  {/if}
  {#if !isPrint && resolution.state === RESOLUTION_STATES.VOTING}
    <div class="voting">
      <VotingWidget />
    </div>
  {/if}
</div>

<style>
  .resolution-view {
    padding: 40px;
  }

  .voting {
    width: 30%;
  }
</style>
