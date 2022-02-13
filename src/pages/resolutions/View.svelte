<script lang="ts">
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import CircularProgress from "@smui/circular-progress";

  import ResolutionView from "../../components/ResolutionView.svelte";
  import { getResolutionQuery } from "../../graphql/get-resolution.query";
  import { graphQLClient } from "../../net/graphQl";
  import { get } from "../../net/ipfs";
  import { RESOLUTION_TYPES } from "../../state/resolutions/new";

  type Params = {
    resolutionId: string;
  };

  export let params: Params = {
    resolutionId: "",
  };

  let resolutionData;

  onMount(async () => {
    const { resolutionMockTest } = await graphQLClient.request(
      getResolutionQuery,
      { id: params.resolutionId }
    );
    resolutionData = await get(resolutionMockTest.ipfsDataURI);
  });
</script>

{#if !resolutionData}
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
{:else}
  <ResolutionView
    title={resolutionData.title}
    content={resolutionData.content}
    type={RESOLUTION_TYPES[resolutionData.type]}
    state={resolutionData.state}
  />
{/if}
