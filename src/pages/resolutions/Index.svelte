<script lang="ts">
  import Chip, { Text } from "@smui/chips";
  import Card, { Content, Actions } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import CircularProgress from "@smui/circular-progress";

  import { title } from "../../state/runtime";
  import { onMount } from "svelte";
  import { graphQLClient } from "../../net/graphQl";
  import { getResolutionsQuery } from "../../graphql/get-resolutions.query";

  import { resolutionContractTypes } from "../../state/eth";
  import type { ResolutionEntityEnhanced } from "../../types";
  import {
    getEnhancedResolutions,
    getResolutionState,
    RESOLUTION_STATES,
  } from "../../helpers/resolutions";

  let resolutions: ResolutionEntityEnhanced[];

  onMount(async () => {
    const {
      resolutions: resolutionsData,
    }: { resolutions: ResolutionEntityEnhanced[] } =
      await graphQLClient.request(getResolutionsQuery);
    resolutions = resolutionsData;
  });

  $: {
    if ($resolutionContractTypes && resolutions) {
      resolutions = getEnhancedResolutions(
        resolutions,
        $resolutionContractTypes
      );
    }
  }

  title.set("Resolutions");
</script>

<section>
  <div class="header">
    <h1>Resolutions</h1>
    <Button variant="raised" href="#/resolutions/new">
      <Label>Create resolution</Label>
    </Button>
  </div>
  {#if !resolutions || !$resolutionContractTypes}
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
  {/if}
  {#if resolutions?.length > 0 && $resolutionContractTypes}
    <LayoutGrid>
      {#each resolutions as resolution}
        <Cell span={4}>
          <Card>
            <Content
              >{resolution.title || "No title..."}
              <Chip chip><Text>{getResolutionState(resolution)}</Text></Chip>
              <Chip chip><Text>{resolution.typeName}</Text></Chip>
            </Content>
            <Actions>
              <Button variant="raised" href={resolution.href}>
                <Label
                  >{resolution.state === RESOLUTION_STATES.PRE_DRAFT
                    ? "Edit"
                    : "View"}</Label
                >
              </Button>
            </Actions>
          </Card>
        </Cell>
      {/each}
    </LayoutGrid>
  {/if}
</section>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
