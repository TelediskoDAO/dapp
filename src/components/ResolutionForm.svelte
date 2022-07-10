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
  import Quill from "quill";
  import QuillMarkdown from "quilljs-markdown";
  import "quilljs-markdown/dist/quilljs-markdown-common-style.css";
  import Turndown from "turndown";
  import { marked } from "marked";
  import { sanitize } from "dompurify";

  import {
    currentResolution,
    formState,
    resetForm,
  } from "../state/resolutions/form";
  import type { ResolutionTypeEntity } from "../types";
  import { graphQLClient } from "../net/graphQl";
  import { getResolutionTypesQuery } from "../graphql/get-resolution-types.query";
  import { acl } from "../state/resolutions";
  import Alert from "./Alert.svelte";
  import ResolutionUser from "./ResolutionUser.svelte";

  marked.setOptions({
    gfm: true,
  });

  function init(el: HTMLElement) {
    el.querySelector("input").focus();
  }

  const noop = () => {};

  export let createBy = "";
  export let createdOn = "";
  export let disabledUpdate = true;
  export let handleSave = noop;
  export let handleApprove = noop;
  export let handleExport = noop;

  let disabled = false;
  let resolutionTypes: ResolutionTypeEntity[];
  let selectedType: ResolutionTypeEntity = null;
  let prevSelectedTypeId: string;

  onMount(async () => {
    const {
      resolutionTypes: resolutionsTypesData,
    }: {
      resolutionTypes: ResolutionTypeEntity[];
    } = await graphQLClient.request(getResolutionTypesQuery);
    resolutionTypes = resolutionsTypesData;

    const quill = new Quill("#editor", {
      theme: "snow",
    });

    const quillMarkdown = new QuillMarkdown(quill, {});

    const turndownService = new Turndown();
    const sanitizedHtml = sanitize(marked.parse($currentResolution.content), {
      USE_PROFILES: { html: true },
    });

    quill.clipboard.dangerouslyPasteHTML(sanitizedHtml);

    const textChangeHandler = () => {
      const html = quill.root.innerHTML;
      const markdown = turndownService.turndown(html);

      $currentResolution.content = markdown;
    };

    quill.on("text-change", textChangeHandler);

    return () => {
      resetForm();
      quillMarkdown.destroy();
      quill.off("text-change", textChangeHandler);
    };
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
  <LayoutGrid>
    <Cell span={12}>
      <h1>
        {createBy
          ? `Editing: ${$currentResolution.title}`
          : `New Resolution: ${$currentResolution.title}`}
      </h1>
      {#if createBy}
        <ResolutionUser
          ethereumAddress={createBy}
          title={`Created ${createdOn} by`}
          hasBg
        />
      {/if}
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
        <Cell span={12} class="editor-wrapper">
          <div id="editor" />
          <HelperText slot="helper">Markdown supported</HelperText>
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
    <Cell span={6}>
      {#if $formState.loading || $formState.awaitingConfirmation}
        <div class="progress">
          {#if $formState.awaitingConfirmation}
            <Alert
              message="Awaiting for the transaction to be put on a block"
            />
          {/if}
          <div>
            <CircularProgress
              style="height: 32px; width: 32px;"
              indeterminate
            />
          </div>
        </div>
      {/if}
      {#if createBy && !$formState.loading && !$formState.awaitingConfirmation}
        {#if !disabledUpdate}
          <Button variant="outlined" {disabled} on:click={handleSave}>
            <Label>Update</Label>
          </Button>
          <Alert
            type="info"
            message="Heads up: Whenever you edit a resolution, you need to update it before exporting/approving it"
            marginTop
          />
        {:else}
          <Alert
            title="Heads up"
            message="Once a draft resolution is approved, the email notifying the shareholders should arrive within max 15 mins"
          />
          <Button
            variant="outlined"
            disabled={disabled || !disabledUpdate}
            on:click={handleExport}
          >
            <Label>Export to pdf</Label>
          </Button>
          {#if $acl.canApprove}
            <Button
              variant="outlined"
              disabled={disabled || !disabledUpdate}
              on:click={handleApprove}
            >
              <Label>Approve</Label>
            </Button>
          {/if}
        {/if}
      {/if}
      {#if !createBy}
        <Alert
          title="Heads up"
          message="Once a draft resolution is created, the email notifying the managing board should arrive within max 15 mins"
        />
      {/if}
      {#if !createBy && !$formState.loading && !$formState.awaitingConfirmation}
        <Button variant="outlined" {disabled} on:click={handleSave}>
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

  :global(.editor-wrapper) {
    height: 400px;
    padding-bottom: 2rem;
  }

  :global(.ql-editor p),
  :global(.ql-editor ul) {
    margin-bottom: 1rem !important;
  }
</style>
