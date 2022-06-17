<script lang="ts">
  import CircularProgress from "@smui/circular-progress/src/CircularProgress.svelte";
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import Select, { Option } from "@smui/select";
  import { format, isBefore } from "date-fns";

  import { getDateFromUnixTimestamp } from "../../helpers/resolutions";
  import { bigIntToNum } from "../../helpers/tokens";
  import { signerAddress } from "../../state/eth";
  import type { Offer } from "../../types";
  import Alert from "../Alert.svelte";
  import ResolutionUser from "../ResolutionUser.svelte";

  export let offers: Offer[];
  export let title: string;
  export let loaded: boolean;
  export let noOffersTitle: string;
  export let displayUserInfo = true;

  let filters: Record<
    string,
    { label: string; offers: Offer[]; total: number }
  > = {};

  let currentFilter = "allNonExpired";

  const filterSelf = (offer: Offer) =>
    offer.from.toLowerCase() === $signerAddress.toLowerCase();
  const filterOthers = (offer: Offer) =>
    offer.from.toLowerCase() !== $signerAddress.toLowerCase();
  const filterExpired = (offer: Offer) =>
    Number(offer.expirationTimestamp) * 1000 <= Date.now();
  const filterNonExpired = (offer: Offer) =>
    Number(offer.expirationTimestamp) * 1000 > Date.now();

  $: {
    // todo move the following into some function
    if (loaded && offers.length > 0) {
      const allExpired = [...offers.filter(filterExpired)];
      const allNonExpired = [...offers.filter(filterNonExpired)];

      const selfOffers = [...offers.filter(filterSelf)];
      const selfExpiredOffers = [...selfOffers.filter(filterExpired)];
      const selfNonExpiredOffers = [...selfOffers.filter(filterNonExpired)];

      const othersOffers = [...offers.filter(filterOthers)];
      const othersExpiredOffers = [...othersOffers.filter(filterExpired)];
      const othersNonExpiredOffers = [...othersOffers.filter(filterNonExpired)];

      filters = {
        ...(selfOffers.length > 0 && {
          allExpired: {
            label: "All expired offers",
            offers: allExpired,
            total: allExpired.length,
          },
        }),
        ...(selfOffers.length > 0 && {
          allNonExpired: {
            label: "All active offers",
            offers: allNonExpired,
            total: allNonExpired.length,
          },
        }),
        ...(selfOffers.length > 0 && {
          selfAll: {
            label: "Your offers",
            offers: selfOffers,
            total: selfOffers.length,
          },
        }),
        ...(selfExpiredOffers.length > 0 && {
          selfExpired: {
            label: "Your expired offers",
            offers: selfExpiredOffers,
            total: selfExpiredOffers.length,
          },
        }),
        ...(selfNonExpiredOffers.length > 0 && {
          selfNonExpired: {
            label: "Your active offers",
            offers: selfNonExpiredOffers,
            total: selfNonExpiredOffers.length,
          },
        }),
        ...(othersOffers.length > 0 && {
          othersAll: {
            label: "Others offers",
            offers: othersOffers,
            total: othersOffers.length,
          },
        }),
        ...(othersExpiredOffers.length > 0 && {
          othersExpired: {
            label: "Others expired offers",
            offers: othersExpiredOffers,
            total: othersExpiredOffers.length,
          },
        }),
        ...(othersNonExpiredOffers.length > 0 && {
          othersNonExpired: {
            label: "Others active offers",
            offers: othersNonExpiredOffers,
            total: othersNonExpiredOffers.length,
          },
        }),
      };
    }
  }
</script>

<div class="offers-list">
  <div class="header">
    <h3>{title}</h3>
    {#if loaded && offers.length > 0 && Object.keys(filters).length > 0}
      <div class="push-right">
        <Select bind:value={currentFilter} label="Filter" style="width: 200px;">
          <Option value={"all"}>All offers ({offers.length})</Option>
          {#each Object.keys(filters) as option}
            <Option value={option}>
              {filters[option].label} ({filters[option].total})
            </Option>
          {/each}
        </Select>
      </div>
    {/if}
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
        {#each filters[currentFilter]?.offers || offers as offer}
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
                <ResolutionUser
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

  .push-right {
    margin-left: auto;
  }
</style>
