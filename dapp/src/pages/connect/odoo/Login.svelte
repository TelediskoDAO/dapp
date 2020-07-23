<script>
  import {username, password, agent} from "src/state/odoo";

  let connect;
  let _username = '';
  let _password = '';

  function handleConnect() {
    $username = _username;
    $password = _password;
  }

  function handleDisconnect() {
    $username = '';
    $password = '';
  }

</script>

<section>

    <h2>Odoo Integration</h2>
    {#if $username && $password}
    <p>
      You are connected already.
    </p>
      <button on:click={handleDisconnect}>
        Disconnect
      </button>
    {:else}
    <form on:submit|preventDefault={handleConnect}>
      <fieldset>
        <legend>Connect to Odoo using your credentials.</legend>
        <p>
          <label>Odoo Username<br/>
            <input bind:value={_username} required />
          </label>
        </p>
        <p>
          <label>Odoo Password<br/>
            <input type="password" bind:value={_password} required />
          </label>
        </p>

        <button type="submit">
          Connect
        </button>
      </fieldset>
    </form>
    {/if}


    <details>
      <summary>Is it secure?</summary>
      <p>
        Your credentials are stored in your browser and are <strong>only</strong>
        used to load and save data in the <a href="https://odoo.teledisko.com/"
        target="_blank">odoo.teledisko.com</a> server.
        There is <strong>no third party involved</strong>.
      </p>

      <p>
        <strong>Note:</strong> this is just a temporary solution until <a
        href="https://gitlab.com/teledisko/dao/-/tree/master/tips/2">TIP-2</a>
        is ready.
      </p>
    </details>

</section>
