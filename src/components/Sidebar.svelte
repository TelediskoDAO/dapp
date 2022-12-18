<script lang="ts">
  import active from "svelte-spa-router/active";
  import CurrentTask from "./CurrentTask.svelte";
  import { user, refresh } from "../state/odoo";
  import { projectKey } from "../stores/config";
  import {
    signer,
    shortAddress,
    networkName,
    networkChainId,
    connect,
    disconnect,
  } from "../stores/wallet";
  import Accordion, { Panel, Content, Header } from "@smui-extra/accordion";
  import Button, { Icon, Label } from "@smui/button";
  import Alert from "./Alert.svelte";

  $: refreshTime = new Date($refresh).toLocaleTimeString();

  const buildDate = "__BUILD_DATE__";
  const appEnv = "__ENV__";
  const version = "__VERSION__";
  const gitRevision = "__GIT_REVISION__";

  function closeSidebar() {
    const sidebarToggle = document.getElementById(
      "sidebar--toggle"
    ) as HTMLInputElement;
    sidebarToggle.checked = false;
  }

  function handleRefresh() {
    $refresh = Date.now();
  }
</script>

<aside>
  <input id="sidebar--toggle" type="checkbox" />
  <nav class="content">
    {#if $user}
      <Accordion>
        <Panel>
          <Header class="user-header">
            <section class="user-data">
              <div class="user-avatar">
                <img
                  alt="User's avatar"
                  src="data:image/jpeg;base64,{$user.image}"
                />
                <div
                  class="user-avatar-connected"
                  style="background-color: var({$signer
                    ? '--color-green-9'
                    : '--ruby-red'});"
                />
              </div>
              <span>{$user.name}</span>
            </section>
          </Header>
          <Content>
            {#if !$signer}
              <div class="centered">
                <Button variant="outlined" color="primary" on:click={connect}
                  >Connect wallet</Button
                >
              </div>
            {:else}
              <div class="user-info">
                <table>
                  <tr>
                    <th>Address:</th>
                    <td>{$shortAddress}</td>
                  </tr>
                  <tr>
                    <th>Network:</th>
                    <td>{$networkName}</td>
                  </tr>
                  <tr>
                    <th>ChainID:</th>
                    <td>{$networkChainId}</td>
                  </tr>
                </table>
                <div class="btn-disconnect">
                  <Button
                    variant="outlined"
                    style="width:100%;"
                    on:click={disconnect}
                  >
                    <Label>Disconnect</Label>
                  </Button>
                </div>
              </div>
            {/if}
          </Content>
        </Panel>
      </Accordion>
    {/if}
    <CurrentTask />

    <section>
      <ul>
        {#if $user}
          <li>
            <a use:active on:click={closeSidebar} href="#/tasks"
              ><i>timer</i>
              Time Tracking</a
            >
          </li>
          <li>
            <a use:active on:click={closeSidebar} href="#/timeline"
              ><i>calendar_today</i>
              Timeline</a
            >
          </li>
          <li>
            <a use:active on:click={closeSidebar} href="#/report"
              ><i>fact_check</i>
              Report</a
            >
          </li>
          {#if projectKey === "teledisko"}
            <li>
              <a use:active on:click={closeSidebar} href="#/tokens"
                ><i>account_balance</i>
                Tokens</a
              >
            </li>
            <li>
              <a use:active on:click={closeSidebar} href="#/resolutions"
                ><i>verified</i>
                Resolutions</a
              >
            </li>
            <li>
              <a use:active on:click={closeSidebar} href="#/shareholders"
                ><i>people</i>
                Shareholders</a
              >
            </li>
          {/if}
          <li>
            <a use:active on:click={closeSidebar} href="#/connect/odoo"
              ><i>settings</i>
              Settings</a
            >
          </li>
        {:else}
          <li>
            <a use:active on:click={closeSidebar} href="#/"
              ><i>home</i>
              Home Page</a
            >
          </li>
          <li>
            <a use:active on:click={closeSidebar} href="#/connect/odoo"
              ><i>login</i>
              Log in</a
            >
          </li>
        {/if}
      </ul>
    </section>

    <Alert showIcon={false}>
      <h5 style="margin: 0">Last refresh: {refreshTime}</h5>
      <div class="refresh-wrapper">
        <Button
          on:click={handleRefresh}
          on:click={closeSidebar}
          variant="outlined"
          color="secondary"
        >
          <Icon class="material-icons">refresh</Icon>
          <Label>Refresh</Label>
        </Button>
      </div>
      {#if appEnv === "production"}
        <small>Version: {version}</small>
      {:else}
        <small>Version: {appEnv}</small>
      {/if}
      <br />
      {#if appEnv === "staging"}
        <small
          >Commit: <a
            href="https://github.com/TelediskoDAO/dapp/commit/{gitRevision}"
          >
            {gitRevision.substring(0, 8)}
          </a></small
        >
      {/if}
      <small>Build date: {buildDate.substring(0, 19).replace("T", " ")}</small>
    </Alert>

    <section class="build-info" />
  </nav>
  <label class="overlay" for="sidebar--toggle" />
</aside>

<style>
  .user-avatar {
    position: relative;
    display: inline-block;
    margin-right: 5px;
  }

  .user-avatar + span {
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
  }

  .user-avatar-connected {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 3px;
  }

  .user-data {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  .user-data img {
    width: var(--size-m);
    display: block;
    margin-right: var(--size-xs);
    border-radius: 100%;
  }

  .refresh-wrapper {
    margin-top: 0.3rem;
    margin-bottom: 1rem;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
  }
  li a {
    text-decoration: none;
    padding: 0.4rem 0;
    display: block;
    margin-bottom: var(--size-xs);
  }
  li a i {
    color: #888;
    font-size: 1.5rem;
    vertical-align: bottom;
  }
  :global(aside section ul a.active i) {
    color: black !important;
  }

  .content :global(.smui-accordion__header__title) {
    padding: 0 !important;
  }

  .content :global(.smui-paper__content) {
    padding: 0 !important;
  }

  .centered {
    padding: 16px;
    text-align: center;
  }

  .user-info {
    width: 100%;
    padding: 8px;
    overflow-y: auto;
  }

  .btn-disconnect {
    margin: 8px auto;
  }
</style>
