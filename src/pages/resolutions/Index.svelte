<script lang="ts">
  import Chip, { Text } from "@smui/chips";
  import Card, { Content, Actions } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import CircularProgress from "@smui/circular-progress";

  import { title } from "../../state/runtime";
  import { onDestroy, onMount } from "svelte";
  import { graphQLClient } from "../../net/graphQl";
  import { getResolutionsQuery } from "../../graphql/get-resolutions.query";

  import { resolutionContractTypes } from "../../state/eth";
  import type { ResolutionEntityEnhanced } from "../../types";
  import {
    getEnhancedResolutions,
    RESOLUTION_STATES,
  } from "../../helpers/resolutions";
  import { currentTimestamp } from "../../state/resolutions";

  let resolutions: ResolutionEntityEnhanced[];
  let interval = null;

  onMount(async () => {
    const {
      resolutions: resolutionsData,
    }: { resolutions: ResolutionEntityEnhanced[] } =
      await graphQLClient.request(getResolutionsQuery);
    resolutions = resolutionsData;

    interval = setInterval(() => {
      $currentTimestamp = +new Date();
    }, 5000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  $: {
    if ($resolutionContractTypes && resolutions) {
      resolutions = getEnhancedResolutions(
        resolutions,
        $resolutionContractTypes,
        $currentTimestamp
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
        <Cell span={12}>
          <Card>
            <Content
              >{resolution.title || "No title..."}
              <Chip chip><Text>{resolution.state}</Text></Chip>
              <Chip chip><Text>{resolution.typeName}</Text></Chip>
              <div>Created: {resolution.createdAt}</div>
              {#if resolution.updatedAt && resolution.state !== RESOLUTION_STATES.ENDED}
                <div>Updated: {resolution.updatedAt}</div>
              {/if}
              {#if resolution.approvedAt && resolution.state !== RESOLUTION_STATES.ENDED}
                <div>Approved: {resolution.approvedAt}</div>
                <div>
                  Voting starts: {resolution.resolutionTypeInfo
                    .noticePeriodEndsAt}
                </div>
                <div>
                  Voting ends: {resolution.resolutionTypeInfo.votingEndsAt}
                </div>
              {/if}
              {#if resolution.state === RESOLUTION_STATES.ENDED}
                <div>
                  Resolution closed on: {resolution.resolutionTypeInfo
                    .votingEnds}
                </div>
              {/if}
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
