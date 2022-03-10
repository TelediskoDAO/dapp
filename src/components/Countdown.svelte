<script lang="ts">
  import { differenceInSeconds, format } from "date-fns";
  import { onMount } from "svelte";

  export let targetDate: Date;
  export let startCounterThresholdSeconds: number = 6000;
  export let prefixLabel: string;
  export let inline: boolean = true;
  let toDisplay = null;
  let afterPrefix = "";

  onMount(() => {
    let timeout = null;

    const setToDisplay = () => {
      const now = Date.now();
      const difference = differenceInSeconds(targetDate, now);
      if (difference <= startCounterThresholdSeconds) {
        const minutes = Math.floor(difference / 60);
        const seconds = difference % 60;
        toDisplay =
          minutes > 0
            ? `${("0" + minutes).slice(-2)}m:${("0" + seconds).slice(-2)}s`
            : `${("0" + seconds).slice(-2)}s`;
        afterPrefix = "in";
        timeout = setTimeout(setToDisplay, 1000);
        return;
      }
      toDisplay = format(targetDate, "dd LLL yyyy, H:mm:ss");
      afterPrefix = "on";
      timeout = setTimeout(
        setToDisplay,
        difference <= startCounterThresholdSeconds + 1000 ? 10000 : 20000
      );
    };

    setToDisplay();

    return () => clearInterval(timeout);
  });
</script>

{#if toDisplay && inline}
  <span class="inline">
    {prefixLabel}
    {afterPrefix}
    {toDisplay}
  </span>
{/if}

{#if toDisplay && !inline}
  <div class="block">
    <div class="label">{prefixLabel} {afterPrefix}</div>
    <div class="value">{toDisplay}</div>
  </div>
{/if}
