<script lang="ts">
  import Select, { Option } from "@smui/select"
  import Button, { Label } from "@smui/button"
  import CircularProgress from "@smui/circular-progress"
  import Textfield from "@smui/textfield"
  import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';
  import { push } from 'svelte-spa-router'
  import { notifier } from '@beyonk/svelte-notifications'
  
  import { newResolution, RESOLUTION_TYPES } from "../../state/resolutions/new";
  import { signer } from "../../state/eth";
  import networks from "../../contracts/networks.json";
  import { ResolutionMock__factory } from "../../contracts";
  import { add as addToIpfs } from "../../net/ipfs";
  import { resolutions } from "../../state/resolutions";
  import { title } from "../../state/runtime";

  title.set("Resolutions");

  function init(el) {
    el.querySelector('input').focus();
  }

  let loading = false
  let receipt = null
  let awaitingConfirmation = false
  let disabled = true

  $: {
    const fieldsToCheck = [
      $newResolution.type,
      $newResolution.content.trim(),
      $newResolution.title.trim()
    ]
    disabled = fieldsToCheck.filter(Boolean).length < fieldsToCheck.length
  }

  async function handleContractPreDraft() {
    if (!$signer) {
      return push('/connect/odoo')
    }
    receipt = null
    loading = true
    awaitingConfirmation = false
    try {
      const chainId = await $signer.getChainId();
      const address = networks[chainId.toString()]["ResolutionMock"];
      const contract = ResolutionMock__factory.connect(address, $signer);
      const ipfsId = await addToIpfs($newResolution);
      $newResolution.ipfsId = ipfsId
      const tx = await contract.createResolution(ipfsId, $newResolution.type)
      awaitingConfirmation = true
      receipt = await tx.wait()
      notifier.success('Resolution draft created!', 5000)
      $resolutions = [...$resolutions, $newResolution]
      push('/resolutions')
    } catch (err) {
      notifier.danger(err.message, 7000)
    }
    loading = false
  } 
</script>


<style>
  :global(.field) {
    width: 100%;
  }

  :global(.field input) {
    box-shadow: none;
  }
  
  .section {
    position: relative;
  }

  .progress {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .5);
    backdrop-filter: blur(3px);
    z-index: 1;
    display: flex; justify-content: center; align-items: center;
  }

</style>

<section class="section">
  {#if loading}
    <div class="progress">
      {#if awaitingConfirmation}
        Awaiting for the transaction to be put on a block... hold tight!
      {:else}
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      {/if}
    </div>
  {/if}
  <LayoutGrid>
    {#if receipt?.blockHash}
      <Cell span={12}>
        <h1>Resolution draft created: {receipt.blockHash}</h1>
      </Cell>
    {:else}
      <Cell span={12}>
        <h1>{$newResolution.title || 'New Resolution'}</h1>
      </Cell>
    {/if}
    
    <Cell span={12}>
      <InnerGrid>
        <Cell span={6}>
          <div use:init>
            <Textfield class="field" bind:value={$newResolution.title} label="Resolution Title" />
          </div>
        </Cell>
      </InnerGrid>
    </Cell>
    <Cell span={12}>
      <InnerGrid>
        <Cell span={6}>
          <Textfield
            style="width: 100%"
            textarea
            bind:value={$newResolution.content}
            label="Resolution Content"
          />
        </Cell>
      </InnerGrid>
    </Cell>
    <Cell span={12}>
      <InnerGrid>
        <Cell span={3}>
          <Select class="field" bind:value={$newResolution.type} label="Resolution Type">
            {#each Object.entries(RESOLUTION_TYPES) as resolutionType}
              <Option value={resolutionType[0]}>{resolutionType[1]}</Option>
            {/each}
          </Select>
        </Cell>
      </InnerGrid>
    </Cell>
    <Cell span={3}>
      <Button variant="raised" disabled={disabled} on:click={handleContractPreDraft}>
        <Label>Save pre-draft</Label>
      </Button>
    </Cell>
  </LayoutGrid>
</section>