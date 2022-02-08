<script lang="ts">
  import { logger } from "./state/runtime";
  import { user, userError, username } from "./state/odoo";
  import { title } from "./state/runtime";
  import { slide } from "svelte/transition";

  import { notifier } from "@beyonk/svelte-notifications";
  import TopAppBar from "./components/TopAppBar.svelte";
  import UpdateAvailable from "./components/UpdateAvailable.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import MismatchError from "./components/MismatchError.svelte";
  import RuntimeErrors from "./components/RuntimeErrors.svelte";

  import Router, { push, replace, location } from "svelte-spa-router";
  import { NotificationDisplay } from "@beyonk/svelte-notifications";

  // Pages
  import PageIndex from "./pages/Index.svelte";
  import PageConnectOdoo from "./pages/connect/odoo/Index.svelte";
  import PageTaskIndex from "./pages/task/Index.svelte";
  import PageTimeline from "./pages/timeline/Index.svelte";
  import PageReport from "./pages/report/Index.svelte";
  import PageTokens from "./pages/tokens/Index.svelte";
  import PageResolutions from "./pages/resolutions/Index.svelte";
  import PageResolutionsNew from "./pages/resolutions/New.svelte";
  import PageResolutionsView from "./pages/resolutions/View.svelte";
  import PageResolutionsEdit from "./pages/resolutions/Edit.svelte";

  import NotFound from "./NotFound.svelte";

  const log = logger("App");

  $: {
    console.log("location is", $location);
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
    "/resolutions/new": PageResolutionsNew,
    "/resolutions/:resolutionId": PageResolutionsView,
    "/resolutions/:resolutionId/edit": PageResolutionsEdit,
    "/resolutions/:resolutionId/print": PageResolutionsView,
    "/connect/odoo": PageConnectOdoo,
    "*": NotFound,
  };

  log("Boot");

  $: {
    console.log("error is", $userError);
    if ($userError) {
      notifier.danger($userError, 7000);
      push("/");
    }
  }

  let notification: NotificationDisplay;
</script>

<style>
  .loading {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: white;
    z-index: 10000;
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

<NotificationDisplay bind:this={notification} />

{#if $username && !$user && !$userError}
  <div out:slide class="loading">
    <p>loading...</p>
  </div>
{:else if /\/print$/.test($location)}
  <Router {routes} restoreScrollState />
{:else}
  <Sidebar />

  <main>
    <MismatchError />
    <TopAppBar />
    <Router {routes} restoreScrollState />
    <UpdateAvailable />
  </main>

  <RuntimeErrors />
{/if}
