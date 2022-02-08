<script lang="ts">
  import Chip, { Text } from '@smui/chips';
  import Card, {
    Content,
    Actions,
  } from '@smui/card';
  import Button, { Label } from '@smui/button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';

  import { resolutions } from "../../state/resolutions";
  import { RESOLUTION_STATES } from "../../state/resolutions/new";
  import { title } from "../../state/runtime";

  title.set("Resolutions");
</script>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

<section>
  <div class="header">
    <h1>Resolutions</h1>
    <Button variant="raised" href="#/resolutions/new">
      <Label>Create resolution</Label>
    </Button>
  </div>
  {#if $resolutions.length > 0}  
    <LayoutGrid>
      {#each $resolutions as resolution}
        <Cell span={4}>
          <Card>
            <Content>{resolution.title} <Chip chip><Text>{resolution.state}</Text></Chip></Content>
            <Actions>
              <Button variant="raised" href={`#/resolutions/${resolution.resolutionId}`}>
                <Label>{resolution.state === RESOLUTION_STATES.PRE_DRAFT ? 'Edit' : 'View'}</Label>
              </Button>
            </Actions>
          </Card>
        </Cell>
      {/each}
    </LayoutGrid>
  {/if}
</section>