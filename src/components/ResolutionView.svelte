<script>
  import SvelteMarkdown from 'svelte-markdown'

  export let title
  export let content
  export let type
  export let state
</script>

<style>
  .resolution-view {
    padding: 40px;
  }
</style>

<div class='resolution-view'>
  <h1>{title}</h1>
  <SvelteMarkdown source={content} />

  <div><small><em>Resolution type: {type}</em></small></div>
  <small><em>Resolution state: {state}</em></small>
</div>