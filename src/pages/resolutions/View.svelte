<script lang="ts">
  import { onMount } from "svelte";
  import CircularProgress from "@smui/circular-progress";

  import ResolutionView from "../../components/ResolutionView.svelte";
  import { getResolutionQuery } from "../../graphql/get-resolution.query";
  import { graphQLClient } from "../../net/graphQl";
  import type { ResolutionEntity, ResolutionEntityEnhanced } from "../../types";
  import { getEnhancedResolutionMapper } from "../../helpers/resolutions";
  import { acl, currentTimestamp } from "../../state/resolutions";
  import CurrentTimestamp from "../../components/CurrentTimestamp.svelte";

  type Params = {
    resolutionId: string;
  };

  export let params: Params = {
    resolutionId: "",
  };

  let resolutionData: ResolutionEntity;
  let resolutionDataEnhanced: ResolutionEntityEnhanced;

  onMount(async () => {
    const {
      resolution,
    }: {
      resolution: ResolutionEntity;
    } = await graphQLClient.request(getResolutionQuery, {
      id: params.resolutionId,
    });
    resolutionData = resolution;
  });

  $: {
    if (resolutionData && $acl) {
      resolutionDataEnhanced = getEnhancedResolutionMapper(
        $currentTimestamp,
        $acl
      )(resolutionData);
    }
  }
</script>

<section>
  {#if !resolutionDataEnhanced}
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
  {:else}
    <CurrentTimestamp />
    <ResolutionView resolution={resolutionDataEnhanced} />
  {/if}
</section>
