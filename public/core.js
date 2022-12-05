(() => {
  // Emergency Reset
  window.setTimeout(() => {
    if (window.TELEDISKO_DAO_BOOTED) {
      console.log("[CORE] App booted");
    } else {
      console.log("[CORE] App didn't boot");
      const b = document.createElement("button");
      const p = document.createElement("p");
      b.classList.add("emergency-reset-button");
      b.innerText = "Reset";
      p.innerText =
        "The app is taking more than 5 seconds to boot. Try to reset it. If it still doesn't work, please reach us.";
      document.body.appendChild(p);
      document.body.appendChild(b);
      b.addEventListener("click", async () => {
        if (navigator.serviceWorker) {
          console.log("[CORE] Unregister service worker");
          const registration = await navigator.serviceWorker.getRegistration(
            "."
          );
          if (registration) {
            await registration.unregister();
          }
        }
        console.log("[CORE] Reset localStorage");
        window.localStorage.clear();
        window.setTimeout(() => window.location.reload(), 1000);
      });
    }
  }, 5000);

  function displayError(event) {
    const html = `
      <div class="CORE">
        <section class="runtime-error">
          <p>
            <strong>Error:</strong>
            <code>${event.reason.message}</code>
          </p>
          <p>
            What to do now? Would be nice if you can
            <a href="https://gitlab.com/teledisko/dao/-/issues/new" target="_blank">create an issue</a>
            describing what happened. To keep using this app
            <button onClick="(() => window.location.reload())()">reload the page</button>.
          </p>
        </section>
      </div>`;

    const d = document.createElement("div");
    d.innerHTML = html;
    document.body.appendChild(d);
  }

  window.addEventListener("error", function (event) {
    console.log("[CORE] Error", event);
    displayError(event);
  });

  window.addEventListener("unhandledrejection", function (event) {
    console.log("[CORE] Unhandled Rejection", event);
    displayError(event);
  });
})();
