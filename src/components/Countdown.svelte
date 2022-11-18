<script lang="ts">
  import CircularProgress from "@smui/circular-progress/src/CircularProgress.svelte";
  import { differenceInSeconds, format } from "date-fns";
  import { onMount } from "svelte";

  export let targetDate: Date;
  export let startCounterThresholdSeconds = 600;
  export let prefixLabel: string;
  export let inline = true;
  export let disableCountdown = false;
  let toDisplay: null | string = null;
  let afterPrefix = "";

  onMount(() => {
    let timeout: null | any = null;

    const setToDisplay = () => {
      const now = Date.now();
      const difference = differenceInSeconds(targetDate, now);
      if (difference <= startCounterThresholdSeconds && !disableCountdown) {
        const minutes = Math.floor(difference / 60);
        const seconds = difference % 60;
        if (seconds <= 0 && minutes <= 0) {
          toDisplay = null;
        } else {
          toDisplay =
            minutes > 0
              ? `${("0" + minutes).slice(-2)}m:${("0" + seconds).slice(-2)}s`
              : `${("0" + seconds).slice(-2)}s`;
          timeout = setTimeout(setToDisplay, 1000);
          afterPrefix = "in";
        }
        return;
      }
      toDisplay = format(targetDate, "dd LLL yyyy, H:mm:ss");
      afterPrefix = "on";
      timeout = !disableCountdown
        ? setTimeout(
            setToDisplay,
            (difference - startCounterThresholdSeconds) * 1000
          )
        : null;
    };

    setToDisplay();

    return () => {
      clearInterval(timeout);
    };
  });
</script>

{#if !toDisplay}
  <CircularProgress style="height: 18px; width: 18px;" indeterminate />
{/if}

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
