<script>
  import { connectToOdoo, user, username, password } from "../../../state/odoo";
  import { projectKey } from "../../../stores/config";
  import { push } from "svelte-spa-router";

  let loginError = false;

  async function handleConnect(e) {
    const form = new FormData(e.target);
    try {
      await connectToOdoo(form.get("username"), form.get("password"));
      push("/");
    } catch (e) {
      loginError = true;
    }
  }

  function handleDisconnect() {
    $username = "";
    $password = "";
    push("/");
  }
</script>

<section>
  <h2>Odoo Login</h2>
  {#if $user}
    <p>You are connected already.</p>
    <button on:click={handleDisconnect}>Disconnect</button>
  {:else}
    <form on:submit|preventDefault={handleConnect}>
      <fieldset>
        <legend>Connect using your Odoo credentials.</legend>
        <p>
          <label>Odoo Username<br /> <input name="username" required /> </label>
        </p>
        <p>
          <label
            >Odoo Password<br />
            <input name="password" type="password" required />
          </label>
        </p>

        {#if loginError}
          <p class="error">
            Login error, please check your username and password.
          </p>
        {/if}

        <button type="submit">Connect</button>
      </fieldset>
    </form>
  {/if}

  <details>
    <summary>Is it secure?</summary>
    <p>
      Your credentials are stored in your browser and are
      <strong>only</strong>
      used to load and save data in the {projectKey}'s odoo server. There is
      <strong>no third party involved</strong>.
    </p>

    <p>
      <strong>Note:</strong>
      this is just a temporary solution until
      <a href="https://gitlab.com/teledisko/dao/-/tree/master/tips/2">TIP-2</a>
      is ready.
    </p>
  </details>
</section>

<style>
  details {
    margin-top: var(--size-l);
  }
</style>
