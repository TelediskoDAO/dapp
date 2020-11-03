<script>
  export let key = null;
  export let showOverride = null;
  export let show = true;

  const storageKey = key !== null ? `widget:foldable:show:${key}` : null;

  if(storageKey) {
    const previousValue = JSON.parse(localStorage.getItem(storageKey));
    if (previousValue !== null) {
      show = previousValue;
    }
  }

  if (showOverride !== null) {
    show = showOverride;
  }

  function handleShow() {
    show = !show;

    if(storageKey) {
      localStorage.setItem(storageKey, show);
    }
  }
</script>

<style>
  .header {
    cursor: pointer;
  }
</style>

<div>
  <div class="header" on:click={handleShow}>
    <slot name="header" visible={show}/>
  </div>
  {#if show}
    <slot name="body" />
  {/if}
</div>
