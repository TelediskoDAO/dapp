<script lang="ts">
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import DataTable, { Body, Row, Cell } from "@smui/data-table";
  import { onMount } from "svelte";
  import CircularProgress from "@smui/circular-progress";
  import {
    delegationRefreshTimestamp,
    delegationStatus,
    formState,
  } from "../state/delegation";
  import ResolutionUser from "./ResolutionUser.svelte";
  import { handleDelegate } from "../handlers/voting/delegate";
  import { signer, signerAddress, votingContract } from "../state/eth";
  import Alert from "./Alert.svelte";
  import { usersWithEthereumAddress } from "../state/odoo";
  import Tooltip, { Wrapper } from "@smui/tooltip";

  let open = false;
  let delegatingUser = "";
  let currentUserDelegated = false;
  let currentUserDelegatedBy = false;

  async function onDelegate(toDelegate: string) {
    delegatingUser =
      toDelegate.toLowerCase() !== $signerAddress.toLowerCase()
        ? $usersWithEthereumAddress[toDelegate.toLowerCase()]?.displayName ||
          toDelegate
        : "";
    await handleDelegate(toDelegate, {
      $signer,
      $votingContract,
      delegatingUser,
    });
    open = false;
  }

  onMount(() => {
    const interval = setInterval(() => {
      $delegationRefreshTimestamp = Date.now();
    }, 5000);

    return () => clearInterval(interval);
  });

  $: {
    currentUserDelegated =
      $delegationStatus?.signerDelegationStatus.delegated !==
      $delegationStatus?.signerDelegationStatus.address;
    currentUserDelegatedBy = $delegationStatus?.signerDelegatedBy.length > 0;
  }
</script>

<Wrapper>
  <Button variant="outlined" on:click={() => (open = true)}>
    <Label>Delegation</Label>
    {#if currentUserDelegated || currentUserDelegatedBy}
      <span class="dot" />
    {/if}
  </Button>
  {#if !open && (currentUserDelegated || currentUserDelegatedBy)}
    <Tooltip yPos="below">
      {#if currentUserDelegated}
        You're currently delegating <ResolutionUser
          ethereumAddress={$delegationStatus?.signerDelegationStatus.delegated}
          inline
        />
      {/if}
      {#if currentUserDelegatedBy}
        You're currently being delegated by
        {#each $delegationStatus?.signerDelegatedBy as signerDelegatedByUser, index}
          <ResolutionUser
            inline
            ethereumAddress={signerDelegatedByUser.address}
            shortAddressWhileLoading
          />
          {#if index < $delegationStatus?.signerDelegatedBy.length - 2},&nbsp;{/if}
          {#if index < $delegationStatus?.signerDelegatedBy.length - 1 && index >= $delegationStatus?.signerDelegatedBy.length - 2}and&nbsp;{/if}
        {/each}
      {/if}
    </Tooltip>
  {/if}
</Wrapper>

<Dialog
  bind:open
  aria-labelledby="delegation-title"
  aria-describedby="delegation-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
>
  <Title id="delegation-title">Delegation</Title>
  <Alert type="info">
    Delegating somebody (i.e. giving a power of attorney) means that this person
    can use your voting power to vote for resolutions in his/her favor (i.e.
    your tokens are considered as his/her tokens while voting). Delegations are
    a great tool for you if you want to be a passive DAO member. However, you
    need to acknowledge, that the delegated person can vote however he/she wants
    and does not need a consent from you before each voting takes place.
    Nevertheless, if you ever feel taking an active stance and want to vote
    personally on a specific proposal, your personal choice will override the
    delegated one in DAO system. In addition, you can always end the delegation
    at your own discretion at any time. Using delegations is not mandatory!
  </Alert>
  <Content id="delegation-content">
    <div class="delegation-content__inner">
      {#if $formState.loading || $formState.awaitingConfirmation}
        <div class="progress">
          {#if $formState.awaitingConfirmation}
            <Alert
              message={`${
                delegatingUser
                  ? `Delegating ${delegatingUser}`
                  : "Removing delegation"
              }.
              Awaiting for the transaction to be put on a block`}
            />
          {/if}
          <div class="circular-progress">
            <CircularProgress
              style="height: 32px; width: 32px;"
              indeterminate
            />
          </div>
        </div>
      {:else}
        {#if currentUserDelegatedBy}
          <Alert type="warning">
            You're currently being delegated by
            {#each $delegationStatus?.signerDelegatedBy as signerDelegatedByUser, index}
              <ResolutionUser
                inline
                ethereumAddress={signerDelegatedByUser.address}
                shortAddressWhileLoading
              />
              {#if index < $delegationStatus?.signerDelegatedBy.length - 2},{/if}
              {#if index < $delegationStatus?.signerDelegatedBy.length - 1 && index >= $delegationStatus?.signerDelegatedBy.length - 2}and{/if}
            {/each}, so you can't delegate
          </Alert>
        {/if}
        {#if currentUserDelegated}
          <Alert type="info">
            <div class="alert-with-action">
              <p>
                You're currently delegating <ResolutionUser
                  ethereumAddress={$delegationStatus?.signerDelegationStatus
                    .delegated}
                  inline
                />
              </p>
              <Button
                variant="outlined"
                on:click={() => onDelegate($signerAddress)}
              >
                <Label>Remove</Label>
              </Button>
            </div>
          </Alert>
        {/if}
        <DataTable table$aria-label="Delegation list" style="width: 100%;">
          <Body>
            {#each $delegationStatus?.usersList || [] as delegationUser}
              <Row>
                <Cell width="82%">
                  <ResolutionUser ethereumAddress={delegationUser.address} />
                </Cell>
                <Cell>
                  {#if $delegationStatus?.signerDelegationStatus.delegated === delegationUser.address}
                    <Alert message="Delegated" type="success" />
                  {:else if delegationUser.canBeDelegated}
                    <div class="action">
                      <Button
                        variant="outlined"
                        on:click={() => onDelegate(delegationUser.address)}
                      >
                        <Label>Delegate</Label>
                      </Button>
                    </div>
                  {:else}
                    <Alert message="Can't be delegated" type="warning" />
                  {/if}
                </Cell>
              </Row>
            {/each}
          </Body>
        </DataTable>
      {/if}
    </div>
  </Content>
  <Actions>
    <Button>
      <Label>Close</Label>
    </Button>
  </Actions>
</Dialog>

<style>
  .delegation-content__inner :global(.mdc-data-table__row) {
    height: 74px;
  }
  .alert-with-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .action :global(button) {
    width: 100%;
  }
  .circular-progress {
    display: flex;
    justify-content: center;
  }

  .dot {
    display: block;
    width: 8px;
    height: 8px;
    margin-left: 8px;
    background-color: var(--ruby-red);
    border-radius: 50%;
    animation: blink 1s infinite;
  }
</style>
