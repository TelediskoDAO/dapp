<script type="ts">
  import { onDestroy, onMount } from "svelte";

  import { currentTimestamp } from "../state/resolutions";

  let interval = null;

  onMount(async () => {
    interval = setInterval(() => {
      $currentTimestamp = +new Date();
    }, 5000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>
