<script lang="ts">
  import { replace } from "svelte-spa-router";
  import isEqual from "lodash.isequal";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import { onMount } from "svelte";
  import Button, { Label } from "@smui/button";
  import { formatEther, Interface } from "ethers/lib/utils";

  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { resolutionContract, tokenContract } from "../../stores/contracts";
  import { signer } from "../../stores/wallet";

  import { graphQLClient } from "../../net/graphQl";
  import { getResolutionQuery } from "../../graphql/get-resolution.query";
  import type { MonthlyRewardsUserData, ResolutionEntity } from "../../types";
  import { handleUpdate } from "../../handlers/resolutions/update";
  import { handleApprove } from "../../handlers/resolutions/approve";
  import { handleReject } from "../../handlers/resolutions/reject";
  import {
    getRelativeDateFromUnixTimestamp,
    getResolutionState,
    getResolutionTypeInfo,
    RESOLUTION_STATES,
  } from "../../helpers/resolutions";
  import { currentResolution, resetForm } from "../../state/resolutions/form";
  import { acl } from "../../state/resolutions";
  import AclCheck from "../../components/AclCheck.svelte";
  import { TelediskoToken__factory } from "../../../contracts/typechain";

  type Params = {
    resolutionId: string;
  };

  export let params: Params = {
    resolutionId: "",
  };

  let resolutionData: ResolutionEntity;
  let disabledUpdate = true;
  let open = false;
  let openReject = false;
  let loaded = false;
  let isVeto = false;
  let executionPayload: MonthlyRewardsUserData[] | null = null;

  onMount(async () => {
    const {
      resolution,
    }: {
      resolution: ResolutionEntity;
    } = await graphQLClient.request(getResolutionQuery, {
      id: params.resolutionId,
    });

    resolutionData = resolution;

    if ((resolutionData?.executionData || []).length > 0) {
      const contractInterface = new Interface(TelediskoToken__factory.abi);
      executionPayload = (resolutionData.executionData || []).map((data) => {
        const {
          args: [address, tokens],
        } = contractInterface.parseTransaction({ data });
        return {
          address,
          tokens: formatEther(tokens),
        };
      });
    }

    isVeto =
      resolutionData.resolutionType.name === "routine" &&
      resolutionData.isNegative;

    $currentResolution = {
      title: resolutionData.title,
      content: resolutionData.content,
      typeId: isVeto ? "routineVeto" : resolutionData.resolutionType.id,
    };

    return resetForm;
  });

  $: {
    disabledUpdate = isEqual(
      {
        title: resolutionData?.title,
        content: resolutionData?.content,
        typeId: isVeto ? "routineVeto" : resolutionData?.resolutionType.id,
      },
      $currentResolution
    );

    const resolutionTypeInfo = resolutionData
      ? getResolutionTypeInfo(resolutionData)
      : null;

    const shouldRedirectToView =
      (resolutionTypeInfo &&
        getResolutionState(resolutionData, Date.now(), resolutionTypeInfo) !==
          RESOLUTION_STATES.PRE_DRAFT) ||
      ($acl.loaded && !$acl.canUpdate) ||
      typeof resolutionData?.rejectBy === "string";

    if (shouldRedirectToView) {
      replace(`/resolutions/${params.resolutionId}`);
    }

    if (resolutionTypeInfo) {
      loaded = true;
    }
  }

  function handleUpdateResolution(vetoTypeId: string | null) {
    handleUpdate(params.resolutionId, {
      $signer,
      $currentResolution,
      $resolutionContract,
      vetoTypeId,
    });
  }

  function handleExport() {
    window.open(`/#/resolutions/${params.resolutionId}/print`);
  }

  function handlePreApprove() {
    open = true;
  }

  function handlePreReject() {
    openReject = true;
  }

  function handleApproveResolution() {
    open = false;
    handleApprove(params.resolutionId, { $signer, $resolutionContract });
  }

  function handleRejectResolution() {
    openReject = false;
    handleReject(params.resolutionId, { $signer, $resolutionContract });
  }
</script>

<Dialog
  bind:open
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content"
>
  <Title id="dialog-title">Warning!</Title>
  <Content id="dialog-content">
    Have you exported the resolution pdf and signed it?
  </Content>
  <Actions>
    <Button on:click={() => (open = false)}>
      <Label>No</Label>
    </Button>
    <Button on:click={handleApproveResolution}>
      <Label>Yes, proceed</Label>
    </Button>
  </Actions>
</Dialog>

<Dialog
  bind:open={openReject}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content"
>
  <Title id="dialog-title">Warning!</Title>
  <Content id="dialog-content">
    This action is destructive and the current resolution will be rejected. Are
    you sure?
  </Content>
  <Actions>
    <Button on:click={() => (open = false)}>
      <Label>No</Label>
    </Button>
    <Button on:click={handleRejectResolution}>
      <Label>Yes, proceed</Label>
    </Button>
  </Actions>
</Dialog>

<AclCheck />

{#if loaded && $acl.loaded && typeof resolutionData.rejectBy !== "string"}
  <ResolutionForm
    handleSave={handleUpdateResolution}
    createBy={resolutionData.createBy}
    createdOn={getRelativeDateFromUnixTimestamp(resolutionData.createTimestamp)}
    {handleExport}
    handleApprove={handlePreApprove}
    handleReject={handlePreReject}
    {disabledUpdate}
    isMonthlyRewards={(resolutionData.executionData || []).length > 0}
    {executionPayload}
  />
{/if}
