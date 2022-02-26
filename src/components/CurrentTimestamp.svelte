<script type="ts">
  import { onDestroy, onMount } from "svelte";

  import { currentTimestamp } from "../state/resolutions";

  let interval = null;
  export let intervalMs = 5000;

  onMount(async () => {
    interval = setInterval(() => {
      $currentTimestamp = +new Date();
    }, intervalMs);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>
