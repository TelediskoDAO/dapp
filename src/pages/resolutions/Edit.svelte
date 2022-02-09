<script lang="ts">
  import { push, replace } from "svelte-spa-router";
  import { notifier } from "@beyonk/svelte-notifications";
  import isEqual from "lodash.isequal";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import { onDestroy, onMount } from "svelte";
  import Button, { Label } from "@smui/button";

  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { resolutionContract, signer } from "../../state/eth";
  import { resolutions } from "../../state/resolutions";
  import {
    currentResolution,
    emptyResolution,
    Resolution,
    RESOLUTION_STATES,
  } from "../../state/resolutions/new";

  import { add as addToIpfs } from "../../net/ipfs";

  type Params = {
    resolutionId: string;
  };

  export let params: Params = {
    resolutionId: "",
  };

  let resolutionData = $resolutions.find(
    (res: Resolution) => String(res.resolutionId) === params.resolutionId
  );

  $currentResolution = { ...resolutionData };

  $: disabledUpdate = isEqual(resolutionData, $currentResolution);

  let loading = false;
  let receipt = null;
  let awaitingConfirmation = false;
  let open = false;

  async function handleUpdateResolution() {
    if (!$signer) {
      return push("/connect/odoo");
    }
    receipt = null;
    loading = true;
    awaitingConfirmation = false;
    try {
      const ipfsId = await addToIpfs($currentResolution);
      $currentResolution.ipfsId = ipfsId;
      const tx = await $resolutionContract.updateResolution(
        $currentResolution.resolutionId,
        ipfsId,
        $currentResolution.type
      );
      awaitingConfirmation = true;
      receipt = await tx.wait();
      $currentResolution.blockHash = receipt.blockHash;
      notifier.success("Resolution draft updated!", 5000);
      const currentResolutionIndex = $resolutions.findIndex(
        (res: Resolution) =>
          res.resolutionId === $currentResolution.resolutionId
      );
      $resolutions = Object.assign([], $resolutions, {
        [currentResolutionIndex]: $currentResolution,
      });
      resolutionData = { ...$currentResolution };
    } catch (err) {
      notifier.danger(err.message, 7000);
    }
    loading = false;
  }

  function handleExport() {
    window.open(`/#/resolutions/${$currentResolution.resolutionId}/print`);
  }

  function handlePreApprove() {
    open = true;
  }

  async function handleApprove() {
    open = false;
    if (!$signer) {
      return push("/connect/odoo");
    }
    receipt = null;
    loading = true;
    awaitingConfirmation = false;
    try {
      const tx = await $resolutionContract.approveResolution(
        $currentResolution.resolutionId
      );
      awaitingConfirmation = true;
      receipt = await tx.wait();
      $currentResolution.blockHash = receipt.blockHash;
      $currentResolution.state = RESOLUTION_STATES.NOTICE;
      notifier.success("Resolution approved!", 5000);
      const currentResolutionIndex = $resolutions.findIndex(
        (res: Resolution) =>
          res.resolutionId === $currentResolution.resolutionId
      );
      $resolutions = Object.assign([], $resolutions, {
        [currentResolutionIndex]: $currentResolution,
      });
      push(`/resolutions/${$currentResolution.resolutionId}`);
    } catch (err) {
      notifier.danger(err.message, 7000);
    }
    loading = false;
  }

  onDestroy(() => {
    $currentResolution = { ...emptyResolution };
  });

  onMount(() => {
    if ($currentResolution.state !== RESOLUTION_STATES.PRE_DRAFT) {
      replace(`/resolutions/${$currentResolution.resolutionId}`);
    }
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

<ResolutionForm
  {awaitingConfirmation}
  handleSave={handleUpdateResolution}
  {loading}
  editMode
  {handleExport}
  handleApprove={handlePreApprove}
  {disabledUpdate}
/>
