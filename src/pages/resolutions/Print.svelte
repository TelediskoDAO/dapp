<script lang="ts">
  import { onMount } from "svelte";
  import ResolutionView from "../../components/ResolutionView.svelte";

  import { resolutions } from "../../state/resolutions";
  import { Resolution, RESOLUTION_TYPES } from "../../state/resolutions/new";

  type Params = {
    resolutionId?: string
  }

  export let params: Params = {}

  const resolutionData = $resolutions.find((res: Resolution) => String(res.resolutionId) === params.resolutionId)

  onMount(() => {
    window.print()
    window.close()
  })
</script>

<ResolutionView
  title={resolutionData.title}
  content={resolutionData.content}
  type={RESOLUTION_TYPES[resolutionData.type]}
  state={resolutionData.state}
/>
