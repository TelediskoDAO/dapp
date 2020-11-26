<script>
  import { user, username } from "src/state/odoo";
  import { title } from "src/state/runtime";
  import CONFIG from "./config";
  import { slide } from 'svelte/transition';

  import TopAppBar from "./components/TopAppBar.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import CurrentTask from "./components/CurrentTask.svelte";
  import RuntimeErrors from "src/components/RuntimeErrors.svelte";

  import Router from "svelte-spa-router";
  import { replace } from "svelte-spa-router";

  // Pages
  import PageIndex from "./pages/Index.svelte";
  import PageConnectOdoo from "./pages/connect/odoo/Index.svelte";
  import PageTaskIndex from "./pages/task/Index.svelte";
  import PageTimeline from "./pages/timeline/Index.svelte";
  import PageReport from "./pages/report/Index.svelte";
  import PageTokens from "./pages/tokens/Index.svelte";

  import Home from "./Home.svelte";
  import NotFound from "./NotFound.svelte";

  $: {
    if($user) {
      replace("/tasks");
    }
  }

  const routes = {
    "/": PageIndex,
    "/tasks": PageTaskIndex,
    "/tasks/:stage": PageTaskIndex,
    "/timeline": PageTimeline,
    "/report": PageReport,
    "/tokens": PageTokens,
    "/connect/odoo": PageConnectOdoo,
    "*": NotFound,
  };
</script>

<style>
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
  }

  .loading p {
    animation: blink 1s infinite;
  }
</style>

<svelte:head>
	<title>{$title}</title>
</svelte:head>


{#if $username && !$user}
<div out:slide class="loading">
  <p>
    loading...
  </p>
</div>
{:else}


<Sidebar />
<main>
  <TopAppBar />
  <Router
    {routes}
    restoreScrollState={true}
  />
</main>

<RuntimeErrors />
{/if}
