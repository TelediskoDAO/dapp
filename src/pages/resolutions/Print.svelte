<script lang="ts">
import { onMount } from "svelte";

  import { resolutions } from "../../state/resolutions";
import { RESOLUTION_TYPES } from "../../state/resolutions/new";

  type Params = {
    resolutionIpfsId?: string
  }

  export let params: Params = {}

  const resolutionData = $resolutions.find(res => res.ipfsId === params.resolutionIpfsId)

  onMount(() => {
    window.print()
    window.close()
  })
</script>

<div>
  <h1>{resolutionData.title}</h1>
  <pre>
    {resolutionData.content}
  </pre>

  <div><small><em>Resolution type: {RESOLUTION_TYPES[resolutionData.type]}</em></small></div>
  <small><em>Resolution status: {resolutionData.status}</em></small>
</div>