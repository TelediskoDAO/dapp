<script lang="ts">
  import Button from "@smui/button";

  import Dialog from "@smui/dialog";
  import { onMount } from "svelte";
  import Alert from "../../components/Alert.svelte";
  import Balances from "../../components/Tokens/Balances.svelte";
  import OffersList from "../../components/Tokens/OffersList.svelte";
  import OfferTokens from "../../components/Tokens/OfferTokens.svelte";
  import TransferTokens from "../../components/Tokens/TransferTokens.svelte";
  import { getTokensPageData } from "../../graphql/get-tokens-page-data";
  import { computeBalances } from "../../helpers/tokens";
  import { graphQLClient } from "../../net/graphQl";
  import { connect, hasAgent, signer, signerAddress } from "../../state/eth";
  import { title } from "../../state/runtime";
  import type { ComputedBalances, DaoUser, Offer } from "../../types";

  let openTransfer = false;
  let openOffer = false;

  let offers: Offer[] = [];
  let daoUser: DaoUser = null;
  let computedBalances: ComputedBalances = null;

  let loadedOffers: boolean;

  async function fetchAndSetData() {
    if (!$signerAddress) {
      return;
    }
    ({ offers, daoUser } = await graphQLClient.request(getTokensPageData, {
      userId: $signerAddress.toLowerCase(),
    }));
    computedBalances = computeBalances(daoUser, offers);
    loadedOffers = true;
  }

  onMount(async () => {
    await fetchAndSetData();

    const interval = setInterval(fetchAndSetData, 5000);

    return () => clearInterval(interval);
  });

  title.set("My tokens");

  let loginError;

  async function handleConnect() {
    try {
      await connect();
    } catch (e) {
      loginError = e.toString();
    }
  }

  $: {
    if ($signerAddress) {
      fetchAndSetData();
    }
  }
</script>

{#if $signer}
  <section>
    <div class="wrapper">
      <Balances
        {computedBalances}
        onOfferClicked={() => (openOffer = true)}
        onTransferClicked={() => (openTransfer = true)}
      />
      <OffersList
        title="Offers list"
        {offers}
        loaded={loadedOffers}
        noOffersTitle="No offers available"
      />
    </div>
  </section>

  <Dialog
    bind:open={openOffer}
    aria-labelledby="offer-tokens-title"
    aria-describedby="offer-tokens-content"
    surface$style="width: 550px; max-width: calc(100vw - 32px);"
  >
    <OfferTokens
      maxToOffer={computedBalances?.maxToOffer || 0}
      onOffered={() => (openOffer = false)}
    />
  </Dialog>

  <Dialog
    bind:open={openTransfer}
    aria-labelledby="transfer-tokens-title"
    aria-describedby="transfer-tokens-content"
    surface$style="width: 550px; max-width: calc(100vw - 32px);"
  >
    <TransferTokens
      maxToTransfer={computedBalances?.unlocked || 0}
      onTransferred={() => (openTransfer = false)}
    />
  </Dialog>
{:else if $hasAgent}
  <div class="centered">
    <Button variant="outlined" color="primary" on:click={handleConnect}
      >Connect wallet</Button
    >
  </div>
{:else}
  <div class="centered">
    <p>
      No wallet found. Please connect to the DAO using a wallet-enabled browser.
    </p>
  </div>
{/if}
{#if loginError}
  <div class="centered">
    <Alert type="error">
      <p>Login error: {loginError}</p>
    </Alert>
  </div>
{/if}

<style>
  .centered {
    padding: 3rem;
    text-align: center;
  }
</style>
