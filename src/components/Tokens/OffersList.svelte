<script lang="ts">
  import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
  import { format } from "date-fns";

  import { getDateFromUnixTimestamp } from "../../helpers/resolutions";
  import { bigIntToNum } from "../../helpers/tokens";
  import type { Offer } from "../../types";
  import Alert from "../Alert.svelte";

  export let offers: Offer[];
  export let title: string;
  export let loaded: boolean;
  export let noOffersTitle: string;
</script>

<div class="offers-list">
  <h3>{title}</h3>
  {#if loaded && offers.length === 0}
    <Alert type="info">
      {noOffersTitle}
    </Alert>
  {:else}
    <DataTable table$aria-label="Offers list">
      <Head>
        <Row>
          <Cell numeric>Amount</Cell>
          <Cell>Expiration</Cell>
        </Row>
      </Head>
      <Body>
        {#each offers as offer}
          <Row>
            <Cell width="20%">
              {bigIntToNum(offer.amount)}
            </Cell>
            <Cell>
              {format(
                getDateFromUnixTimestamp(offer.expirationTimestamp),
                "dd LLL yyyy HH:mm"
              )}
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
