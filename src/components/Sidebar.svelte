<script lang="ts">
  import active from "svelte-spa-router/active";
  import CurrentTask from "./CurrentTask.svelte";
  import { user, refresh } from "../state/odoo";

  $: refreshTime = new Date($refresh).toLocaleTimeString();

  const buildDate = new Date() // todo build date
    .toISOString()
    .substring(0, 19)
    .replace("T", " ");

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
    <section class="user-data">
      {#if $user}
        <img alt="User's avatar" src="data:image/jpeg;base64,{$user.image}" />
        {$user.name}
      {/if}
    </section>

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

    <!-- <section class="build-info">
      {#if appEnv === "production"}
        <small>Version: {CONFIG.version}</small>
      {:else}
        <small>Version: {CONFIG.env}</small>
      {/if}
      {#if CONFIG.env === "staging"}
        <small
          >Commit: <a
            href="https://github.com/TelediskoDAO/dapp/commit/{CONFIG.gitRevision}"
          >
            {CONFIG.gitRevision.substring(0, 8)}
          </a></small
        >
      {/if}
      <small>Build date: {buildDate}</small>
    </section> -->
  </nav>
  <label class="overlay" for="sidebar--toggle" />
</aside>

<style>
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

  .refresh h5 {
    font-weight: normal;
    margin-bottom: var(--size-xs);
  }
</style>
