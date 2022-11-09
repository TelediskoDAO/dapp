<script>
  import { errors } from "../state/runtime";
</script>

{#if $errors.length}
  <section class="runtime-error">
    {#each $errors as error}
      <p><strong>Error:</strong> <code>{error.reason.message}</code></p>
    {/each}
    <p>
      What to do now? Would be nice if you can
      <a
        href="https://gitlab.com/teledisko/dao/-/issues/new"
        target="_blank"
        rel="noreferrer">create an issue</a
      >
      describing what happened. To keep using this app
      <button on:click={() => window.location.reload()}>reload the page</button
      >.
    </p>
  </section>
{/if}

<style>
  section {
    z-index: 1000;
    background-color: black;
    color: white;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }

  p {
    padding: var(--size-s);
    max-width: var(--max-width);
    margin: 0 auto;
  }

  strong {
    background-color: red;
    color: white;
    padding: var(--size-xs);
    font-weight: bold;
  }
</style>
