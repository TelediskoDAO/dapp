<script lang="ts">
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import Dialog from "@smui/dialog";
  import { onMount } from "svelte";
  import OffersList from "../../components/Tokens/OffersList.svelte";
  import OfferTokens from "../../components/Tokens/OfferTokens.svelte";
  import TransferTokens from "../../components/Tokens/TransferTokens.svelte";
  import { getTokensPageData } from "../../graphql/get-tokens-page-data";
  import { computeBalances } from "../../helpers/tokens";
  import { graphQLClient } from "../../net/graphQl";
  import { signerAddress } from "../../state/eth";
  import { title } from "../../state/runtime";
  import type { ComputedBalances, DaoUser, Offer } from "../../types";

  let openTransfer = false;
  let openOffer = false;

  let offers: Offer[] = [];
  let otherOffers: Offer[] = [];
  let daoUser: DaoUser = null;
  let computedBalances: ComputedBalances = null;

  let loadedOffers: boolean;
  let loadedOtherOffers: boolean;

  async function fetchAndSetData() {
    if (!$signerAddress) {
      return;
    }
    ({ otherOffers, offers, daoUser } = await graphQLClient.request(
      getTokensPageData,
      {
        userId: $signerAddress.toLowerCase(),
      }
    ));
    computedBalances = computeBalances(daoUser, offers);
    console.log("computedBalances: ", computedBalances);
    loadedOffers = true;
    loadedOtherOffers = true;
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
    <OffersList
      title="Your offers"
      {offers}
      loaded={loadedOffers}
      noOffersTitle="You haven't placed any offers"
    />
    <OffersList
      title="Offers from other users"
      offers={otherOffers}
      loaded={loadedOtherOffers}
      noOffersTitle="No offers from other users"
    />
  </div>
</section>

<Dialog
  bind:open={openOffer}
  aria-labelledby="offer-tokens-title"
  aria-describedby="offer-tokens-content"
  surface$style="width: 550px; max-width: calc(100vw - 32px);"
>
  <OfferTokens maxToOffer={computedBalances?.maxToOffer || 0} />
</Dialog>

<Dialog
  bind:open={openTransfer}
  aria-labelledby="transfer-tokens-title"
  aria-describedby="transfer-tokens-content"
  surface$style="width: 550px; max-width: calc(100vw - 32px);"
>
  <TransferTokens maxToTransfer={computedBalances?.unlocked || 0} />
</Dialog>
