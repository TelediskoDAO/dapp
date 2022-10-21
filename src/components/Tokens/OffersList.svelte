<script lang="ts">
  import Checkbox from "@smui/checkbox";
  import CircularProgress from "@smui/circular-progress/src/CircularProgress.svelte";
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import FormField from "@smui/form-field";
  import Select, { Option } from "@smui/select";
  import { format, isBefore } from "date-fns";

  import { getDateFromUnixTimestamp } from "../../helpers/resolutions";
  import { bigIntToNum } from "../../helpers/tokens";
  import type { Offer } from "../../types";
  import Alert from "../Alert.svelte";
  import DaoUser from "../DaoUser.svelte";

  export let offers: Offer[];
  export let title: string;
  export let loaded: boolean;
  export let noOffersTitle: string;
  export let displayUserInfo = true;

  const filterNonExpired = (offer: Offer) =>
    Number(offer.expirationTimestamp) * 1000 > Date.now();

  let includeExpired = false;
  let showIncludeExpired = false;
  let filteredOffers: Offer[] = [];

  $: {
    // todo move the following into some function
    if (loaded && offers.length > 0) {
      const nonExpired = offers.filter(filterNonExpired);
      filteredOffers =
        includeExpired || nonExpired.length === 0 ? offers : nonExpired;
      showIncludeExpired = nonExpired.length > 0;
    }
  }
</script>

<div class="offers-list">
  <div class="header">
    <h3>{title}</h3>
  </div>
  {#if !loaded}
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
  {/if}
  {#if loaded && offers.length === 0}
    <Alert type="info">
      {noOffersTitle}
    </Alert>
  {:else if loaded}
    <DataTable table$aria-label="Offers list" style="width: 100%;">
      <Head>
        <Row>
          {#if displayUserInfo}
            <Cell>From</Cell>
          {/if}
          <Cell numeric>Amount</Cell>
          <Cell>Expiration</Cell>
        </Row>
      </Head>
      <Body>
        {#each filteredOffers as offer}
          <Row
            class={isBefore(
              getDateFromUnixTimestamp(offer.expirationTimestamp),
              new Date()
            )
              ? "expired-offer"
              : ""}
          >
            {#if displayUserInfo}
              <Cell width="60%">
                <DaoUser
                  size="sm"
                  ethereumAddress={offer.from}
                  shortAddressWhileLoading
                />
              </Cell>
            {/if}
            <Cell width="20%" numeric>
              {bigIntToNum(offer.amount)}
            </Cell>
            <Cell>
              {format(
                getDateFromUnixTimestamp(offer.expirationTimestamp),
                "dd LLL yyyy HH:mm"
              )}
              {#if isBefore(getDateFromUnixTimestamp(offer.expirationTimestamp), new Date())}
                (Expired)
              {/if}
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
    {#if showIncludeExpired}
      <div class="include-expired">
        <FormField align="end">
          <Checkbox bind:checked={includeExpired} />
          <span slot="label">Show expired offers</span>
        </FormField>
      </div>
    {/if}
  {/if}
</div>

<style>
  .offers-list {
    padding: 2rem 0;
  }

  .offers-list :global(.expired-offer) {
    opacity: 0.5;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
  }

  .include-expired {
    text-align: right;
  }
</style>
