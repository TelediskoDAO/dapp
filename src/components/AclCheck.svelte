<script type="ts">
  import CircularProgress from "@smui/circular-progress";
  import { onMount } from "svelte";

  import Ethereum from "../pages/connect/odoo/Ethereum.svelte";
  import { acl } from "../state/resolutions";

  let timeout = null;
  let displayConnect = false;

  onMount(() => {
    timeout = setTimeout(() => {
      displayConnect = true;
    }, 3000);
    return () => clearTimeout(timeout);
  });

  $: {
    if ($acl.loaded) {
      clearTimeout(timeout);
    }
  }
</script>

{#if !$acl.loaded}
  {#if displayConnect}
    <Ethereum />
  {:else}
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
  {/if}
{/if}
