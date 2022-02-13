<script>
  import { onMount } from "svelte";
  import SvelteMarkdown from "svelte-markdown";
  import { location } from "svelte-spa-router";

  export let title;
  export let content;
  export let type;
  export let state;

  onMount(() => {
    if (/\/print$/.test($location)) {
      window.print();
      window.close();
    }
  });
</script>

<div class="resolution-view">
  <h1>{title}</h1>
  <SvelteMarkdown source={content} />

  <div><small><em>Resolution type: {type}</em></small></div>
  <small><em>Resolution state: {state}</em></small>
</div>

<style>
  .resolution-view {
    padding: 40px;
  }
</style>
