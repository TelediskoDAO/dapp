<script>
  import { logger } from "./state/runtime";
  import { user, username } from "./state/odoo";
  import { title } from "./state/runtime";
  import { slide } from "svelte/transition";

  import TopAppBar from "./components/TopAppBar.svelte";
  import UpdateAvailable from "./components/UpdateAvailable.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import MismatchError from "src/components/MismatchError.svelte";
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
  import PageResolutions from "./pages/resolutions/Index.svelte";
  // import PageResolutions from "./pages/resolutions/New.svelte";

  import NotFound from "./NotFound.svelte";

  const log = logger("App");

  $: {
    if ($user) {
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
    "/resolutions": PageResolutions,
    // "/resolutions/new": PageResolutionsNew,
    "/connect/odoo": PageConnectOdoo,
    "*": NotFound,
  };

  log("Boot");
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
    <p>loading...</p>
  </div>
{:else}
  <Sidebar />

  <main>
    <MismatchError />
    <TopAppBar />
    <Router {routes} restoreScrollState={true} />
    <UpdateAvailable />
  </main>

  <RuntimeErrors />
{/if}