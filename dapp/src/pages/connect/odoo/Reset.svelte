<script>
  async function handleReset() {
    if (navigator.serviceWorker) {
      const registration = await navigator.serviceWorker.getRegistration(".");
      if (registration) {
        await registration.unregister();
      }
    }
    window.localStorage.clear();
    window.setTimeout(() => window.location.reload(), 1000);
  }
</script>

<section>
  <h2>Reset app</h2>
  <button on:click={handleReset}>Reset</button>
</section>
