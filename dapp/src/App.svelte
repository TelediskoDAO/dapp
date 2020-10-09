<script>
  import { user, username } from "src/state/odoo";
  import CONFIG from "./config";
  import { slide } from 'svelte/transition';

  import TopAppBar from "./components/TopAppBar.svelte";
  import CurrentTask from "./components/CurrentTask.svelte";
  import RuntimeErrors from "src/components/RuntimeErrors.svelte";

  import Router from "svelte-spa-router";

  // Pages
  import PageIndex from "./pages/Index.svelte";
  import PageConnectOdoo from "./pages/connect/odoo/Index.svelte";
  import PageTaskIndex from "./pages/task/Index.svelte";
  import PageTimeline from "./pages/timeline/Index.svelte";

  import Home from "./Home.svelte";
  import NotFound from "./NotFound.svelte";

  const routes = {
    "/": PageIndex,
    "/tasks": PageTaskIndex,
    "/tasks/:stage": PageTaskIndex,
    "/timeline": PageTimeline,
    "/connect/odoo": PageConnectOdoo,
    "*": NotFound,
  };
</script>

<style type="text/scss">
  @import 'src/styles/index';

  .loading {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: white;
    z-index: 99999;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      animation: blink 1s infinite;
    }
  }
</style>

{#if $username && !$user}
<div out:slide class="loading">
  <p>
    loading...
  </p>
</div>
{:else}
<TopAppBar />

<main>
  <Router {routes} restoreScrollState={true} />
</main>

<CurrentTask />
<RuntimeErrors />
{/if}
