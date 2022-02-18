<script lang="ts">
  import { push } from "svelte-spa-router";
  import { notifier } from "@beyonk/svelte-notifications";

  import {
    currentResolution,
    emptyResolution,
  } from "../../state/resolutions/new";
  import {
    resolutionContract,
    resolutionContractTypes,
    signer,
  } from "../../state/eth";
  import { add as addToIpfs } from "../../net/ipfs";
  import { title } from "../../state/runtime";
  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { onMount } from "svelte";

  title.set("Resolutions");

  let loading = false;
  let awaitingConfirmation = false;

  async function handleContractPreDraft() {
    if (!$signer) {
      return push("/connect/odoo");
    }
    loading = true;
    awaitingConfirmation = false;
    try {
      const ipfsId = await addToIpfs($currentResolution);
      const tx = await $resolutionContract.createResolution(
        ipfsId,
        $currentResolution.type,
        $currentResolution.isNegative
      );
      awaitingConfirmation = true;
      await tx.wait();
      notifier.success("Resolution draft created!", 5000);
      push("/resolutions");
    } catch (err) {
      notifier.danger(err.message, 7000);
    }
    loading = false;
  }

  onMount(() => {
    $currentResolution = { ...emptyResolution };
  });
</script>

<ResolutionForm
  {awaitingConfirmation}
  handleSave={handleContractPreDraft}
  {loading}
/>
