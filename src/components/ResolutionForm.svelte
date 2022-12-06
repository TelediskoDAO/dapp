<script lang="ts">
  import { onMount } from "svelte";
  import Button, { Label } from "@smui/button";
  import Radio from "@smui/radio";
  import CircularProgress from "@smui/circular-progress";
  import Textfield from "@smui/textfield";
  import LayoutGrid, { Cell, InnerGrid } from "@smui/layout-grid";

  import {
    currentResolution,
    formState,
    resetForm,
  } from "../state/resolutions/form";
  import type { MonthlyRewardsUserData, ResolutionTypeEntity } from "../types";
  import { graphQLClient } from "../net/graphQl";
  import { getResolutionTypesQuery } from "../graphql/get-resolution-types.query";
  import { acl } from "../state/resolutions";
  import Alert from "./Alert.svelte";
  import DaoUser from "./DaoUser.svelte";
  import { RESOLUTION_TYPES_TEXTS } from "../i18n/resolution";

  function init(el: HTMLElement) {
    el.querySelector("input")?.focus();
  }

  const noop = () => {};

  export let createBy = "";
  export let createdOn = "";
  export let disabledUpdate = true;
  export let isMonthlyRewards = false;
  export let handleSave = (vetoTypeId: string | null) => {};
  export let handleApprove = noop;
  export let handleReject = noop;
  export let handleExport = noop;
  export let executionPayload: MonthlyRewardsUserData[] | null = null;

  let disabled = false;

  let resolutionTypes: ResolutionTypeEntity[] = [];

  onMount(async () => {
    const {
      resolutionTypes: resolutionsTypesData,
    }: {
      resolutionTypes: ResolutionTypeEntity[];
    } = await graphQLClient.request(getResolutionTypesQuery);
    resolutionTypes = [
      ...resolutionsTypesData
        .filter(
          (resolutionType) =>
            !RESOLUTION_TYPES_TEXTS[resolutionType.name] ||
            !RESOLUTION_TYPES_TEXTS[resolutionType.name].disabled
        )
        .reduce((all, current) => {
          if (current.name === "routine") {
            return [
              ...all,
              current,
              {
                id: "routineVeto",
                name: "routineVeto",
              },
            ] as ResolutionTypeEntity[];
          }
          return [...all, current];
        }, [] as ResolutionTypeEntity[]),
    ];

    const easyMDE = new window.EasyMDE({
      element: document.getElementById("editor"),
      spellChecker: false,
      minHeight: "350px",
      maxHeight: "350px",
      status: false,
      ...(isMonthlyRewards && { toolbar: false }),
    });

    easyMDE.value($currentResolution.content || "");
    easyMDE.codemirror.on("change", () => {
      $currentResolution.content = easyMDE.value();
    });

    if (isMonthlyRewards) {
      easyMDE.codemirror.setOption("readOnly", true);
      easyMDE.togglePreview();
    }

    return () => {
      easyMDE.cleanup();
      resetForm();
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
  }

  function onSave() {
    const vetoTypeId =
      $currentResolution.typeId === "routineVeto"
        ? resolutionTypes.find((type) => type.name === "routine")?.id || null
        : null;
    handleSave(vetoTypeId);
  }
</script>

<section class="section">
  <LayoutGrid>
    <Cell span={12}>
      {#if isMonthlyRewards}
        <Alert title="Heads up" type="warning">
          This resolution is for the monthly tokens allocation and therefore it
          can't be modified. Please, read the text carefully and make sure the
          resolution for the token allocation of the previous month hasn't
          already been created
        </Alert>
      {/if}
    </Cell>

    <Cell span={12}>
      <h1>
        {createBy
          ? `Editing: ${$currentResolution.title}`
          : `New Resolution${
              ($currentResolution.title || "").trim() !== "" ? ":" : ""
            } ${$currentResolution.title}`}
      </h1>
      {#if createBy}
        <DaoUser
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
              disabled={isMonthlyRewards}
            />
          </div>
        </Cell>
      </InnerGrid>
    </Cell>
    <Cell span={12}>
      <InnerGrid>
        <Cell
          span={12}
          class={isMonthlyRewards
            ? "editor-wrapper editor-wrapper__readonly"
            : "editor-wrapper"}
        >
          <textarea id="editor" readonly={isMonthlyRewards} />
        </Cell>
      </InnerGrid>
    </Cell>
    {#if resolutionTypes?.length > 0}
      <Cell span={12} class="types-wrapper">
        <InnerGrid>
          <Cell span={8}>
            {#each resolutionTypes as resolutionType}
              <div
                class="resolution-type"
                class:is--selected={$currentResolution.typeId ===
                  resolutionType.id}
              >
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>
                  <Radio
                    bind:group={$currentResolution.typeId}
                    value={resolutionType.id}
                    disabled={isMonthlyRewards}
                  />
                  <div class="resolution-type__labels">
                    <h3>
                      {RESOLUTION_TYPES_TEXTS[resolutionType.name]?.title ||
                        resolutionType.name}
                    </h3>
                    <span
                      >{@html RESOLUTION_TYPES_TEXTS[resolutionType.name]
                        ?.description ||
                        "** Testing purposes resolution **"}</span
                    >
                  </div>
                </label>
              </div>
            {/each}
          </Cell>
        </InnerGrid>
      </Cell>
    {/if}
    {#if executionPayload}
      <Cell span={8}>
        <div class="execution-payload">
          <h4>Execution payload</h4>
          <Alert type="info"
            >This payload will be used to automatically mint the tokens for the
            contributors</Alert
          >
          <ul>
            {#each executionPayload as userData}
              <li>
                <DaoUser
                  ethereumAddress={userData.address}
                  hasBg
                  title={`<b>${userData.tokens} TT</b> to`}
                  size="sm"
                />
              </li>
            {/each}
          </ul>
        </div>
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
          <Button variant="outlined" {disabled} on:click={onSave}>
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
          <Cell span={12} class="actions-bar">
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
              <Button
                variant="outlined"
                class="recjet-btn"
                disabled={disabled || !disabledUpdate}
                on:click={handleReject}
              >
                <Label>Reject</Label>
              </Button>
            {/if}
          </Cell>
        {/if}
      {/if}
      {#if !createBy}
        <Alert
          title="Heads up"
          message="Once a draft resolution is created, the email notifying the managing board should arrive within max 15 mins"
        />
      {/if}
      {#if !createBy && !$formState.loading && !$formState.awaitingConfirmation}
        <Button variant="outlined" {disabled} on:click={onSave}>
          <Label>Save pre draft</Label>
        </Button>
      {/if}
    </Cell>
  </LayoutGrid>
</section>

<style>
  .resolution-type {
    border: 1px solid var(--color-gray-1);
    border-bottom: none;
    color: var(--color-gray-8);
  }

  .resolution-type:hover {
    color: var(--color-gray-9);
    box-shadow: 0 0 3px 0 inset var(--color-gray-5);
  }

  .resolution-type label:active {
    position: relative;
    top: 1px;
  }

  .resolution-type.is--selected {
    background-color: var(--color-gray-1);
    box-shadow: 0 0 3px 0 inset var(--color-gray-5);
    color: var(--color-gray-10);
  }

  .resolution-type:first-child {
    border-radius: 4px 4px 0 0;
  }

  .resolution-type:last-child {
    border-radius: 0 0 4px 4px;
    border-bottom: 1px solid var(--color-gray-1);
  }

  .resolution-type label {
    padding: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .resolution-type label span {
    display: block;
  }

  .resolution-type__labels {
    padding-left: 0.2rem;
  }

  .resolution-type h3 {
    margin: 0;
    padding: 0;
  }

  .execution-payload {
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid var(--color-gray-5);
    border-radius: 8px;
  }

  .execution-payload h4 {
    margin: 0;
    padding: 0;
    margin-bottom: 2rem;
  }

  .execution-payload ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .execution-payload ul li:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  :global(.field) {
    width: 100%;
  }

  :global(.field input) {
    box-shadow: none;
  }

  :global(.editor-wrapper) {
    position: relative;
    z-index: 11;
    height: 400px;
    padding-bottom: 2rem;
  }

  :global(.editor-wrapper__readonly .CodeMirror) {
    opacity: 0.6;
    border-radius: 4px;
  }

  :global(.editor-wrapper i.separator) {
    top: 6px;
    position: relative;
  }

  :global(.types-wrapper) {
    position: relative;
    z-index: 1;
  }

  :global(.types-wrapper > div) {
    margin-top: 4rem;
  }

  :global(.actions-bar) {
    position: relative;
  }
  :global(.recjet-btn) {
    position: absolute !important;
    right: 0;
  }

  :global(.recjet-btn:not(:disabled)) {
    background-color: var(--ruby-red) !important;
    color: white !important;
  }

  :global(.ql-editor p),
  :global(.ql-editor ul) {
    margin-bottom: 1rem !important;
  }
</style>
