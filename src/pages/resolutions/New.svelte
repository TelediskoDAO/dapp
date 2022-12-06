<script lang="ts">
  import { replace, querystring } from "svelte-spa-router";
  import { onMount } from "svelte";
  import Dialog, { Actions, Content, Title } from "@smui/dialog";
  import Button, { Label } from "@smui/button";

  import { title } from "../../state/runtime";
  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { resolutionContract, tokenContract } from "../../stores/contracts";
  import { signer } from "../../stores/wallet";
  import { currentResolution, resetForm } from "../../state/resolutions/form";
  import { handleCreate } from "../../handlers/resolutions/create";
  import { acl } from "../../state/resolutions";
  import AclCheck from "../../components/AclCheck.svelte";
  import notifications from "../../helpers/notifications";
  import { getExecutionPayload } from "../../helpers/resolutions";
  import type { MonthlyRewardsUserData, RewardsResponse } from "../../types";
  import { lastMonthRewardsEndpoint } from "../../stores/config";

  title.set("Resolutions");

  let open = false;
  let executionPayload: MonthlyRewardsUserData[] | null = null;
  let localVetoTypeId: string | null = null;

  const isMonthlyRewardsResolution =
    new URLSearchParams($querystring).get("template") === "monthlyRewards";

  const getPreviousMonth = () => {
    const currentDate = new Date();
    currentDate.setDate(0);

    return currentDate.toLocaleString("en-us", { month: "long" });
  };

  function handleCreatePreDraft(vetoTypeId: string | null) {
    if (isMonthlyRewardsResolution) {
      open = true;
      localVetoTypeId = vetoTypeId;
    } else {
      handleCreate({
        $signer,
        $currentResolution,
        $resolutionContract,
        vetoTypeId,
      });
    }
  }

  function handleCreateMonthlyRewardsPreDraft() {
    handleCreate({
      $signer,
      $currentResolution,
      $resolutionContract,
      vetoTypeId: localVetoTypeId,
      executionData: executionPayload?.map((user) => user.executionData) || [],
      executionTo: executionPayload?.map(() => $tokenContract.address) || [],
    });
  }

  onMount(async () => {
    if (!isMonthlyRewardsResolution) {
      resetForm();
    }
  });

  $: {
    if ($acl.loaded && !$acl.canCreate) {
      notifications.error(
        "It looks you cannot create resolutions. Your role is not Contributor"
      );
      replace(`/resolutions`);
    }

    if ($tokenContract && isMonthlyRewardsResolution) {
      (async () => {
        const rewardsInfoReq = await fetch(lastMonthRewardsEndpoint);
        const rewardsInfo: RewardsResponse = await rewardsInfoReq.json();

        currentResolution.set({
          title: rewardsInfo.resolution.title,
          content: rewardsInfo.resolution.content,
          typeId: "routineVeto",
        });

        executionPayload = await getExecutionPayload(
          $tokenContract,
          rewardsInfo
        );
      })();
    }
  }
</script>

<AclCheck />

{#if isMonthlyRewardsResolution}
  <Dialog
    bind:open
    aria-labelledby="dialog-title"
    aria-describedby="dialog-content"
  >
    <Title id="dialog-title">Warning!</Title>
    <Content id="dialog-content">
      Are you sure the {getPreviousMonth()} rewards resolution hasn't been created
      yet?
    </Content>
    <Actions>
      <Button on:click={() => (open = false)}>
        <Label>No</Label>
      </Button>
      <Button on:click={handleCreateMonthlyRewardsPreDraft}>
        <Label>Yes, proceed</Label>
      </Button>
    </Actions>
  </Dialog>
{/if}

{#if $acl.loaded && !isMonthlyRewardsResolution}
  <ResolutionForm handleSave={handleCreatePreDraft} />
{/if}

{#if $acl.loaded && isMonthlyRewardsResolution && executionPayload}
  <ResolutionForm
    handleSave={handleCreatePreDraft}
    isMonthlyRewards
    {executionPayload}
  />
{/if}
