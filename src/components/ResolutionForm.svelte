<script lang="ts">
  import Select, { Option } from "@smui/select"
  import Button, { Label, Group } from "@smui/button"
  import CircularProgress from "@smui/circular-progress"
  import Textfield from "@smui/textfield"
  import HelperText from '@smui/textfield/helper-text';
  import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';
  import { emptyResolution, currentResolution, RESOLUTION_TYPES } from "../state/resolutions/new";
  import { onDestroy } from "svelte";

  function init(el: HTMLElement) {
    el.querySelector('input').focus();
  }

  const noop = () => {};

  export let editMode = false;
  export let loading = false;
  export let awaitingConfirmation = false;
  export let disabledUpdate = true;
  export let handleSave = noop;
  export let handleApprove = noop;
  export let handleExport = noop;

  let disabled = false;

  $: {
    const checkDisabledFields = [$currentResolution.title.trim(), $currentResolution.content.trim(), $currentResolution.type]
    disabled = checkDisabledFields.filter(Boolean).length < checkDisabledFields.length
  }

  onDestroy(() => {
    $currentResolution = { ...emptyResolution }
  })

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
    background-color: rgba(255, 255, 255, .7);
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
        <div style="width: 200px; margin-left: 16px;">
          <div class="tenor-gif-embed" data-postid="10743923" data-share-method="host" data-aspect-ratio="1.15741" data-width="100%">
            <a href="https://tenor.com/view/ethereum-eth-homer-simpson-cryptocurrency-altcoins-gif-10743923">Ethereum Homer Simpson GIF</a>from <a href="https://tenor.com/search/ethereum-gifs">Ethereum GIFs</a>
          </div>
          <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
        </div>
      {:else}
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      {/if}
    </div>
  {/if}
  <LayoutGrid>
    <Cell span={12}>
      <h1>{editMode ? `Editing: ${$currentResolution.title}` : `New Resolution: ${$currentResolution.title}`}</h1>
    </Cell>
    
    <Cell span={12}>
      <InnerGrid>
        <Cell span={6}>
          <div use:init>
            <Textfield class="field" bind:value={$currentResolution.title} label="Resolution Title" />
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
            bind:value={$currentResolution.content}
            label="Resolution Content"
          >
            <HelperText slot="helper">Markdown supported</HelperText>
          </Textfield>
        </Cell>
      </InnerGrid>
    </Cell>
    <Cell span={12}>
      <InnerGrid>
        <Cell span={3}>
          <Select class="field" bind:value={$currentResolution.type} label="Resolution Type">
            {#each Object.entries(RESOLUTION_TYPES) as resolutionType}
              <Option value={resolutionType[0]}>{resolutionType[1]}</Option>
            {/each}
          </Select>
        </Cell>
      </InnerGrid>
    </Cell>
    <Cell span={3}>
      {#if editMode}
        <Group variant="raised">
          <Button variant="raised" disabled={disabled || disabledUpdate} on:click={handleSave}>
            <Label>Update</Label>
          </Button>
          <Button variant="raised" disabled={disabled} on:click={handleExport}>
            <Label>Export</Label>
          </Button>
          <Button variant="raised" disabled={disabled} on:click={handleApprove}>
            <Label>Approve</Label>
          </Button>
        </Group>
      {:else}
        <Button variant="raised" disabled={disabled} on:click={handleSave}>
          <Label>Save pre draft</Label>
        </Button>
      {/if}
    </Cell>
  </LayoutGrid>
</section>