<script lang="ts">
  import ResolutionForm from "../../components/ResolutionForm.svelte";

  import { resolutions } from "../../state/resolutions";
  import { currentResolution } from "../../state/resolutions/new";

  type Params = {
    resolutionIpfsId?: string
  }

  export let params: Params = {}

  const resolutionData = $resolutions.find(res => res.ipfsId === params.resolutionIpfsId)

  $currentResolution = resolutionData

  function handleUpdateResolution() {
    console.log($currentResolution)
  }

  function handleExport() {
    window.open(`/#/resolutions/${$currentResolution.ipfsId}/print`)
  }
</script>

<style></style>


<ResolutionForm
  title={$currentResolution.title}
  content={$currentResolution.content}
  type={$currentResolution.type}
  awaitingConfirmation={false}
  handleSave={handleUpdateResolution}
  loading={false}
  editMode
  handleExport={handleExport}
/>
