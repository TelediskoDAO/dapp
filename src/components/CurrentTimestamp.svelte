<script type="ts">
  import { onMount } from "svelte";

  import { currentTimestamp } from "../state/resolutions";

  let interval = null;
  export let intervalMs = 5000;

  onMount(() => {
    interval = setInterval(() => {
      $currentTimestamp = Date.now();
    }, intervalMs);

    return () => clearInterval(interval);
  });
</script>
