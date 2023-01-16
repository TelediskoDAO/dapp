<script lang="ts">
  import Button, { Label } from "@smui/button";
  import { useRegisterSW } from "virtual:pwa-register/svelte";
  import Alert from "./Alert.svelte";

  const CHECK_EVERY_MS = 10000;

  const buildDate = "__BUILD_DATE__";
  console.log("buildDate: ", buildDate);

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log(`Service Worker at: ${swUrl}`);
      r &&
        setInterval(() => {
          console.log("Checking for sw update");
          r.update().catch((e) => {
            console.log(e);
          });
        }, CHECK_EVERY_MS);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  function close() {
    needRefresh.set(false);
  }

  async function onUpdate() {
    await updateServiceWorker(true);
    window.location.reload();
  }
</script>

{#if $needRefresh}
  <div class="pwa-toast" role="alert">
    <Alert
      message="A new version of the dapp is available. Would you like to update it now?"
      type="info"
    />
    <Button variant="outlined" on:click={onUpdate}>
      <Label>Update</Label>
    </Button>
    <Button variant="outlined" on:click={close}>
      <Label>Close</Label>
    </Button>
  </div>
{/if}

<div class="pwa-date">{buildDate}</div>

<style>
  .pwa-date {
    visibility: hidden;
  }
  .pwa-toast {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 16px;
    padding: 12px;
    border: 1px solid #8885;
    border-radius: 4px;
    z-index: 2;
    text-align: left;
    box-shadow: 3px 4px 5px 0 #8885;
    background-color: white;
  }
</style>
