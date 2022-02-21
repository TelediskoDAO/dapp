<script lang="ts">
  import { onMount } from "svelte";
  import CircularProgress from "@smui/circular-progress";

  import ResolutionView from "../../components/ResolutionView.svelte";
  import { getResolutionQuery } from "../../graphql/get-resolution.query";
  import { graphQLClient } from "../../net/graphQl";
  import { resolutionContractTypes } from "../../state/eth";
  import type { ResolutionEntity } from "../../types";
  import type { ResolutionManager } from "../../../contracts/typechain";
  import { getResolutionState } from "../../helpers/resolutions";

  type Params = {
    resolutionId: string;
  };

  export let params: Params = {
    resolutionId: "",
  };

  let resolutionData: ResolutionEntity;
  let resolutionType: ResolutionManager.ResolutionTypeStructOutput;

  onMount(async () => {
    const { resolution }: { resolution: ResolutionEntity } =
      await graphQLClient.request(getResolutionQuery, {
        id: params.resolutionId,
      });
    resolutionData = resolution;
  });

  $: {
    if ($resolutionContractTypes && resolutionData) {
      resolutionType = $resolutionContractTypes[Number(resolutionData.typeId)];
    }
  }
</script>

{#if !resolutionData || !resolutionType}
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
{:else}
  <ResolutionView
    title={resolutionData.title}
    content={resolutionData.content}
    type={resolutionType.name}
    state={getResolutionState(resolutionData)}
    isNegative={resolutionData.isNegative}
  />
{/if}
