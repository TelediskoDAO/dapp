<script lang="ts">
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";

  import ResolutionView from "../../components/ResolutionView.svelte";
  import { Resolution, RESOLUTION_TYPES } from "../../state/resolutions/new";

  type Params = {
    resolutionId?: string;
  };

  export let params: Params = {};

  const resolutionData = null;

  onMount(() => {
    if (/\/print$/.test($location)) {
      window.print();
      window.close();
    }
  });
</script>

<ResolutionView
  title={resolutionData.title}
  content={resolutionData.content}
  type={RESOLUTION_TYPES[resolutionData.type]}
  state={resolutionData.state}
/>
