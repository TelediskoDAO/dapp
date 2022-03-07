<script lang="ts">
  import { notifier } from "@beyonk/svelte-notifications";
  import { replace } from "svelte-spa-router";
  import { onMount } from "svelte";

  import { title } from "../../state/runtime";
  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { resolutionContract, signer } from "../../state/eth";
  import { currentResolution, resetForm } from "../../state/resolutions/form";
  import { handleCreate } from "../../handlers/resolutions/create";
  import { acl } from "../../state/resolutions";
  import AclCheck from "../../components/AclCheck.svelte";

  title.set("Resolutions");

  function handleContractPreDraft() {
    handleCreate({ $signer, $currentResolution, $resolutionContract });
  }

  onMount(resetForm);

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
  <AclCheck />
{:else}
  <ResolutionForm handleSave={handleContractPreDraft} />
{/if}
