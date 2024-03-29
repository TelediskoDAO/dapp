<script lang="ts">
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import { Icon, Svg } from "@smui/common";
  import { mdiInformationOutline } from "@mdi/js";

  import { agent, usersWithEthereumAddress } from "../state/odoo";
  import { signerAddress } from "../stores/wallet";
  import type { OdooUserTransformed } from "../types";
  import Tag from "./Tag.svelte";

  export let ethereumAddress: string;
  export let title: string | null = null;
  export let inline = false;
  export let hasBg = false;
  export let hideInfo = false;
  export let isBold = false;
  export let size: "sm" | "md" | "lg" = "md";
  export let shortAddressWhileLoading = false;
  export let shortAddress = false;

  let userDetails: OdooUserTransformed | null = null;
  $: {
    if ($usersWithEthereumAddress) {
      userDetails =
        $usersWithEthereumAddress[ethereumAddress?.toLowerCase()] || null;
    }
  }
</script>

{#if inline}
  <span class="inline-flex" class:inline-bold={isBold}>
    {#if userDetails}
      {userDetails.displayName}
    {:else}
      <span
        >{shortAddressWhileLoading
          ? `${ethereumAddress.slice(0, 8)}...`
          : ethereumAddress}</span
      >
      {#if !hideInfo && $agent}
        <Wrapper>
          <span class="icon-wrapper">
            <Icon component={Svg} viewBox="0 0 24 24">
              <path fill="currentColor" d={mdiInformationOutline} />
            </Icon>
          </span>
          <Tooltip yPos="above"
            >It looks this address is not mapped with odoo data</Tooltip
          >
        </Wrapper>
      {/if}
    {/if}
    {#if $signerAddress?.toLowerCase() === ethereumAddress?.toLowerCase() && !hideInfo}
      <Tag label="you" size={size === "sm" ? "xs" : "sm"} />
    {/if}
  </span>
{:else}
  <div class="wrapper wrapper--{size}" class:wrapper--has-bg={hasBg}>
    {#if title}
      <h4 class="dao-user-title">{@html title}</h4>
    {/if}
    <div class="dao-user">
      {#if userDetails}
        <img
          alt={userDetails.displayName}
          src="data:image/jpeg;charset=utf-8;base64,{userDetails.image}"
        />
      {:else}
        <div class="unknown-user-placeholder" />
      {/if}
      <div>
        <div class="dao-user__name">
          <span>
            {userDetails?.displayName || "Unknown user"}
            {#if !hideInfo && !userDetails && $agent}
              <Wrapper>
                <span class="icon-wrapper">
                  <Icon component={Svg} viewBox="0 0 24 24">
                    <path fill="currentColor" d={mdiInformationOutline} />
                  </Icon>
                </span>
                <Tooltip yPos="above"
                  >It looks this address is not mapped with odoo data</Tooltip
                >
              </Wrapper>
            {/if}
          </span>
          {#if $signerAddress?.toLowerCase() === ethereumAddress.toLowerCase()}
            <Tag label="you" size={size === "sm" ? "xs" : "sm"} />
          {/if}
          <slot />
        </div>
        <div class="dao-user__eth">
          {shortAddress ? `${ethereumAddress.slice(0, 8)}...` : ethereumAddress}
        </div>
        <slot name="after" />
      </div>
    </div>
  </div>
{/if}

<style>
  .inline-flex {
    display: inline-flex;
    align-items: center;
  }

  .inline-bold {
    font-weight: bold;
  }
  .inline-flex :global(.tag) {
    margin-left: 0.3rem;
  }
  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    margin-left: 0.2rem;
    color: var(--blue-sapphire);
    cursor: help;
  }
  .icon-wrapper :global(svg) {
    width: 16px;
    height: 16px;
  }
  .wrapper--has-bg {
    padding: 1rem;
    background-color: #fafafa;
    border-radius: 4px;
  }
  .dao-user-title {
    margin: 0;
    padding: 0;
    margin-bottom: 0.4rem;
    font-size: 14px;
    color: var(--color-gray-7);
    font-weight: 300;
  }
  .dao-user-title :global(b) {
    color: var(--color-gray-9);
  }
  .dao-user {
    display: flex;
    align-items: center;
  }
  .dao-user img,
  .unknown-user-placeholder {
    border-radius: 50%;
    width: 48px;
    height: 48px;
    margin-right: 1rem;
    background-color: var(--color-gray-1);
    text-indent: -99999px;
  }
  .unknown-user-placeholder {
    background-color: var(--color-gray-1);
  }

  .dao-user__name {
    display: flex;
    align-items: center;
    font-size: large;
    margin-bottom: 0.2rem;
  }
  .dao-user__name :global(.tag) {
    margin-right: 0.3rem;
  }

  .dao-user__name > span {
    display: inline-flex;
  }
  .dao-user__name > span:first-child {
    margin-right: 0.3rem;
  }
  .dao-user__eth {
    font-size: small;
    color: var(--color-gray-7);
  }

  .wrapper--sm .dao-user__name {
    font-size: 12px;
    margin-bottom: 0.1rem;
  }
  .wrapper--sm .dao-user__eth {
    font-size: 11px;
  }
  .wrapper--sm .dao-user img,
  .wrapper--sm .unknown-user-placeholder {
    width: 32px;
    height: 32px;
    margin-right: 0.6rem;
  }

  @media print {
    img {
      -webkit-print-color-adjust: exact;
    }
  }
</style>
