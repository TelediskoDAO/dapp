<script>
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
  {#if navigator.serviceWorker}
    <button on:click={handleCheckForUpdates}>Check for updates</button>
  {/if}
  <button on:click={handleReset}>Reset Storage and Cache</button>
  <br />
  <button on:click={handleShowLogs}>Show Logs</button>
  <button on:click={() => window.location.reload()}>Reload</button>
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
