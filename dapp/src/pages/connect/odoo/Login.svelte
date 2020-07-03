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
    <p>
      Connect to Odoo using your credentials.
    </p>
    <form on:submit|preventDefault={handleConnect}>
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
    </form>
    {/if}

</section>
