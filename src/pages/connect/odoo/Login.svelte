<script>
  import { push } from "svelte-spa-router";
  import Accordion, { Panel, Content, Header } from "@smui-extra/accordion";
  import IconButton, { Icon } from "@smui/icon-button";
  import Textfield from "@smui/textfield";

  import { connectToOdoo, user, username, password } from "../../../state/odoo";
  import { odooEndpoint, projectKey } from "../../../stores/config";
  import Button, { Label } from "@smui/button";
  import Alert from "../../../components/Alert.svelte";

  let loginError = false;
  let panelOpen = false;
  let uName = "";
  let uPass = "";

  async function handleConnect() {
    try {
      await connectToOdoo(uName, uPass);
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
    <Alert>You are connected already.</Alert>
    <Button variant="outlined" on:click={handleDisconnect}>
      <Label>Disconnect</Label>
    </Button>
    <br />
    <br />
  {:else}
    <form on:submit|preventDefault={handleConnect}>
      <fieldset>
        <legend>Connect using your <b>{projectKey}</b> Odoo credentials.</legend
        >
        <p>
          <Textfield
            type="text"
            label="Odoo username"
            style="min-width: 250px;"
            required
            bind:value={uName}
            variant="filled"
          />
        </p>
        <p>
          <Textfield
            type="password"
            label="Odoo password"
            style="min-width: 250px;"
            required
            bind:value={uPass}
            variant="filled"
          />
        </p>

        {#if loginError}
          <Alert type="error">
            Login error, please check your username and password.
          </Alert>
        {/if}

        <Button variant="outlined" type="submit">
          <Label>Connect</Label>
        </Button>
      </fieldset>
    </form>
  {/if}
  <Accordion>
    <Panel bind:open={panelOpen}>
      <Header>
        Is it secure?
        <IconButton slot="icon" toggle pressed={panelOpen}>
          <Icon class="material-icons" on>expand_less</Icon>
          <Icon class="material-icons">expand_more</Icon>
        </IconButton>
      </Header>
      <Content>
        <p>
          Your credentials are stored in your browser and are
          <strong>only</strong>
          used to load and save data in the
          <a
            href={odooEndpoint.replace("/jsonrpc", "")}
            target="_blank"
            referrerpolicy="no-referrer"
            rel="noreferrer">{projectKey}'s odoo server</a
          >. There is
          <strong>no third party involved</strong>.
        </p>
        <p>
          <strong>Note:</strong>
          this is just a temporary solution until
          <a href="https://gitlab.com/teledisko/dao/-/tree/master/tips/2"
            >TIP-2</a
          >
          is ready.
        </p>
      </Content>
    </Panel>
  </Accordion>
</section>

<style>
  fieldset {
    padding: 1.4rem;
    padding-top: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>
