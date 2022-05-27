<script lang="ts">
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import { BigNumber } from "ethers";
  import { formatEther, parseEther } from "ethers/lib/utils";
  import { onMount } from "svelte";
  import { getTokensPageData } from "../../graphql/get-tokens-page-data";
  import { computeBalances } from "../../helpers/tokens";
  import { graphQLClient } from "../../net/graphQl";
  import { signerAddress, tokenContract } from "../../state/eth";
  import { title } from "../../state/runtime";
  import type { ComputedBalances, DaoUser, Offer } from "../../types";

  let openTransfer = false;
  let openOffer = false;

  let offers: Offer[] = [];
  let daoUser: DaoUser = null;
  let computedBalances: ComputedBalances = null;

  let noOffers: boolean;

  async function fetchAndSetData() {
    if (!$signerAddress) {
      return;
    }
    ({ offers, daoUser } = await graphQLClient.request(getTokensPageData, {
      userId: $signerAddress.toLowerCase(),
    }));
    computedBalances = computeBalances(daoUser, offers);
    noOffers = offers.length === 0;
  }

  onMount(async () => {
    await fetchAndSetData();

    const interval = setInterval(fetchAndSetData, 5000);

    return () => clearInterval(interval);
  });

  async function onTransfer() {
    // wip (just for testing)
    const tx = await $tokenContract.createOffer(parseEther("3"));
    await tx.wait();
    window.location.reload();
  }

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
      {#if computedBalances}
        <span>{computedBalances.total}</span>
      {:else}
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      {/if}
    </div>

    <div>
      <h2>Vesting</h2>
      {#if computedBalances}
        <span>{computedBalances.vesting}</span>
      {:else}
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      {/if}
    </div>
    <div>
      <h2>Tradable</h2>
      {#if computedBalances}
        <span>{computedBalances.unlocked}</span>
        <Button variant="outlined" on:click={() => (openTransfer = true)}>
          <Label>Transfer tokens</Label>
        </Button>
      {:else}
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      {/if}
    </div>
    <div>
      <h2>Locked</h2>
      {#if computedBalances}
        <span
          >{computedBalances.locked} ({computedBalances.currentlyOffered} offered)</span
        >
        <Button variant="outlined" on:click={() => (openOffer = true)}>
          <Label>Offer tokens</Label>
        </Button>
      {:else}
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      {/if}
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
  <Content id="offer-tokens-content">
    <input type="number" />
    <Button on:click={onTransfer}>
      <Label>Submit</Label>
    </Button>
  </Content>
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
