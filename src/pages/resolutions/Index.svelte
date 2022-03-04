<script lang="ts">
  import Card, { Content, Actions } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import CircularProgress from "@smui/circular-progress";

  import { title } from "../../state/runtime";
  import { onMount } from "svelte";
  import { graphQLClient } from "../../net/graphQl";
  import { getResolutionsQuery } from "../../graphql/get-resolutions.query";

  import type {
    ResolutionEntityEnhanced,
    ResolutionTypeEntity,
  } from "../../types";
  import { getEnhancedResolutions } from "../../helpers/resolutions";
  import { currentTimestamp } from "../../state/resolutions";
  import CurrentTimestamp from "../../components/CurrentTimestamp.svelte";
  import ResolutionDetails from "../../components/ResolutionDetails.svelte";

  let resolutions: ResolutionEntityEnhanced[];
  let resolutionTypes: ResolutionTypeEntity[];
  let loaded = false;

  onMount(async () => {
    const {
      resolutions: resolutionsData,
      resolutionTypes: resolutionTypesData,
    }: {
      resolutions: ResolutionEntityEnhanced[];
      resolutionTypes: ResolutionTypeEntity[];
    } = await graphQLClient.request(getResolutionsQuery);
    resolutions = resolutionsData;
    resolutionTypes = resolutionTypesData;
    loaded = true;
  });

  $: {
    if (resolutionTypes && resolutions) {
      resolutions = getEnhancedResolutions(
        resolutions,
        resolutionTypes,
        $currentTimestamp
      );
    }
  }

  title.set("Resolutions");
</script>

<section>
  <CurrentTimestamp intervalMs={3000} />
  <div class="header">
    <h1>Resolutions</h1>
    <Button variant="raised" href="#/resolutions/new">
      <Label>Create resolution</Label>
    </Button>
  </div>
  {#if !loaded}
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
  {/if}
  {#if resolutions?.length > 0 && resolutionTypes}
    <LayoutGrid>
      {#each resolutions as resolution}
        <Cell span={12}>
          <Card>
            <Content>
              <ResolutionDetails {resolution} />
            </Content>
            <Actions>
              <Button
                variant="raised"
                href={resolution.href}
                disabled={resolution.action.disabled}
              >
                <Label>{resolution.action.label}</Label>
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
