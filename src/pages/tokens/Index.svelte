<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import { title } from "../../state/runtime";

  let openTransfer = false;
  let openOffer = false;

  title.set("My tokens");
</script>

<section>
  <div class="wrapper">
    <div>
      <h2>Total balance</h2>
      <span>105,500</span>
    </div>

    <div>
      <h2>Vesting</h2>
      <span>100,000</span>
    </div>
    <div>
      <h2>Tradable</h2>
      <span>4,500</span>
      <Button variant="outlined" on:click={() => (openTransfer = true)}>
        <Label>Transfer tokens</Label>
      </Button>
    </div>
    <div>
      <h2>Locked</h2>
      <span>1,000</span>
      <Button variant="outlined" on:click={() => (openOffer = true)}>
        <Label>Offer tokens</Label>
      </Button>
    </div>
  </div>
</section>

<Dialog
  bind:open={openOffer}
  aria-labelledby="offer-tokens-title"
  aria-describedby="offer-tokens-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
>
  <Title id="offer-tokens-title">Offer tokens</Title>
  <Content id="offer-tokens-content">content</Content>
  <Actions>
    <Button>
      <Label>Close</Label>
    </Button>
  </Actions>
</Dialog>

<Dialog
  bind:open={openTransfer}
  aria-labelledby="transfer-tokens-title"
  aria-describedby="transfer-tokens-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
>
  <Title id="transfer-tokens-title">Transfer tokens</Title>
  <Content id="transfer-tokens-content">content</Content>
  <Actions>
    <Button>
      <Label>Close</Label>
    </Button>
  </Actions>
</Dialog>
