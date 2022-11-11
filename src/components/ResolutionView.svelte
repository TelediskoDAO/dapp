<script type="ts">
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import Button from "@smui/button";
  import DataTable, { Body, Head, Row, Cell } from "@smui/data-table";
  import { format } from "date-fns";
  import showdown from "showdown";
  import {
    getDateFromUnixTimestamp,
    RESOLUTION_STATES,
  } from "../helpers/resolutions";
  import VotingWidget from "./VotingWidget.svelte";
  import type {
    DaoManagerEntity,
    ResolutionEntityEnhanced,
    ResolutionVoter,
  } from "../types";
  import { acl } from "../state/resolutions";
  import Countdown from "./Countdown.svelte";
  import { signerAddress } from "../stores/wallet";
  import Alert from "./Alert.svelte";
  import Tag from "./Tag.svelte";
  import VotingBreakdown from "./VotingBreakdown.svelte";
  import DaoUser from "./DaoUser.svelte";

  export let resolution: ResolutionEntityEnhanced;
  export let daoManagerData: DaoManagerEntity;
  let isPrint = /\/print$/.test($location);
  let signerVoted: ResolutionVoter | null = null;
  const converter = new showdown.Converter();
  converter.setFlavor("github");

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

  export function getShareholderStatus(address: string) {
    return [
      daoManagerData?.managingBoardAddresses.includes(address) &&
        "ManagingBoard",
      daoManagerData?.shareholdersAddresses.includes(address) && "Shareholder",
      daoManagerData?.contributorsAddresses.includes(address) &&
        !daoManagerData?.managingBoardAddresses.includes(address) &&
        "Contributor",
    ]
      .filter(Boolean)
      .join(", ");
  }
</script>

<div class="view">
  <div class="info">
    <div>
      <div class="info-business">
        <p>
          <b>Business name:</b> teledisko DAO OÜ
        </p>
        <p>
          <b>Registry code:</b> 16374990
        </p>
        <p>
          <b>Registered office:</b> Kaarli pst 1 // Roosikrantsi tn 2, 10119 Tallinn,
          Estonia
        </p>
      </div>
      <hr />
      {#if resolution.state !== RESOLUTION_STATES.ENDED}
        <h4>
          DRAFT RESOLUTION OF THE SHAREHOLDERS<br />
          (without convening a meeting of shareholders)
        </h4>
      {:else}
        <h4>
          MINUTES AND RESOLUTION OF THE SHAREHOLDERS<br />
          (without convening a meeting of shareholders)
        </h4>
      {/if}
      <hr />
      {#if [RESOLUTION_STATES.ENDED, RESOLUTION_STATES.VOTING, RESOLUTION_STATES.NOTICE].includes(resolution.state)}
        <div class="info-dates">
          <p>
            <b>Time of determining the voting rights and active PoAs:</b>
            {format(
              getDateFromUnixTimestamp(resolution.approveTimestamp),
              "dd LLL yyyy, H:mm:ss"
            )}
          </p>
          <p>
            <b>Notification period for voting:</b> From {format(
              getDateFromUnixTimestamp(resolution.approveTimestamp),
              "dd LLL yyyy, H:mm:ss"
            )} to {resolution.resolutionTypeInfo.noticePeriodEndsAt}
          </p>
          <p>
            <b>Voting period:</b> From {resolution.resolutionTypeInfo
              .noticePeriodEndsAt} to {resolution.resolutionTypeInfo
              .votingEndsAt}
          </p>
          <p>
            <b>Place of voting:</b>
            <a href={window.location.href}>{window.location.href}</a>
          </p>
          <p>
            <b>Recording secretary:</b> Benjamin Gregor Uphues
          </p>
        </div>
        <hr />
      {/if}
    </div>
    {#if resolution.state === RESOLUTION_STATES.REJECTED}
      <Alert type="error" message="This resolution has been rejected" />
      <DaoUser
        ethereumAddress={resolution.rejectBy}
        title={`Rejected on ${resolution.rejectedAt} by`}
        hasBg
        hideInfo={isPrint}
      />
      <hr class="has-margin" />
    {/if}
    <DaoUser
      ethereumAddress={resolution.createBy}
      title={`Created on ${resolution.createdAt} by`}
      hasBg
      hideInfo={isPrint}
    />
    <h3 class="secondary-title">Topic of the resolution: {resolution.title}</h3>
    <h3 class="secondary-title pagebreak">Content of the resolution:</h3>
    <div class="content">
      {@html converter.makeHtml(resolution.content)}
    </div>
  </div>
  {#if !isPrint}
    <div class="extra">
      {#if RESOLUTION_STATES.REJECTED !== resolution.state}
        <Button
          variant="outlined"
          style="width: 100%; margin-bottom: 1rem"
          on:click={handlePrint}
        >
          Print
        </Button>
        {#if RESOLUTION_STATES.ENDED === resolution.state}
          <Alert
            type="info"
            message="Please set the printer to landscape if you want to properly view the voting table"
            title="Heads up"
          />
        {/if}
      {/if}
      <div>
        <div class="extra__heading">
          <h4 class="secondary-title">
            {resolution.resolutionType.name}{resolution.isNegative
              ? " (veto)"
              : ""}
          </h4>
          <Tag label={resolution.state} />
        </div>
        {#if resolution.state === RESOLUTION_STATES.VOTING}
          <hr />
          {#if $acl.canVote(resolution.voters)}
            <VotingWidget
              resolutionId={resolution.id}
              {signerVoted}
              resolutionVoters={resolution.voters}
            />
          {/if}
          {#if !$acl.canVote(resolution.voters)}
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
      </div>
    </div>
  {/if}
</div>
{#if resolution.state === RESOLUTION_STATES.ENDED || (resolution.state === RESOLUTION_STATES.VOTING && !isPrint)}
  <h3 class="secondary-title pagebreak">Voting outcome:</h3>
  <VotingBreakdown
    quorum={resolution.resolutionType.quorum}
    totalVotedYes={resolution.votingStatus.votersHaveVotedYes.reduce(
      (total, voter) =>
        Math.round(voter.votingPower / 1000000000000000000) + total,
      0
    )}
    totalVotedNo={resolution.votingStatus.votersHaveVotedNo.reduce(
      (total, voter) =>
        Math.round(voter.votingPower / 1000000000000000000) + total,
      0
    )}
    totalAbstained={resolution.votingStatus.votersHaveNotVoted.reduce(
      (total, voter) =>
        Math.round(voter.votingPower / 1000000000000000000) + total,
      0
    )}
    hasQuorum={resolution.hasQuorum}
    isNegative={resolution.isNegative}
    maxVotingPower={resolution.voters.reduce(
      (total, voter) => total + voter.votingPower,
      0
    )}
  />
  {#if RESOLUTION_STATES.ENDED === resolution.state && resolution.hasQuorum}
    <Alert type="info">
      THE RESOLUTION OF SHAREHOLDERS <b>HAS BEEN</b> ADOPTED on {resolution
        .resolutionTypeInfo.votingEndsAt}
    </Alert>
  {/if}
  {#if RESOLUTION_STATES.ENDED === resolution.state && !resolution.hasQuorum}
    <Alert type="warning">
      THE RESOLUTION OF SHAREHOLDERS <b>HAS NOT BEEN</b> ADOPTED. Voting ended
      on {resolution.resolutionTypeInfo.votingEndsAt}
    </Alert>
  {/if}
  <DataTable
    table$aria-label="List of shareholders and their votes"
    style="width: 100%;"
    class="main-data-table"
  >
    <Head>
      <Row>
        <Cell>Voter</Cell>
        <Cell numeric>Tokens taken into account</Cell>
        <Cell numeric>Number of votes</Cell>
        <Cell numeric>Percentage of all votes</Cell>
        <Cell>PoA was used</Cell>
        <Cell>Vote</Cell>
      </Row>
    </Head>
    <Body>
      {#each resolution.voters as resolutionVoter}
        <Row>
          <Cell>
            <DaoUser
              ethereumAddress={resolutionVoter.address}
              size="sm"
              hideInfo={isPrint}
            >
              <div class="voter-shareholder-status" slot="after">
                <Tag
                  label={getShareholderStatus(resolutionVoter.address)}
                  size="xs"
                />
              </div>
            </DaoUser>
          </Cell>
          <Cell numeric>{resolutionVoter.votingPower}</Cell>
          <Cell numeric>{resolutionVoter.votingPower}</Cell>
          <Cell numeric
            >{(
              (100 * resolutionVoter.votingPower) /
              resolution.voters.reduce(
                (total, voter) => total + voter.votingPower,
                0
              )
            ).toFixed(2)}</Cell
          >
          <Cell>
            {#if resolutionVoter.delegated !== resolutionVoter.address}
              Yes
            {:else}
              No
            {/if}
          </Cell>
          <Cell>
            {#if resolutionVoter.hasVoted && resolutionVoter.hasVotedYes}
              <Tag label="Yes" size="sm" />
            {/if}
            {#if resolutionVoter.hasVoted && !resolutionVoter.hasVotedYes}
              <Tag label="No" size="sm" />
            {/if}
            {#if !resolutionVoter.hasVoted}
              <span class="not-yet-voted">Abstain</span>
            {/if}
          </Cell>
        </Row>
      {/each}
    </Body>
  </DataTable>
{/if}
{#if [RESOLUTION_STATES.NOTICE, RESOLUTION_STATES.PRE_DRAFT, RESOLUTION_STATES.VOTING].includes(resolution.state)}
  <h3 class="secondary-title">Voting conditions:</h3>
  {#if resolution.isNegative}
    <b>{resolution.resolutionType.quorum}% of negative votes</b> are needed to approve
    the motion
  {:else}
    <b>{resolution.resolutionType.quorum}% of votes</b> are needed to approve the
    motion
  {/if}
{/if}

{#if isPrint}
  <div class="signed">
    <p>/signed digitally/</p>
    --------------------------------------
    <p>Benjamin Gregor Uphues</p>
    <p>Member of management board</p>
  </div>
{/if}

<style>
  .info-business + hr,
  .info-dates + hr {
    margin: 1rem 0;
  }
  .info-business p,
  .info-dates p {
    line-height: 1rem;
  }

  .info-business p b {
    display: inline-block;
    width: 150px;
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
    word-break: break-word;
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

  .voter-shareholder-status {
    position: relative;
    top: -5px;
  }
  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  hr.has-margin {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  :global(.main-data-table) {
    margin-top: 1rem;
  }
  :global(.main-data-table .mdc-data-table__header-cell--numeric) {
    white-space: normal;
  }

  .signed {
    margin-top: 2rem;
  }
  .signed p {
    font-size: 14px;
    margin-bottom: 0.3px;
    line-height: 12px;
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
