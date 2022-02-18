<script lang="ts">
  import { push, replace } from "svelte-spa-router";
  import { notifier } from "@beyonk/svelte-notifications";
  import isEqual from "lodash.isequal";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import { onDestroy, onMount } from "svelte";
  import Button, { Label } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";

  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { resolutionContract, signer } from "../../state/eth";
  import {
    currentResolution,
    emptyResolution,
    getResolutionState,
    RESOLUTION_STATES,
  } from "../../state/resolutions/new";

  import { add as addToIpfs } from "../../net/ipfs";
  import { graphQLClient } from "../../net/graphQl";
  import { getResolutionQuery } from "../../graphql/get-resolution.query";

  type Params = {
    resolutionId: string;
  };

  export let params: Params = {
    resolutionId: "",
  };

  let resolutionData;
  let disabledUpdate = true;
  let loading = false;
  let awaitingConfirmation = false;
  let open = false;

  onMount(async () => {
    const { resolution } = await graphQLClient.request(getResolutionQuery, {
      id: params.resolutionId,
    });

    resolutionData = resolution;

    if (getResolutionState(resolution) !== RESOLUTION_STATES.PRE_DRAFT) {
      replace(`/resolutions/${params.resolutionId}`);
    }

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
  }

  async function handleUpdateResolution() {
    if (!$signer) {
      return push("/connect/odoo");
    }
    loading = true;
    awaitingConfirmation = false;
    try {
      const ipfsId = await addToIpfs($currentResolution);
      const tx = await $resolutionContract.updateResolution(
        params.resolutionId,
        ipfsId,
        $currentResolution.type
      );
      awaitingConfirmation = true;
      await tx.wait();
      notifier.success("Resolution draft updated!", 5000);
    } catch (err) {
      notifier.danger(err.message, 7000);
    }
    loading = false;
  }

  function handleExport() {
    window.open(`/#/resolutions/${params.resolutionId}/print`);
  }

  function handlePreApprove() {
    open = true;
  }

  async function handleApprove() {
    open = false;
    if (!$signer) {
      return push("/connect/odoo");
    }
    loading = true;
    awaitingConfirmation = false;
    try {
      const tx = await $resolutionContract.approveResolution(
        params.resolutionId
      );
      awaitingConfirmation = true;
      await tx.wait();
      notifier.success("Resolution approved!", 5000);
      push(`/resolutions/${params.resolutionId}`);
    } catch (err) {
      notifier.danger(err.message, 7000);
    }
    loading = false;
  }

  onDestroy(() => {
    $currentResolution = { ...emptyResolution };
  });
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
    <Button on:click={handleApprove}>
      <Label>Yes, proceed</Label>
    </Button>
  </Actions>
</Dialog>

{#if $currentResolution.type === null}
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
{:else}
  <ResolutionForm
    {awaitingConfirmation}
    handleSave={handleUpdateResolution}
    {loading}
    editMode
    {handleExport}
    handleApprove={handlePreApprove}
    {disabledUpdate}
  />
{/if}
