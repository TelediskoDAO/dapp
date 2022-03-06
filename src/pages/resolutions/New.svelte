<script lang="ts">
  import { notifier } from "@beyonk/svelte-notifications";
  import CircularProgress from "@smui/circular-progress";
  import { replace } from "svelte-spa-router";
  import { onMount } from "svelte";

  import { title } from "../../state/runtime";
  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { resolutionContract, signer } from "../../state/eth";
  import { currentResolution, resetForm } from "../../state/resolutions/form";
  import { handleCreate } from "../../handlers/resolutions/create";
  import { acl } from "../../state/resolutions";

  title.set("Resolutions");

  function handleContractPreDraft() {
    handleCreate({ $signer, $currentResolution, $resolutionContract });
  }

  onMount(resetForm);

  // TODO, should we spin a timeout here? if i.e. after 5 seconds acl is still not loaded, probably
  // we can display a message to the user with "You should re-connect your wallet"? or we shouldn't care?

  $: {
    if ($acl.loaded && !$acl.canCreate) {
      notifier.danger(
        "It looks you cannot create resolutions. Your role is not Contributor",
        5000
      );
      replace(`/resolutions`);
    }
  }
</script>

{#if !$acl.loaded}
  <CircularProgress style="height: 32px; width: 32px;" indeterminate />
{:else}
  <ResolutionForm handleSave={handleContractPreDraft} />
{/if}
