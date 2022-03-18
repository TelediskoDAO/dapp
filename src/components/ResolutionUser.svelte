<script lang="ts">
  import Tooltip, { Wrapper } from "@smui/tooltip";
  import { Icon } from "@smui/common";
  import { Svg } from "@smui/common/elements";
  import { mdiInformationOutline } from "@mdi/js";

  import { signerAddress } from "../state/eth";
  import { usersWithEthereumAddress } from "../state/odoo";
  import type { OdooUserTransformed } from "../types";
  import Tag from "./Tag.svelte";

  export let ethereumAddress: string;
  export let title: string = null;
  export let inline = false;
  export let hasBg = false;
  export let size: "sm" | "md" | "lg" = "md";

  let userDetails: OdooUserTransformed = null;

  $: {
    if ($usersWithEthereumAddress) {
      userDetails =
        $usersWithEthereumAddress[ethereumAddress.toLowerCase()] || null;
    }
  }
</script>

{#if inline}
  <span class="inline-flex">
    {#if userDetails}
      {userDetails.displayName}
    {:else}
      <span>{ethereumAddress} </span>
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
    {#if $signerAddress?.toLowerCase() === ethereumAddress.toLowerCase()}
      <Tag label="you" size={size === "sm" ? "xs" : "sm"} />
    {/if}
  </span>
{:else}
  <div class={`wrapper ${hasBg ? "wrapper--has-bg" : ""} wrapper--${size}`}>
    {#if title}
      <h4 class="resolution-user-title">{title}</h4>
    {/if}
    {#if userDetails}
      <div class="resolution-user">
        <img
          alt={userDetails.displayName}
          src="data:image/jpeg;base64,{userDetails.image}"
        />
        <div>
          <div class="resolution-user__name">
            <span>{userDetails.displayName}</span>
            {#if $signerAddress?.toLowerCase() === ethereumAddress.toLowerCase()}
              <Tag label="you" size={size === "sm" ? "xs" : "sm"} />
            {/if}
          </div>
          <div class="resolution-user__eth">{userDetails.ethereumAddress}</div>
        </div>
      </div>
    {:else}
      <span class="inline-flex">
        <span>{ethereumAddress} </span>
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
        {#if $signerAddress?.toLowerCase() === ethereumAddress.toLowerCase()}
          <Tag label="you" size={size === "sm" ? "xs" : "sm"} />
        {/if}
      </span>
    {/if}
  </div>
{/if}

<style>
  .inline-flex {
    display: inline-flex;
    align-items: center;
  }
  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    margin: 0 0.2rem;
    margin-right: 0.5rem;
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
  .resolution-user-title {
    margin: 0;
    padding: 0;
    margin-bottom: 0.4rem;
    font-size: 14px;
    color: var(--color-gray-7);
    font-weight: 300;
  }
  .resolution-user {
    display: flex;
    align-items: center;
  }
  .resolution-user img {
    border-radius: 50%;
    width: 48px;
    height: 48px;
    margin-right: 1rem;
  }
  .resolution-user__name {
    display: flex;
    align-items: center;
    font-size: large;
    margin-bottom: 0.2rem;
  }
  .resolution-user__name > span:first-child {
    margin-right: 0.3rem;
  }
  .resolution-user__eth {
    font-size: small;
    color: var(--color-gray-7);
  }

  .wrapper--sm .resolution-user__name {
    font-size: 12px;
    margin-bottom: 0.1rem;
  }
  .wrapper--sm .resolution-user__eth {
    font-size: 11px;
    margin-top: -0.4rem;
  }
  .wrapper--sm .resolution-user img {
    width: 32px;
    height: 32px;
    margin-right: 0.6rem;
  }
</style>
