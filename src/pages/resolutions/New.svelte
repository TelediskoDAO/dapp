<script lang="ts">
  import { replace } from "svelte-spa-router";
  import { onMount } from "svelte";

  import { title } from "../../state/runtime";
  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { resolutionContract, signer } from "../../state/eth";
  import { currentResolution, resetForm } from "../../state/resolutions/form";
  import { handleCreate } from "../../handlers/resolutions/create";
  import { acl } from "../../state/resolutions";
  import AclCheck from "../../components/AclCheck.svelte";
  import notifications from "../../helpers/notifications";

  title.set("Resolutions");

  function handleContractPreDraft(vetoTypeId: string | null) {
    handleCreate({
      $signer,
      $currentResolution,
      $resolutionContract,
      vetoTypeId,
    });
  }

  onMount(resetForm);

  $: {
    if ($acl.loaded && !$acl.canCreate) {
      notifications.error(
        "It looks you cannot create resolutions. Your role is not Contributor"
      );
      replace(`/resolutions`);
    }
  }
</script>

<AclCheck />

{#if $acl.loaded}
  <ResolutionForm handleSave={handleContractPreDraft} />
{/if}
