<script>
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { VOTING } from "../helpers/resolutions";

  function handleVoting(what) {
    console.log(what);
  }
</script>

<div class="resolution-view">
  <h4>Vote</h4>
  <LayoutGrid>
    <Cell span={6}>
      <Button
        variant="raised"
        onClick={() => handleVoting(VOTING.YES)}
        style="width: 100%"
      >
        <Label>Yes</Label>
      </Button>
    </Cell>
    <Cell span={6}>
      <Button
        variant="raised"
        onClick={() => handleVoting(VOTING.NO)}
        style="width: 100%"
      >
        <Label>No</Label>
      </Button>
    </Cell>
  </LayoutGrid>
</div>
