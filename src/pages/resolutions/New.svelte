<script lang="ts">
  import { push } from "svelte-spa-router";
  import { notifier } from "@beyonk/svelte-notifications";

  import { currentResolution } from "../../state/resolutions/new";
  import { signer } from "../../state/eth";
  import networks from "../../contracts/networks.json";
  import { ResolutionMock__factory } from "../../contracts";
  import { add as addToIpfs } from "../../net/ipfs";
  import { resolutions } from "../../state/resolutions";
  import { title } from "../../state/runtime";
  import ResolutionForm from "../../components/ResolutionForm.svelte";

  title.set("Resolutions");

  let loading = false;
  let receipt = null;
  let awaitingConfirmation = false;

  async function handleContractPreDraft() {
    if (!$signer) {
      return push("/connect/odoo");
    }
    receipt = null;
    loading = true;
    awaitingConfirmation = false;
    try {
      const chainId = await $signer.getChainId();
      const address = networks[chainId.toString()]["ResolutionMock"];
      const contract = ResolutionMock__factory.connect(address, $signer);
      const ipfsId = await addToIpfs($currentResolution);
      $currentResolution.ipfsId = ipfsId;
      const tx = await contract.createResolution(
        ipfsId,
        $currentResolution.type
      );
      const resolutionId = $resolutions.length; // to fix, as tx.value looks to always be 0
      awaitingConfirmation = true;
      receipt = await tx.wait();
      $currentResolution.blockHash = receipt.blockHash;
      $currentResolution.resolutionId = Number(resolutionId);
      notifier.success("Resolution draft created!", 5000);
      $resolutions = [...$resolutions, $currentResolution];
      push("/resolutions");
    } catch (err) {
      notifier.danger(err.message, 7000);
    }
    loading = false;
  }
</script>

<ResolutionForm
  {awaitingConfirmation}
  handleSave={handleContractPreDraft}
  {loading}
/>
