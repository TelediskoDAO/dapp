<script lang="ts">
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import DataTable, { Body, Row, Cell } from "@smui/data-table";
  import ResolutionUser from "./ResolutionUser.svelte";
  import { handleDelegate } from "../handlers/voting/delegate";
  import { signer, signerAddress, votingContract } from "../state/eth";
  import { onMount } from "svelte";
  import {
    delegationRefreshTimestamp,
    delegationStatus,
  } from "../state/delegation";

  let open = false;

  function onDelegate(toDelegate: string) {
    handleDelegate(toDelegate, {
      $signer,
      $votingContract,
    });
  }

  onMount(() => {
    const interval = setInterval(() => {
      $delegationRefreshTimestamp = Date.now();
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<Button variant="outlined" on:click={() => (open = true)}>
  <Label>Delegate</Label>
</Button>

<Dialog
  bind:open
  aria-labelledby="delegation-title"
  aria-describedby="delegation-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
>
  <Title id="delegation-title">Delegation list</Title>
  <Content id="delegation-content">
    {#if $delegationStatus?.signerDelegationStatus.delegated !== $delegationStatus?.signerDelegationStatus.address}
      It looks you've delegated <ResolutionUser
        ethereumAddress={$delegationStatus?.signerDelegationStatus.delegated}
        inline
      />. Click here if you want to un-delegate.
      <Button variant="outlined" on:click={() => onDelegate($signerAddress)}>
        <Label>Remove delegation</Label>
      </Button>
    {/if}
    <DataTable table$aria-label="Delegation list" style="width: 100%;">
      <Body>
        {#each $delegationStatus?.delegatableUsers || [] as delegatableUser}
          <Row>
            <Cell width="82%">
              <ResolutionUser
                ethereumAddress={delegatableUser.address}
                size="sm"
              />
            </Cell>
            <Cell>
              {#if $delegationStatus?.signerDelegationStatus.delegated === delegatableUser.address}
                DELEGATED
              {:else}
                <Button
                  variant="outlined"
                  on:click={() => onDelegate(delegatableUser.address)}
                >
                  <Label>Delegate</Label>
                </Button>
              {/if}
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </Content>
  <Actions>
    <Button>
      <Label>Close</Label>
    </Button>
  </Actions>
</Dialog>
