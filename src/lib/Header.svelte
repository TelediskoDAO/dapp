<script lang="ts">
  import ConnectWallet from "./ConnectWallet.svelte";
  import {
    signer,
    signerAddress,
    balance,
    networkName,
  } from "../stores/wallet";
  import { formatEther } from "ethers/lib/utils";
</script>

<ConnectWallet />
{#if $signer}
  <ul>
    <li>Address: {$signerAddress}</li>
    <li>Network: {$networkName}</li>
    {#if $balance}
      <li>Balance: {formatEther($balance)} Eth</li>
    {/if}
  </ul>
{/if}
