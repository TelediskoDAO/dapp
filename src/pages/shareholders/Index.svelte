<script lang="ts">
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import { Icon } from "@smui/common";
  import { Svg } from "@smui/common/elements";
  import { mdiInformationOutline } from "@mdi/js";
  import Body from "@smui/data-table/src/Body.svelte";
  import Cell from "@smui/data-table/src/Cell.svelte";
  import DataTable from "@smui/data-table/src/DataTable.svelte";
  import Head from "@smui/data-table/src/Head.svelte";
  import Row from "@smui/data-table/src/Row.svelte";
  import Select, { Option } from "@smui/select";
  import { onMount } from "svelte";
  import DaoUser from "../../components/DaoUser.svelte";
  import Skeleton from "../../components/Skeleton.svelte";
  import Tag from "../../components/Tag.svelte";
  import { getShareholdersInfo } from "../../graphql/get-shareholders-info.query";
  import { bigIntToNum } from "../../helpers/tokens";
  import { graphQLClient } from "../../net/graphQl";
  import { title } from "../../state/runtime";
  import type { DaoManagerEntity, DaoUser as DaoUserType } from "../../types";

  title.set("Shareholders");

  let daoManager: DaoManagerEntity = null;
  let daoUsers: DaoUserType[] = [];
  let daoUsersComputed = {};
  let daoUsersAddresses: string[] = [];

  let currentFilter = "all";
  let possibleFilters = {};

  function getShareholderStatus(address: string) {
    return [
      daoManager?.managingBoardAddresses.includes(address) && "ManagingBoard",
      daoManager?.shareholdersAddresses.includes(address) && "Shareholder",
      daoManager?.contributorsAddresses.includes(address) && "Contributor",
      daoManager?.investorsAddresses.includes(address) && "Investor",
    ].filter(Boolean);
  }

  onMount(async () => {
    ({ daoManager, daoUsers } = await graphQLClient.request(
      getShareholdersInfo
    ));

    const balancesSum = daoUsers.reduce(
      (sum, daoUser) =>
        getShareholderStatus(daoUser.address).length === 0
          ? sum
          : sum +
            (daoUser?.totalBalance ? bigIntToNum(daoUser.totalBalance) : 0),
      0
    );

    daoUsersComputed = daoUsers.reduce((computed, daoUser) => {
      const balance = Math.round(
        daoUser?.totalBalance ? bigIntToNum(daoUser.totalBalance) : 0
      );
      computed[daoUser.address] = {
        balance,
        power: ((balance * 100) / balancesSum).toFixed(2),
      };
      return computed;
    }, {});

    daoUsersAddresses = Object.keys(daoUsersComputed)
      .filter((address) => getShareholderStatus(address).length > 0)
      .sort(
        (userA, userB) =>
          daoUsersComputed[userB].balance - daoUsersComputed[userA].balance
      );

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
  {#if daoUsersAddresses.length === 0}
    <Skeleton height={300} style="margin-top: 72px">
      <rect width="100%" height="67" x="0" y="0" rx="6px" ry="6px" />
      <rect width="100%" height="67" x="0" y="69" rx="6px" ry="6px" />
      <rect width="100%" height="67" x="0" y="138" rx="6px" ry="6px" />
    </Skeleton>
  {:else}
    <DataTable table$aria-label="List of DAO shareholders" style="width: 100%;">
      <Head>
        <Row>
          <Cell />
          <Cell numeric>Tokens</Cell>
          <Cell numeric>
            <div class="inline-flex">
              <span> Voting power </span>
              <Wrapper>
                <span class="icon-wrapper">
                  <Icon component={Svg} viewBox="0 0 24 24">
                    <path fill="currentColor" d={mdiInformationOutline} />
                  </Icon>
                </span>
                <Tooltip yPos="above"
                  >Due to rounding, the sum could be slightly different than 100</Tooltip
                >
              </Wrapper>
            </div>
          </Cell>
          <Cell numeric>Status</Cell>
        </Row>
      </Head>
      <Body>
        {#each daoUsersAddresses.filter((shareholderAddress) => currentFilter === "all" || daoManager[currentFilter].includes(shareholderAddress)) as daoUserAddress}
          <Row>
            <Cell>
              <div class="shareholder-info">
                <DaoUser ethereumAddress={daoUserAddress} size="sm" />
              </div>
            </Cell>
            <Cell numeric>
              {daoUsersComputed[daoUserAddress].balance.toLocaleString()}
            </Cell>
            <Cell numeric>
              {daoUsersComputed[daoUserAddress].power}
            </Cell>
            <Cell>
              <div class="tags-container">
                {#each getShareholderStatus(daoUserAddress) as status}
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
  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    margin-left: 0.2rem;
    color: var(--blue-sapphire);
    cursor: help;
  }
  .icon-wrapper :global(svg) {
    width: 16px;
    height: 16px;
  }
  .inline-flex {
    display: inline-flex;
    align-items: center;
  }
</style>
