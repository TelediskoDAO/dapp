<script>
  import { updateAvailable } from "src/state/runtime";
</script>

<style>
  div {
    z-index: 1000;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    text-align: right;
    background-color: #d3f7ff;
    border-top: var(--size-xxs) solid rgba(0, 0, 0, 0.1);
  }
  button {
    /* https://codepen.io/nohoid/pen/kIfto */
    background: linear-gradient(
      124deg,
      #ff2400,
      #e81d1d,
      #e8b71d,
      #e3e81d,
      #1de840,
      #1ddde8,
      #2b1de8,
      #dd00f3,
      #dd00f3
    );
    background-size: 1800% 1800%;
    animation: rainbow 18s ease infinite;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
    font-weight: bold;
    font-size: var(--font-l);
    color: white;
    padding: var(--size-xs) var(--size-s);
    border: var(--size-xxs) solid rgba(0, 0, 0, 0.2);
  }

  @keyframes rainbow {
    0% {
      background-position: 0% 82%;
    }
    50% {
      background-position: 100% 19%;
    }
    100% {
      background-position: 0% 82%;
    }
  }
</style>

{#if $updateAvailable}
  <div>
    <section>
      New version available
      <button on:click={() => $updateAvailable()}>Update App</button>
    </section>
  </div>
{/if}
