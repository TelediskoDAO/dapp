<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import { onMount } from "svelte";
  import { getTokensPageData } from "../../graphql/get-tokens-page-data";
  import { graphQLClient } from "../../net/graphQl";
  import { signerAddress } from "../../state/eth";
  import { title } from "../../state/runtime";
  import type { DaoUser, Offer } from "../../types";

  let openTransfer = false;
  let openOffer = false;

  let offers: Offer[] = [];
  let daoUser: DaoUser = null;

  let noOffers: boolean;

  async function fetchAndSetData() {
    if (!$signerAddress) {
      return;
    }
    ({ offers, daoUser } = await graphQLClient.request(getTokensPageData, {
      userId: $signerAddress.toLowerCase(),
    }));
    noOffers = offers.length === 0;
  }

  onMount(async () => {
    await fetchAndSetData();

    const interval = setInterval(fetchAndSetData, 5000);

    return () => clearInterval(interval);
  });

  title.set("My tokens");

  $: {
    if ($signerAddress) {
      fetchAndSetData();
    }
  }
</script>

<section>
  <div class="wrapper">
    <div>
      <h2>Total balance</h2>
      <span>{daoUser?.totalBalance}</span>
    </div>

    <div>
      <h2>Vesting</h2>
      <span>{daoUser?.vestingBalance}</span>
    </div>
    <div>
      <h2>Tradable</h2>
      <span>{daoUser?.unlockedTempBalance}</span>
      <Button variant="outlined" on:click={() => (openTransfer = true)}>
        <Label>Transfer tokens</Label>
      </Button>
    </div>
    <div>
      <h2>Locked</h2>
      <span>{daoUser?.totalBalance - daoUser?.unlockedTempBalance}</span>
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
