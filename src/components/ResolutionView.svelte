<script type="ts">
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import Button from "@smui/button";
  import DataTable, { Body, Head, Row, Cell } from "@smui/data-table";
  import { format } from "date-fns";
  import showdown from "showdown";
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import { Icon, Svg } from "@smui/common";
  import { mdiInformationOutline } from "@mdi/js";
  import CircularProgress from "@smui/circular-progress/src/CircularProgress.svelte";

  import {
    getDateFromUnixTimestamp,
    getPdfSigner,
    RESOLUTION_STATES,
  } from "../helpers/resolutions";
  import VotingWidget from "./VotingWidget.svelte";
  import type {
    DaoManagerEntity,
    MonthlyRewardsUserData,
    ResolutionEntityEnhanced,
    ResolutionVoter,
  } from "../types";
  import { acl } from "../state/resolutions";
  import Countdown from "./Countdown.svelte";
  import { signerAddress, signer } from "../stores/wallet";
  import Alert from "./Alert.svelte";
  import Tag from "./Tag.svelte";
  import VotingBreakdown from "./VotingBreakdown.svelte";
  import DaoUser from "./DaoUser.svelte";
  import { handleExecute } from "../handlers/resolutions/execute";
  import { resolutionContract } from "../stores/contracts";
  import { executeState } from "../state/resolutions/execute";
  import { projectKey } from "../stores/config";

  export let resolution: ResolutionEntityEnhanced;
  export let daoManagerData: DaoManagerEntity;
  export let executionPayload: MonthlyRewardsUserData[] | null = null;
  let isPrint = /\/print$/.test($location);
  let signerVoted: ResolutionVoter | null = null;
  const converter = new showdown.Converter();
  converter.setFlavor("github");

  const secretary = resolution ? getPdfSigner(resolution) : "";

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
        (voter) => voter.address === $signerAddress?.toLowerCase()
      );
    }
  }

  function handlePrint() {
    window.open(`/#/resolutions/${resolution.id}/print`);
  }

  function handleExecution() {
    handleExecute(resolution.id, {
      $signer,
      $resolutionContract,
    });
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
          <b>Business name:</b>
          {projectKey} DAO OÜ
        </p>
        <p>
          <b>Registry code:</b>
          {projectKey === "teledisko" ? "16374990" : "16638166"}
        </p>
        <p>
          <b>Registered office:</b> Laki 11/1, 12915 Tallinn, Estonia
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
            <b>Recording secretary:</b>
            {secretary}
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
    {#if (executionPayload || []).length > 0 && !isPrint && resolution.hasQuorum}
      <h3 class="secondary-title pagebreak">Execution payload:</h3>
      <div class="execution-payload">
        <Alert>
          {#if resolution.executionTimestamp}
            As this resolution has been correctly executed <b
              >{resolution.executedAt}</b
            >, these tokens have been minted for the following contributors
          {:else}
            This payload will be used to automatically mint the tokens for the
            contributors
          {/if}
        </Alert>
        <ul>
          {#each executionPayload || [] as userData}
            <li>
              <DaoUser
                ethereumAddress={userData.address}
                hasBg
                title={`<b>${userData.tokens} TT</b> to`}
                size="sm"
              />
            </li>
          {/each}
        </ul>
      </div>
    {/if}
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
          <div>
            <h4 class="secondary-title">
              {resolution.resolutionType.name}{resolution.isNegative
                ? " (veto)"
                : ""}
            </h4>
            <Tag label={resolution.state} />
          </div>
          {#if resolution.state === RESOLUTION_STATES.ENDED && (executionPayload || []).length > 0 && resolution.hasQuorum}
            <hr style="margin: 1rem 0;" />
            {#if !resolution.executionTimestamp}
              <Button
                variant="unelevated"
                style="width: 100%;"
                on:click={handleExecution}
              >
                Execute
              </Button>
              {#if $executeState.loading || $executeState.awaitingConfirmation}
                <div class="progress">
                  {#if $executeState.awaitingConfirmation}
                    <Alert
                      message="Awaiting for the transaction to be put on a block"
                    />
                  {/if}
                  <div style="text-align: center">
                    <CircularProgress
                      style="height: 32px; width: 32px;"
                      indeterminate
                    />
                  </div>
                </div>
              {/if}
            {:else}
              <Alert>
                Resolution executed <b>{resolution.executedAt}</b>
              </Alert>
            {/if}
          {/if}
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
      (total, voter) => voter.votingPowerInt + total,
      0
    )}
    totalVotedNo={resolution.votingStatus.votersHaveVotedNo.reduce(
      (total, voter) => voter.votingPowerInt + total,
      0
    )}
    totalAbstained={resolution.votingStatus.votersHaveNotVoted.reduce(
      (total, voter) => voter.votingPowerInt + total,
      0
    )}
    hasQuorum={resolution.hasQuorum}
    isNegative={resolution.isNegative}
    maxVotingPower={resolution.voters.reduce(
      (total, voter) => total + voter.votingPowerInt,
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
          <Cell numeric>{resolutionVoter.votingPowerInt.toLocaleString()}</Cell>
          <Cell numeric>{resolutionVoter.votingPowerInt.toLocaleString()}</Cell>
          <Cell numeric
            >{(
              (100 * resolutionVoter.votingPowerInt) /
              resolution.voters.reduce(
                (total, voter) => total + voter.votingPowerInt,
                0
              )
            ).toFixed(2)}</Cell
          >
          <Cell>
            {#if resolutionVoter.usedPoa}
              <div class="poa-wrapper">
                <strong>Yes</strong>
                {#if !isPrint}
                  <Wrapper>
                    <span class="icon-wrapper">
                      <Icon component={Svg} viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiInformationOutline} />
                      </Icon>
                    </span>
                    {#if resolutionVoter.delegating}
                      <Tooltip yPos="above">
                        Delegated to <DaoUser
                          ethereumAddress={resolutionVoter.delegating.address}
                          inline
                          shortAddressWhileLoading
                          isBold
                        />
                      </Tooltip>
                    {/if}
                    {#if resolutionVoter.beingDelegatedBy.length > 0}
                      <Tooltip yPos="above">
                        {#each resolutionVoter.beingDelegatedBy as delegatedByUser, index}
                          Being delegated by
                          <DaoUser
                            inline
                            ethereumAddress={delegatedByUser.address}
                            shortAddressWhileLoading
                            isBold
                          />
                          {#if index < resolutionVoter.beingDelegatedBy.length - 2},{/if}
                          {#if index < resolutionVoter.beingDelegatedBy.length - 1 && index >= resolutionVoter.beingDelegatedBy.length - 2}and{/if}
                        {/each}
                      </Tooltip>
                    {/if}
                  </Wrapper>
                {/if}
              </div>
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
    <p>{secretary}</p>
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

  .execution-payload {
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid var(--color-gray-5);
    border-radius: 8px;
  }

  .execution-payload ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .execution-payload ul li:not(:last-child) {
    margin-bottom: 0.5rem;
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

  .extra__heading > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .extra__heading > div > h4 {
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

  .poa-wrapper {
    display: flex;
    align-items: center;
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
