<script>
  import CurrentTask from "./CurrentTask.svelte";
  import { authenticate, provider, address, addressShort } from "../state/eth";
  import { user } from "src/state/odoo";
  import CONFIG from "src/config";

  const buildDate = new Date(CONFIG.date).toISOString().substr(0, 19).replace('T', ' ');
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
  section:not(:last-child) {
  }
  small {
    color: #ccc;
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
    font-size: 1.5rem;
    vertical-align: bottom;
  }
</style>

<aside>
  <input id="sidebar--toggle" type="checkbox" />
  <nav class="content">
    <section class="user-data">
      {#if $user}
        <img src="data:image/jpeg;base64,{$user.image}" />
        {$user.name}
      {:else}
        <a href="#/connect/odoo">
          Login
        </a>
      {/if}
    </section>

    <CurrentTask />

    <section>
      <ul>
        <li>
          <a href="#/tasks"><i>timer</i> Track Time</a>
        </li>
        <li>
          <a href="#/timeline"><i>calendar_today</i> Timeline</a>
        </li>
        <li>
          <a href="#/reports"><i>fact_check</i> Reports</a>
        </li>
        <li>
          <a href="#/connect/odoo"><i>settings</i> Settings</a>
        </li>
      </ul>
    </section>
    <section>
      <small>Software version: {CONFIG.version}</small><br>
      <small>Build date: {buildDate}</small>
    </section>
  </nav>
  <label class="overlay" for="sidebar--toggle"></label>
</aside>
