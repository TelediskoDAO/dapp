<script lang="ts">
  import CircularProgress from "@smui/circular-progress/src/CircularProgress.svelte";
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import { format, isBefore } from "date-fns";

  import { getDateFromUnixTimestamp } from "../../helpers/resolutions";
  import { bigIntToNum } from "../../helpers/tokens";
  import type { Offer } from "../../types";
  import Alert from "../Alert.svelte";
  import ResolutionUser from "../ResolutionUser.svelte";

  export let offers: Offer[];
  export let title: string;
  export let loaded: boolean;
  export let noOffersTitle: string;
  export let displayUserInfo = true;
</script>

<div class="offers-list">
  <h3>{title}</h3>
  {#if !loaded}
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
  {/if}
  {#if loaded && offers.length === 0}
    <Alert type="info">
      {noOffersTitle}
    </Alert>
  {:else if loaded}
    <DataTable table$aria-label="Offers list">
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
        {#each offers as offer}
          <Row>
            {#if displayUserInfo}
              <Cell width="60%">
                <ResolutionUser
                  size="sm"
                  ethereumAddress={offer.from}
                  shortAddressWhileLoading
                />
              </Cell>
            {/if}
            <Cell width="20%">
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
</style>
