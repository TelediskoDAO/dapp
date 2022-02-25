<script lang="ts">
  import { replace } from "svelte-spa-router";
  import isEqual from "lodash.isequal";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import { onDestroy, onMount } from "svelte";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";

  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import {
    resolutionContract,
    resolutionContractTypes,
    signer,
  } from "../../state/eth";

  import { graphQLClient } from "../../net/graphQl";
  import { getResolutionQuery } from "../../graphql/get-resolution.query";
  import type { ResolutionEntity } from "../../types";
  import { handleUpdate } from "../../handlers/resolutions/update";
  import { handleApprove } from "../../handlers/resolutions/approve";
  import {
    getResolutionState,
    RESOLUTION_STATES,
  } from "../../helpers/resolutions";
  import { currentResolution, resetForm } from "../../state/resolutions/form";

  type Params = {
    resolutionId: string;
  };

  export let params: Params = {
    resolutionId: "",
  };

  let resolutionData: ResolutionEntity;
  let disabledUpdate = true;
  let open = false;
  let loaded = false;

  onMount(async () => {
    const { resolution }: { resolution: ResolutionEntity } =
      await graphQLClient.request(getResolutionQuery, {
        id: params.resolutionId,
      });

    resolutionData = resolution;

    $currentResolution = {
      title: resolutionData.title,
      content: resolutionData.content,
      isNegative: resolutionData.isNegative,
      type: Number(resolutionData.typeId),
    };
  });

  $: {
    disabledUpdate = isEqual(
      {
        title: resolutionData?.title,
        content: resolutionData?.content,
        isNegative: resolutionData?.isNegative,
        type: Number(resolutionData?.typeId),
      },
      $currentResolution
    );

    const resolutionType =
      resolutionData && $resolutionContractTypes
        ? $resolutionContractTypes[Number(resolutionData.typeId)]
        : null;

    if (
      resolutionType &&
      getResolutionState(resolutionData, +new Date(), resolutionType) !==
        RESOLUTION_STATES.PRE_DRAFT
    ) {
      replace(`/resolutions/${params.resolutionId}`);
    }

    if (resolutionType) {
      loaded = true;
    }
  }

  function handleUpdateResolution() {
    handleUpdate(params.resolutionId, {
      $signer,
      $currentResolution,
      $resolutionContract,
    });
  }

  function handleExport() {
    window.open(`/#/resolutions/${params.resolutionId}/print`);
  }

  function handlePreApprove() {
    open = true;
  }

  function handleApproveResolution() {
    open = false;
    handleApprove(params.resolutionId, { $signer, $resolutionContract });
  }

  onDestroy(resetForm);
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

{#if !loaded}
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
{:else}
  <ResolutionForm
    handleSave={handleUpdateResolution}
    editMode
    {handleExport}
    handleApprove={handlePreApprove}
    {disabledUpdate}
  />
{/if}
