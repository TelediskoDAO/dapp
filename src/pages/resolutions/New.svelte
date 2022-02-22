<script lang="ts">
  import { title } from "../../state/runtime";
  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { resolutionContract, signer } from "../../state/eth";
  import { currentResolution, resetForm } from "../../state/resolutions/form";
  import { onMount } from "svelte";
  import { handleCreate } from "../../handlers/resolutions/create";

  title.set("Resolutions");

  function handleContractPreDraft() {
    handleCreate({ $signer, $currentResolution, $resolutionContract });
  }

  onMount(resetForm);
</script>

<ResolutionForm handleSave={handleContractPreDraft} />
