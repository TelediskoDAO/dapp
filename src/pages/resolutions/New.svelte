<script lang="ts">
  import { replace, querystring } from "svelte-spa-router";
  import { onMount } from "svelte";

  import { title } from "../../state/runtime";
  import ResolutionForm from "../../components/ResolutionForm.svelte";
  import { resolutionContract } from "../../stores/contracts";
  import { signer } from "../../stores/wallet";
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

  const isMonthlyRewardsResolution =
    new URLSearchParams($querystring).get("template") === "monthlyRewards";

  onMount(() => {
    if (isMonthlyRewardsResolution) {
      const previousMonth = new Date(new Date().getTime());
      previousMonth.setDate(0);
      const month = previousMonth.toLocaleString("en-us", { month: "long" });
      currentResolution.set({
        title: `Rewarding Contributors for ${month}`,
        content: "pasticcio",
        typeId: "routineVeto",
      });
    } else {
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
  }
</script>

<AclCheck />

{#if $acl.loaded}
  <ResolutionForm
    handleSave={handleContractPreDraft}
    fromTemplate={isMonthlyRewardsResolution}
  />
{/if}
