<script lang="ts">
  import { onDestroy } from "svelte";
  import Select, { Option } from "@smui/select";
  import Button, { Label, Group } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import LayoutGrid, { Cell, InnerGrid } from "@smui/layout-grid";
  import FormField from "@smui/form-field";
  import Checkbox from "@smui/checkbox";

  import { emptyResolution, currentResolution } from "../state/resolutions/new";
  import { resolutionContractTypes } from "../state/eth";
  import type { ResolutionManager } from "../../contracts/typechain/ResolutionManager";

  function init(el: HTMLElement) {
    el.querySelector("input").focus();
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
  let resolutionTypes = [];
  let selectedType: ResolutionManager.ResolutionTypeStructOutput | null = null;

  $: {
    const checkDisabledFields = [
      $currentResolution.title.trim(),
      $currentResolution.content.trim(),
      $currentResolution.type !== null,
    ];
    disabled =
      checkDisabledFields.filter(Boolean).length < checkDisabledFields.length;

    if (typeof $resolutionContractTypes !== "undefined") {
      resolutionTypes = $resolutionContractTypes.map(([type], value) => ({
        label: type,
        value,
      }));

      selectedType = $currentResolution.type
        ? $resolutionContractTypes[$currentResolution.type]
        : null;
    }
  }

  console.log("$currentResolution: ", $currentResolution);

  onDestroy(() => {
    $currentResolution = { ...emptyResolution };
  });

  currentResolution.subscribe((c) => {
    console.log("updated ", c);
  });
</script>

<section class="section">
  {#if loading}
    <div class="progress">
      {#if awaitingConfirmation}
        Awaiting for the transaction to be put on a block... hold tight!
        <div style="width: 200px; margin-left: 16px;">
          <div
            class="tenor-gif-embed"
            data-postid="10743923"
            data-share-method="host"
            data-aspect-ratio="1.15741"
            data-width="100%"
          >
            <a
              href="https://tenor.com/view/ethereum-eth-homer-simpson-cryptocurrency-altcoins-gif-10743923"
              >Ethereum Homer Simpson GIF</a
            >from
            <a href="https://tenor.com/search/ethereum-gifs">Ethereum GIFs</a>
          </div>
          <script
            type="text/javascript"
            async
            src="https://tenor.com/embed.js"></script>
        </div>
      {:else}
        <CircularProgress style="height: 32px; width: 32px;" indeterminate />
      {/if}
    </div>
  {/if}
  <LayoutGrid>
    <Cell span={12}>
      <h1>
        {editMode
          ? `Editing: ${$currentResolution.title}`
          : `New Resolution: ${$currentResolution.title}`}
      </h1>
    </Cell>

    <Cell span={12}>
      <InnerGrid>
        <Cell span={6}>
          <div use:init>
            <Textfield
              class="field"
              bind:value={$currentResolution.title}
              label="Resolution Title"
            />
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
    {#if resolutionTypes.length > 0}
      <Cell span={12}>
        <InnerGrid>
          <Cell span={3}>
            <Select
              class="field"
              bind:value={$currentResolution.type}
              label="Resolution Type"
            >
              {#each resolutionTypes as resolutionType}
                <Option value={resolutionType.value}
                  >{resolutionType.label}</Option
                >
              {/each}
            </Select>
            {#if selectedType?.canBeNegative}
              <FormField>
                <Checkbox bind:checked={$currentResolution.isNegative} />
                <span slot="label"> Negative resolution. </span>
              </FormField>
            {/if}
          </Cell>
        </InnerGrid>
      </Cell>
    {/if}
    <Cell span={3}>
      {#if editMode}
        <Group variant="raised">
          <Button
            variant="raised"
            disabled={disabled || disabledUpdate}
            on:click={handleSave}
          >
            <Label>Update</Label>
          </Button>
          <Button variant="raised" {disabled} on:click={handleExport}>
            <Label>Export</Label>
          </Button>
          <Button variant="raised" {disabled} on:click={handleApprove}>
            <Label>Approve</Label>
          </Button>
        </Group>
      {:else}
        <Button variant="raised" {disabled} on:click={handleSave}>
          <Label>Save pre draft</Label>
        </Button>
      {/if}
    </Cell>
  </LayoutGrid>
</section>

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
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(3px);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
