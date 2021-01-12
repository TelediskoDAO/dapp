<script>
  import active from "svelte-spa-router/active";
  import CurrentTask from "./CurrentTask.svelte";
  import { authenticate, provider, address, addressShort } from "../state/eth";
  import { user, refresh } from "src/state/odoo";
  import CONFIG from "src/config";

  $: refreshTime = new Date($refresh).toLocaleTimeString();

  const buildDate = new Date(CONFIG.date)
    .toISOString()
    .substr(0, 19)
    .replace("T", " ");

  function closeSidebar() {
    document.getElementById("sidebar--toggle").checked = false;
  }

  function handleRefresh() {
    $refresh = Date.now();
  }
</script>

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

  small {
    color: var(--color-gray-5);
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

<aside>
  <input id="sidebar--toggle" type="checkbox" />
  <nav class="content">
    <section class="user-data">
      {#if $user}
        <img src="data:image/jpeg;base64,{$user.image}" />
        {$user.name}
      {/if}
    </section>

    <CurrentTask />

    <section>
      <ul>
        {#if $user}
          <li>
            <a use:active on:click={closeSidebar} href="#/tasks"><i>timer</i>
              Time Tracking</a>
          </li>
          <li>
            <a
              use:active
              on:click={closeSidebar}
              href="#/timeline"><i>calendar_today</i>
              Timeline</a>
          </li>
          <li>
            <a
              use:active
              on:click={closeSidebar}
              href="#/report"><i>fact_check</i>
              Report</a>
          </li>
          <!--li>
          <a use:active on:click={closeSidebar} href="#/tokens"><i>account_balance</i> Tokens</a>
        </li-->
          <li>
          <a use:active on:click={closeSidebar} href="#/connect/odoo"><i>settings</i> Settings</a>
        </li>
        {:else}
          <li>
            <a use:active on:click={closeSidebar} href="#/"><i>home</i>
              Home Page</a>
          </li>
          <li>
            <a
              use:active
              on:click={closeSidebar}
              href="#/connect/odoo"><i>login</i>
              Log in</a>
          </li>
        {/if}
      </ul>
    </section>

    <section class="refresh">
      <h5>Last refresh: {refreshTime}</h5>
      <button
        on:click={handleRefresh}
        on:click={closeSidebar}
        class="small"><i>sync</i>Refresh</button>
    </section>

    <section>
      <small>Software version: {CONFIG.version}</small><br />
      <small>Build date: {buildDate}</small>
    </section>
  </nav>
  <label class="overlay" for="sidebar--toggle" />
</aside>
