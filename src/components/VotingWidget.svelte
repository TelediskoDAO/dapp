<script type="ts">
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress/src/CircularProgress.svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { handleVote } from "../handlers/resolutions/vote";
  import { resolutionContract, signer } from "../state/eth";
  import { votingState } from "../state/resolutions/voting";

  export let resolutionId: string;

  function handleVoting(isYes: boolean) {
    console.log("resolutionId: ", resolutionId);
    console.log("isYes: ", isYes);
    handleVote(resolutionId, isYes, {
      $signer,
      $resolutionContract,
    });
  }
</script>

<div class="resolution-view">
  <h4>Vote</h4>
  <LayoutGrid>
    {#if $votingState.loading || $votingState.awaitingConfirmation}
      <div class="progress">
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      </div>
    {/if}
    <Cell span={6}>
      <Button
        variant="raised"
        on:click={() => handleVoting(true)}
        style="width: 100%"
      >
        <Label>Yes</Label>
      </Button>
    </Cell>
    <Cell span={6}>
      <Button
        variant="raised"
        on:click={() => handleVoting(false)}
        style="width: 100%"
      >
        <Label>No</Label>
      </Button>
    </Cell>
  </LayoutGrid>
</div>

<style>
  .resolution-view {
    position: relative;
  }

  .progress {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(3px);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
