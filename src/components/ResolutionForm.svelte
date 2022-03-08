<script lang="ts">
  import { onMount } from "svelte";
  import Select, { Option } from "@smui/select";
  import Button, { Label, Group } from "@smui/button";
  import CircularProgress from "@smui/circular-progress";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import LayoutGrid, { Cell, InnerGrid } from "@smui/layout-grid";
  import FormField from "@smui/form-field";
  import Checkbox from "@smui/checkbox";
  import Tooltip, { Wrapper } from "@smui/tooltip";

  import {
    currentResolution,
    formState,
    resetForm,
  } from "../state/resolutions/form";
  import type { ResolutionTypeEntity } from "../types";
  import { graphQLClient } from "../net/graphQl";
  import { getResolutionTypesQuery } from "../graphql/get-resolution-types.query";
  import { acl } from "../state/resolutions";

  function init(el: HTMLElement) {
    el.querySelector("input").focus();
  }

  const noop = () => {};

  export let editMode = false;
  export let disabledUpdate = true;
  export let handleSave = noop;
  export let handleApprove = noop;
  export let handleExport = noop;

  let disabled = false;
  let resolutionTypes: ResolutionTypeEntity[];
  let selectedType: ResolutionTypeEntity = null;
  let prevSelectedTypeId;

  onMount(async () => {
    const {
      resolutionTypes: resolutionsTypesData,
    }: {
      resolutionTypes: ResolutionTypeEntity[];
    } = await graphQLClient.request(getResolutionTypesQuery);
    resolutionTypes = resolutionsTypesData;

    return resetForm;
  });

  $: {
    const validTypeId = typeof $currentResolution.typeId === "string";
    const checkDisabledFields = [
      $currentResolution.title?.trim(),
      $currentResolution.content?.trim(),
      validTypeId,
    ];
    disabled =
      checkDisabledFields.filter(Boolean).length < checkDisabledFields.length;

    if (Array.isArray(resolutionTypes)) {
      selectedType = resolutionTypes.find(
        (resolutionType) => resolutionType.id === $currentResolution.typeId
      );
    }
    if (validTypeId && prevSelectedTypeId !== $currentResolution.typeId) {
      $currentResolution.isNegative = false;
    }
    prevSelectedTypeId = $currentResolution.typeId;
  }
</script>

<section class="section">
  {#if $formState.loading}
    <div class="progress">
      {#if $formState.awaitingConfirmation}
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
    {#if resolutionTypes?.length > 0}
      <Cell span={12}>
        <InnerGrid>
          <Cell span={3}>
            <Select
              class="field"
              bind:value={$currentResolution.typeId}
              label="Resolution Type"
            >
              {#each resolutionTypes as resolutionType}
                <Option value={resolutionType.id}>{resolutionType.name}</Option>
              {/each}
            </Select>
            <FormField
              style={!selectedType?.canBeNegative
                ? "display: none"
                : "display: flex"}
            >
              <Checkbox
                bind:checked={$currentResolution.isNegative}
                disabled={!selectedType?.canBeNegative}
              />
              <span slot="label">Negative resolution.</span>
            </FormField>
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
          <Wrapper>
            <span tabindex="0">
              <Button
                variant="raised"
                disabled={disabled || !disabledUpdate}
                on:click={handleExport}
              >
                <Label>Export</Label>
              </Button>
            </span>
            {#if disabled || !disabledUpdate}
              <Tooltip unbounded
                >It looks you need to update the resolution before exporting it</Tooltip
              >
            {/if}
          </Wrapper>
          {#if $acl.canApprove}
            <Wrapper>
              <span tabindex="0">
                <Button
                  variant="raised"
                  disabled={disabled || !disabledUpdate}
                  on:click={handleApprove}
                >
                  <Label>Approve</Label>
                </Button>
              </span>
              {#if disabled || !disabledUpdate}
                <Tooltip unbounded
                  >It looks you need to update the resolution before approving
                  it</Tooltip
                >
              {/if}
            </Wrapper>
          {/if}
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
