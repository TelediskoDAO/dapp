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
  import { getResolutionState } from "../../state/resolutions/new";

  let resolutions;

  onMount(async () => {
    const { resolutions: resolutionsData } = await graphQLClient.request(
      getResolutionsQuery
    );
    resolutions = resolutionsData;
  });

  title.set("Resolutions");
</script>

<section>
  <div class="header">
    <h1>Resolutions</h1>
    <Button variant="raised" href="#/resolutions/new">
      <Label>Create resolution</Label>
    </Button>
  </div>
  {#if !resolutions}
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
  {/if}
  {#if resolutions?.length > 0}
    <LayoutGrid>
      {#each resolutions as resolution}
        <Cell span={4}>
          <Card>
            <Content
              >{resolution.title}
              <Chip chip><Text>{getResolutionState(resolution)}</Text></Chip
              ></Content
            >
            <Actions>
              <Button
                variant="raised"
                href={`#/resolutions/${resolution.id}${
                  resolution.approvedTimestamp !== "0" ? "/edit" : ""
                }`}
              >
                <Label
                  >{resolution.approvedTimestamp !== "0"
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
