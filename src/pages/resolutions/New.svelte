<script>
  import Select, { Option } from "@smui/select"
  import Button, { Label } from "@smui/button"
  import CircularProgress from "@smui/circular-progress"
  import Textfield from "@smui/textfield"
  import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';
  import { push } from 'svelte-spa-router'
  
  import { newResolution, RESOLUTION_TYPES } from "../../state/resolutions/new";
  import { title } from "src/state/runtime";
  import { signer } from "../../state/eth";
  import networks from "../../contracts/networks.json";
  import { ResolutionMock__factory } from "../../contracts";

  title.set("Resolutions");

  function init(el) {
    el.querySelector('input').focus();
  }

  let loading = false
  let error = null
  let receipt = null
  let awaitingConfirmation = false

  $:
    disabled = [
      $newResolution.type,
      $newResolution.content.trim(),
      $newResolution.title.trim()
    ].filter(Boolean).length < Object.keys($newResolution).length

  async function handleContractPreDraft() {
    if (!$signer) {
      return push('/connect/odoo')
    }
    error = null
    receipt = null
    loading = true
    awaitingConfirmation = false
    const chainId = await $signer.getChainId();
    const address = networks[chainId.toString()]["ResolutionMock"];
    const contract = ResolutionMock__factory.connect(address, $signer);

    try {
      const tx = await contract.createResolution('todo', 0) // sign (metamask popup will appear) + send (transaction will be in the mempull)
      awaitingConfirmation = true
      receipt = await tx.wait() // waiting for the transaction to be put on a block
    } catch (err) {
      error = err.message
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
  {#if error}
    <p>Oops, it looks there's been an error: {error}</p>
  {/if}
  <LayoutGrid>
    {#if receipt?.blockHash}
      <Cell span={12}>
        <h1>Resolution draft created: {receipt.blockHash}</h1>
      </Cell>
    {:else}
      <Cell span={12}>
        <h1>New Resolution</h1>
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