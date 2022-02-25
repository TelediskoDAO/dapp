<script>
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { location } from "svelte-spa-router";
  import { RESOLUTION_STATES } from "../helpers/resolutions";
  import VotingWidget from "./VotingWidget.svelte";

  export let title;
  export let content;
  export let type;
  export let state;
  export let isNegative;
  let isPrint;

  onMount(() => {
    isPrint = /\/print$/.test($location);
    if (isPrint) {
      window.print();
      window.close();
    }
  });
</script>

<div class="resolution-view">
  <h1>{title}</h1>
  <SvelteMarkdown source={content} />

  <div><small><em>Resolution type: {type}</em></small></div>
  <div><small><em>Resolution state: {state}</em></small></div>
  {#if isNegative}
    <small><em>Negative resolution</em></small>
  {/if}
  {#if !isPrint && state === RESOLUTION_STATES.VOTING}
    <div class="voting">
      <VotingWidget />
    </div>
  {/if}
</div>

<style>
  .resolution-view {
    padding: 40px;
  }

  .voting {
    width: 30%;
  }
</style>
