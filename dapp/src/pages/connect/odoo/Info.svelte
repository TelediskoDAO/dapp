<script>
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
</script>

<section>
  <h2>App info</h2>
  <button on:click={handleReset}>Reset Storage and Cache</button>
  {#if navigator.serviceWorker}
    <button on:click={handleCheckForUpdates}>Check for updates</button>
  {/if}
</section>
