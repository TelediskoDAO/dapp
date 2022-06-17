<script type="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { location } from "svelte-spa-router";
  import Button from "@smui/button";
  import DataTable, { Body, Head, Row, Cell } from "@smui/data-table";
  import { format } from "date-fns";
  import {
    getDateFromUnixTimestamp,
    RESOLUTION_STATES,
  } from "../helpers/resolutions";
  import VotingWidget from "./VotingWidget.svelte";
  import type { ResolutionEntityEnhanced, ResolutionVoter } from "../types";
  import { acl } from "../state/resolutions";
  import Countdown from "./Countdown.svelte";
  import { signerAddress } from "../state/eth";
  import Alert from "./Alert.svelte";
  import Tag from "./Tag.svelte";
  import VotingBreakdown from "./VotingBreakdown.svelte";
  import ResolutionUser from "./ResolutionUser.svelte";

  export let resolution: ResolutionEntityEnhanced;
  let isPrint = /\/print$/.test($location);
  let signerVoted: ResolutionVoter | null = null;

  onMount(() => {
    if (isPrint) {
      const timeout = setTimeout(() => {
        window.print();
        window.close();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  });

  $: {
    if ($signerAddress) {
      signerVoted = resolution.votingStatus.votersHaveVoted.find(
        (voter) => voter.address === $signerAddress.toLowerCase()
      );
    }
  }

  function handlePrint() {
    window.open(`/#/resolutions/${resolution.id}/print`);
  }
</script>

<div class="view">
  <div class="info">
    <h1>{resolution.title}</h1>
    <ResolutionUser
      ethereumAddress={resolution.createBy}
      title={`Created ${resolution.createdAt} by`}
      hasBg
      hideInfo={isPrint}
    />
    <h3 class="secondary-title">Content of the resolution:</h3>
    <div class="content">
      <SvelteMarkdown source={resolution.content} />
    </div>
    {#if [RESOLUTION_STATES.ENDED, RESOLUTION_STATES.VOTING].includes(resolution.state)}
      <h3 class="secondary-title pagebreak">Voting breakdown:</h3>
      <VotingBreakdown
        totalYes={resolution.votingStatus.votersHaveVotedYes.length}
        totalNo={resolution.votingStatus.votersHaveVotedNo.length}
        voters={`${resolution.votingStatus.votersHaveVoted.length}/${resolution.voters.length}`}
        hasQuorum={resolution.hasQuorum}
        votedVotingPower={resolution.voters.reduce(
          (total, voter) => total + (voter.hasVoted ? voter.votingPower : 0),
          0
        )}
        maxVotingPower={resolution.voters.reduce(
          (total, voter) => total + voter.votingPower,
          0
        )}
      />
      <DataTable
        table$aria-label="Resolutions voters list"
        style="width: 100%;"
      >
        <Head>
          <Row>
            <Cell>Voter</Cell>
            <Cell>Outcome</Cell>
            <Cell numeric>Voting power</Cell>
          </Row>
        </Head>
        <Body>
          {#each resolution.voters as resolutionVoter}
            <Row>
              <Cell width="82%">
                <ResolutionUser
                  ethereumAddress={resolutionVoter.address}
                  size="sm"
                  hideInfo={isPrint}
                >
                  {#if resolutionVoter.delegated !== resolutionVoter.address}
                    <span>
                      delegated
                      <ResolutionUser
                        ethereumAddress={resolutionVoter.delegated}
                        inline
                        size="sm"
                        shortAddressWhileLoading
                      />
                    </span>
                  {/if}
                </ResolutionUser>
              </Cell>
              <Cell>
                {#if resolutionVoter.hasVoted && resolutionVoter.hasVotedYes}
                  <Tag label="Yes" size="sm" />
                {/if}
                {#if resolutionVoter.hasVoted && !resolutionVoter.hasVotedYes}
                  <Tag label="No" size="sm" />
                {/if}
                {#if !resolutionVoter.hasVoted}
                  <span class="not-yet-voted">Not voted</span>
                {/if}
              </Cell>
              <Cell numeric>{resolutionVoter.votingPower}</Cell>
            </Row>
          {/each}
        </Body>
      </DataTable>
    {/if}
    {#if resolution.state === RESOLUTION_STATES.NOTICE}
      <h3 class="secondary-title pagebreak">Possible voters:</h3>
      <DataTable
        table$aria-label="Resolutions possible voters list"
        style="width: 100%;"
      >
        <Head>
          <Row>
            <Cell>Possible Voter</Cell>
            <Cell numeric>Voting power</Cell>
          </Row>
        </Head>
        <Body>
          {#each resolution.voters as resolutionVoter}
            <Row>
              <Cell width="90%">
                <ResolutionUser
                  ethereumAddress={resolutionVoter.address}
                  size="sm"
                  hideInfo={isPrint}
                >
                  {#if resolutionVoter.delegated !== resolutionVoter.address}
                    <span>
                      delegated
                      <ResolutionUser
                        ethereumAddress={resolutionVoter.delegated}
                        inline
                        shortAddressWhileLoading
                      />
                    </span>
                  {/if}
                </ResolutionUser>
              </Cell>
              <Cell numeric>{resolutionVoter.votingPower}</Cell>
            </Row>
          {/each}
        </Body>
      </DataTable>
    {/if}
  </div>
  <div class="extra">
    {#if !isPrint}
      <Button
        variant="outlined"
        style="width: 100%; margin-bottom: 1rem"
        on:click={handlePrint}
      >
        Print
      </Button>
    {/if}
    <div>
      <div class="extra__heading">
        <h4 class="secondary-title">
          {resolution.resolutionType.name}
        </h4>
        <Tag label={resolution.state} />
      </div>
      {#if resolution.state === RESOLUTION_STATES.VOTING}
        <hr />
        {#if $acl.canVote(resolution.voters) && !isPrint}
          <VotingWidget
            resolutionId={resolution.id}
            {signerVoted}
            resolutionVoters={resolution.voters}
          />
        {/if}
        {#if !$acl.canVote(resolution.voters) && !isPrint}
          <Alert message="You're not entitled to vote" type="warning" />
        {/if}
        <div class="voting-countdown">
          <Countdown
            targetDate={resolution.resolutionTypeInfo.votingEnds}
            prefixLabel="Voting ends"
            inline={false}
            disableCountdown={isPrint}
          />
        </div>
      {/if}
      {#if resolution.state === RESOLUTION_STATES.ENDED}
        <hr />
        <Alert
          message={`Resolution has ended on ${format(
            new Date(resolution.resolutionTypeInfo.votingEnds),
            "dd LLL yyyy"
          )}`}
          type={resolution.hasQuorum ? "success" : "info"}
        />
      {/if}
      {#if resolution.state === RESOLUTION_STATES.NOTICE}
        <hr />
        <div class="centered">
          <Alert
            message={`Resolution has been approved on ${format(
              getDateFromUnixTimestamp(resolution.approveTimestamp),
              "dd LLL yyyy"
            )}`}
            type="success"
          />
          <div class="voting-countdown">
            <Countdown
              targetDate={resolution.resolutionTypeInfo.noticePeriodEnds}
              prefixLabel="Voting starts"
              inline={false}
            />
          </div>
        </div>
      {/if}
      {#if resolution.isNegative}
        <Alert
          message="This is a negative resolution"
          type="warning"
          marginTop
        />
      {/if}
    </div>
  </div>
</div>

<style>
  h1 {
    margin: 0;
    padding: 0;
    padding-bottom: 0.5rem;
  }

  .centered {
    text-align: center;
  }

  .voting-countdown {
    text-align: center;
  }
  .voting-countdown :global(.label) {
    color: var(--color-gray-7);
    font-weight: 300;
  }

  .voting-countdown :global(.value) {
    padding-top: 0.2rem;
    font-size: 1.2rem;
    color: var(--color-gray-9);
    font-weight: 300;
  }

  .secondary-title {
    font-weight: 300;
  }

  .content {
    padding: 2rem;
    border-left: 1px solid var(--color-gray-1);
    background-color: #fafafa;
  }

  .extra {
    margin-top: 3rem;
  }

  @media screen and (min-width: 1024px) {
    .view {
      display: flex;
      justify-content: space-between;
    }
    .info {
      width: 70%;
      padding-right: 2em;
    }
    .extra {
      margin-top: 0;
      width: 30%;
    }
    .extra > div {
      position: sticky;
      top: 60px;
      padding: 2em;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }

  .extra__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .extra__heading > h4 {
    margin: 0;
    padding: 0;
  }

  .not-yet-voted {
    color: var(--color-gray-5);
  }
  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }

    :global(.resolution-user__name .tag) {
      display: none;
    }
  }
</style>
