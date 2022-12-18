<script>
  import Button, { Label } from "@smui/button";
  import { logs } from "../../../state/runtime";
  let showLogs = false;

  async function handleReset() {
    if (confirm("This will reset your app. You will have to login again.")) {
      if (navigator.serviceWorker) {
        const registration = await navigator.serviceWorker.getRegistration(".");
        if (registration) {
          await registration.unregister();
        }
      }
      window.localStorage.clear();
      window.setTimeout(() => window.location.reload(), 1000);
    }
  }
  async function handleCheckForUpdates() {
    if (navigator.serviceWorker) {
      const registration = await navigator.serviceWorker.getRegistration(".");
      if (registration) {
        try {
          await registration.update();
        } catch (e) {
          console.log("Error checking for updates");
        }
      }
    }
  }

  function handleShowLogs() {
    showLogs = true;
  }
</script>

<section>
  <h2>App info</h2>
  <p>
    {#if navigator.serviceWorker}
      <Button variant="outlined" on:click={handleCheckForUpdates}>
        <Label>Check for updates</Label>
      </Button>
    {/if}
    <Button variant="outlined" on:click={handleReset}>
      <Label>Reset Storage and Cache</Label>
    </Button>
  </p>
  <p>
    <Button variant="outlined" on:click={handleShowLogs}>
      <Label>Show Logs</Label>
    </Button>
    <Button variant="outlined" on:click={window.location.reload}>
      <Label>Reload</Label>
    </Button>
  </p>
</section>

<section>
  {#if showLogs && $logs}<textarea readonly>{$logs.join("\n")}</textarea>{/if}
</section>

<style>
  textarea {
    display: block;
    width: 100%;
    height: 50vh;
  }
</style>
