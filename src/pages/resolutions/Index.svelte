<script lang="ts">
  import Button, { Label } from "@smui/button";
  import DataTable, { Body, Cell, Row } from "@smui/data-table";
  import IconButton, { Icon } from "@smui/icon-button";
  import { Svg } from "@smui/common";
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import { onMount } from "svelte";
  import FormField from "@smui/form-field";
  import Checkbox from "@smui/checkbox";
  import Select, { Option } from "@smui/select";

  import { title } from "../../state/runtime";
  import { graphQLClient } from "../../net/graphQl";
  import { getResolutionsQuery } from "../../graphql/get-resolutions.query";

  import type { ResolutionEntityEnhanced, ResolutionState } from "../../types";
  import {
    getEnhancedResolutions,
    RESOLUTION_STATES,
  } from "../../helpers/resolutions";
  import { acl, currentTimestamp } from "../../state/resolutions";
  import CurrentTimestamp from "../../components/CurrentTimestamp.svelte";
  import Skeleton from "../../components/Skeleton.svelte";
  import Countdown from "../../components/Countdown.svelte";
  import Tag from "../../components/Tag.svelte";
  import Alert from "../../components/Alert.svelte";
  import DaoUser from "../../components/DaoUser.svelte";
  import Delegation from "../../components/Delegation.svelte";

  import { connect, signer } from "../../stores/wallet";

  let resolutions: ResolutionEntityEnhanced[] = [];
  let ready = false;
  let empty = false;
  let shouldShowIncludeRejected = false;
  let includeRejected = false;
  let stateFilter: ResolutionState | "all" = "all";
  let possibleFilters: Record<string, number> = { all: 0 };
  let loginError: string | undefined;

  async function fetchAndSetResolutions() {
    const {
      resolutions: resolutionsData,
    }: {
      resolutions: ResolutionEntityEnhanced[];
    } = await graphQLClient.request(getResolutionsQuery);
    resolutions = resolutionsData;
    empty = resolutions.length === 0;
    if (empty) {
      ready = true;
    }
  }

  onMount(async () => {
    await fetchAndSetResolutions();

    const interval = setInterval(fetchAndSetResolutions, 5000);

    return () => clearInterval(interval);
  });

  $: {
    if (resolutions.length > 0 && $currentTimestamp && $acl) {
      resolutions = getEnhancedResolutions(
        resolutions,
        $currentTimestamp,
        $acl
      );
      possibleFilters = resolutions.reduce((filters, resolution) => {
        const filterKey = resolution.state;
        if (
          includeRejected ||
          (!includeRejected && filterKey !== RESOLUTION_STATES.REJECTED)
        ) {
          filters[filterKey] = filters[filterKey] + 1 || 1;
        }
        return filters;
      }, {});
      shouldShowIncludeRejected = !!resolutions.find(
        (res) => res.state === RESOLUTION_STATES.REJECTED
      );
      ready = true;
    }
  }

  $: {
    if (typeof includeRejected === "boolean") {
      stateFilter = "all";
    }
  }

  function goToResolutionDetails(e: CustomEvent) {
    const target = e.target as HTMLElement;
    target?.closest(".mdc-data-table__row")?.querySelector("a")?.click();
  }

  async function handleConnect() {
    try {
      await connect();
    } catch (err: any) {
      loginError = err.toString();
    }
  }

  title.set("Resolutions");
</script>

<section>
  <CurrentTimestamp intervalMs={3000} />
  {#if loginError}
    <div class="centered alert">
      <Alert type="error">
        <p>Error: {loginError}</p>
      </Alert>
    </div>
  {/if}
  <div class="header">
    {#if !$signer}
      <Button variant="outlined" color="primary" on:click={handleConnect}>
        <Label>Connect Wallet</Label>
      </Button>
    {/if}
    {#if !empty && ready && $acl?.canCreate}
      <Button variant="outlined" href="#/resolutions/new">
        <Label>Create resolution</Label>
      </Button>
      <div class="delegation">
        <Delegation />
      </div>
    {/if}
    {#if ready && Object.keys(possibleFilters).length > 1}
      <div class="push-right">
        <Select bind:value={stateFilter} label="Filter by state">
          <Option value={"all"}>all</Option>
          {#each Object.keys(possibleFilters) as resolutionState}
            <Option value={resolutionState}>
              {resolutionState} ({possibleFilters[resolutionState]})</Option
            >
          {/each}
        </Select>
      </div>
    {/if}
  </div>
  {#if !ready}
    <Skeleton height={300} style="margin-top: 42px">
      <rect width="100%" height="67" x="0" y="0" rx="6px" ry="6px" />
      <rect width="100%" height="67" x="0" y="69" rx="6px" ry="6px" />
      <rect width="100%" height="67" x="0" y="138" rx="6px" ry="6px" />
    </Skeleton>
  {/if}
  {#if ready && !empty}
    <DataTable table$aria-label="Resolutions list" style="width: 100%;">
      <Body>
        {#each resolutions.filter((res) => (stateFilter === "all" || res.state === stateFilter) && (includeRejected || (!includeRejected && res.state !== RESOLUTION_STATES.REJECTED))) as resolution}
          <Row style="cursor: pointer" on:click={goToResolutionDetails}>
            <Cell width="80%">
              <div class="resolution-info">
                <h4 class="resolution-title">{resolution.title}</h4>
                {#if resolution.state === RESOLUTION_STATES.PRE_DRAFT}
                  <small class="resolution-detail-sm"
                    ><span>Created</span>
                    {resolution.createdAt} <b>by</b>
                    <DaoUser ethereumAddress={resolution.createBy} inline />
                  </small>
                {/if}
                {#if resolution.state === RESOLUTION_STATES.NOTICE}
                  <small class="resolution-detail-sm"
                    ><Countdown
                      targetDate={resolution.resolutionTypeInfo
                        .noticePeriodEnds}
                      prefixLabel="Voting starts"
                    /></small
                  >
                {/if}
                {#if resolution.state === RESOLUTION_STATES.VOTING}
                  <small class="resolution-detail-sm"
                    ><Countdown
                      targetDate={resolution.resolutionTypeInfo.votingEnds}
                      prefixLabel="Voting ends"
                    /></small
                  >
                {/if}
                {#if resolution.state === RESOLUTION_STATES.ENDED}
                  <small class="resolution-detail-sm"
                    ><span
                      >{resolution.hasQuorum
                        ? "Has reached quorum"
                        : "Has not reached quorum"}</span
                    >
                    and has ended on
                    {resolution.resolutionTypeInfo.votingEndsAt}
                  </small>
                {/if}
                {#if resolution.state === RESOLUTION_STATES.REJECTED}
                  <small class="resolution-detail-sm"
                    ><span>Rejected</span>
                    {resolution.rejectedAt} <b>by</b>
                    <DaoUser ethereumAddress={resolution.rejectBy} inline />
                  </small>
                {/if}
              </div>
            </Cell>
            <Cell
              ><span class="resolution-type"
                ><small
                  >{resolution.resolutionType.name}
                  {resolution.isNegative ? " (veto)" : ""}</small
                ></span
              ></Cell
            >
            <Cell><Tag label={resolution.state} /></Cell>
            <Cell>
              <Wrapper>
                <IconButton
                  class="material-icons"
                  size="button"
                  href={resolution.href}
                >
                  <Icon component={Svg} viewBox="0 0 24 24">
                    <path fill="#777" d={resolution.action.icon} />
                  </Icon>
                </IconButton>
                <Tooltip yPos="above">{resolution.action.label}</Tooltip>
              </Wrapper>
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
    {#if shouldShowIncludeRejected && Object.keys(possibleFilters).length > 0}
      <div class="include-rejected">
        <FormField align="end">
          <Checkbox bind:checked={includeRejected} />
          <span slot="label">Show rejected resolutions</span>
        </FormField>
      </div>
    {/if}
  {/if}
  {#if ready && empty}
    <Alert message="No resolutions created so far" />
    {#if $acl?.canCreate}
      <Button variant="outlined" href="#/resolutions/new">
        <Label>Create resolution</Label>
      </Button>
    {/if}
  {/if}
</section>

<style>
  .resolution-info {
    padding: 1rem 0;
  }
  .resolution-title {
    margin: 0;
    padding: 0;
  }
  .resolution-type {
    color: var(--color-gray-7);
  }
  .resolution-detail-sm {
    display: block;
    color: var(--color-gray-7);
    line-height: 15px;
  }

  .resolution-detail-sm > span {
    font-weight: bold;
  }

  .header {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
  }

  .alert {
    margin-bottom: 10px;
  }

  .push-right {
    margin-left: auto;
  }

  .delegation {
    margin-left: 1rem;
  }

  .include-rejected {
    text-align: right;
  }
</style>
