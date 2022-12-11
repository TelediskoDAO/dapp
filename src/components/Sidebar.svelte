<script lang="ts">
  import active from "svelte-spa-router/active";
  import CurrentTask from "./CurrentTask.svelte";
  import { user, refresh } from "../state/odoo";
  import {
    signer,
    shortAddress,
    networkName,
    networkChainId,
    connect,
    disconnect,
  } from "../stores/wallet";
  import Accordion, { Panel, Content, Header } from "@smui-extra/accordion";
  import Button, { Label } from "@smui/button";

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
              <div
                class="user-avatar"
                style="border-color: var({$signer
                  ? '--color-green-9'
                  : '--ruby-red'});"
              >
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
              {$user.name}
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

    <section class="refresh">
      <h5>Last refresh: {refreshTime}</h5>
      <button on:click={handleRefresh} on:click={closeSidebar} class="small"
        ><i>sync</i>Refresh</button
      >
    </section>

    <section class="build-info">
      {#if appEnv === "production"}
        <small>Version: {version}</small>
      {:else}
        <small>Version: {appEnv}</small>
      {/if}
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
    </section>
  </nav>
  <label class="overlay" for="sidebar--toggle" />
</aside>

<style>
  .user-avatar {
    position: relative;
    display: inline-block;
    margin-right: 5px;
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

  .build-info small {
    color: var(--color-gray-5);
    display: block;
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

  :global(.smui-accordion__header__title) {
    padding: 0 !important;
  }

  :global(.smui-paper__content) {
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

  .refresh h5 {
    font-weight: normal;
    margin-bottom: var(--size-xs);
  }
</style>
