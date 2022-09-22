<script lang="ts">
  import Body from "@smui/data-table/src/Body.svelte";
  import Cell from "@smui/data-table/src/Cell.svelte";
  import DataTable from "@smui/data-table/src/DataTable.svelte";
  import Row from "@smui/data-table/src/Row.svelte";
  import Select, { Option } from "@smui/select";
  import { onMount } from "svelte";
  import ResolutionUser from "../../components/ResolutionUser.svelte";
  import Skeleton from "../../components/Skeleton.svelte";
  import Tag from "../../components/Tag.svelte";
  import { getDaoManagerQuery } from "../../graphql/get-dao-manager.query";
  import { graphQLClient } from "../../net/graphQl";
  import { title } from "../../state/runtime";
  import type { DaoManagerEntity } from "../../types";

  title.set("Shareholders");

  let daoManager: DaoManagerEntity = null;
  let shareholders: string[] = [];

  let currentFilter = "all";
  let possibleFilters = {};

  onMount(async () => {
    ({ daoManager } = await graphQLClient.request(getDaoManagerQuery));
    shareholders = [
      ...new Set([
        ...daoManager.contributorsAddresses,
        ...daoManager.shareholdersAddresses,
        ...daoManager.investorsAddresses,
        ...daoManager.managingBoardAddresses,
      ]),
    ];

    possibleFilters = {
      ...(daoManager.managingBoardAddresses.length > 0 && {
        managingBoardAddresses: {
          count: daoManager.managingBoardAddresses.length,
          label: "Managing Board",
        },
      }),
      ...(daoManager.shareholdersAddresses.length > 0 && {
        shareholdersAddresses: {
          count: daoManager.shareholdersAddresses.length,
          label: "Shareholders",
        },
      }),
      ...(daoManager.investorsAddresses.length > 0 && {
        investorsAddresses: {
          count: daoManager.investorsAddresses.length,
          label: "Investors",
        },
      }),
      ...(daoManager.contributorsAddresses.length > 0 && {
        contributorsAddresses: {
          count: daoManager.contributorsAddresses.length,
          label: "Contributors",
        },
      }),
    };
  });

  function getShareholderStatus(address: string) {
    return [
      daoManager?.managingBoardAddresses.includes(address) && "ManagingBoard",
      daoManager?.shareholdersAddresses.includes(address) && "Shareholder",
      daoManager?.contributorsAddresses.includes(address) && "Contributor",
      daoManager?.investorsAddresses.includes(address) && "Investor",
    ].filter(Boolean);
  }
</script>

<section>
  <div class="header">
    {#if Object.keys(possibleFilters).length > 1}
      <div class="push-right">
        <Select bind:value={currentFilter} label="Filter by status">
          <Option value={"all"}>all</Option>
          {#each Object.keys(possibleFilters) as possibleFilter}
            <Option value={possibleFilter}>
              {possibleFilters[possibleFilter].label} ({possibleFilters[
                possibleFilter
              ].count})</Option
            >
          {/each}
        </Select>
      </div>
    {/if}
  </div>
  {#if shareholders.length === 0}
    <Skeleton height={300} style="margin-top: 72px">
      <rect width="100%" height="67" x="0" y="0" rx="6px" ry="6px" />
      <rect width="100%" height="67" x="0" y="69" rx="6px" ry="6px" />
      <rect width="100%" height="67" x="0" y="138" rx="6px" ry="6px" />
    </Skeleton>
  {:else}
    <DataTable table$aria-label="List of DAO shareholders" style="width: 100%;">
      <Body>
        {#each shareholders.filter((shareholderAddress) => currentFilter === "all" || daoManager[currentFilter].includes(shareholderAddress)) as shareholder}
          <Row>
            <Cell>
              <div class="shareholder-info">
                <ResolutionUser ethereumAddress={shareholder} size="sm" />
              </div>
            </Cell>
            <Cell>
              <div class="tags-container">
                {#each getShareholderStatus(shareholder) as status}
                  <Tag label={status} size="sm" />
                {/each}
              </div>
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  {/if}
</section>

<style>
  .shareholder-info {
    padding: 1rem 0;
  }
  .header {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
  }
  .push-right {
    margin-left: auto;
  }
  .tags-container {
    display: flex;
    justify-content: flex-end;
  }
  .tags-container :global(.tag) {
    margin-right: 0.2rem;
  }
</style>
