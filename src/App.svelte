<script lang="ts">
  import { networkError } from "./stores/wallet";
  import { projectKey } from "./stores/config";

  import { user, userError, username } from "./state/odoo";
  import { title } from "./state/runtime";
  import { slide } from "svelte/transition";

  import TopAppBar from "./components/TopAppBar.svelte";
  import UpdateAvailable from "./components/UpdateAvailable.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import RuntimeErrors from "./components/RuntimeErrors.svelte";
  import Alert from "./components/Alert.svelte";

  // Pages
  import PageIndex from "./pages/Index.svelte";
  import PageConnectOdoo from "./pages/connect/odoo/Index.svelte";
  import PageTaskIndex from "./pages/task/Index.svelte";
  import PageTimeline from "./pages/timeline/Index.svelte";
  import PageReport from "./pages/report/Index.svelte";
  import PageTokens from "./pages/tokens/Index.svelte";
  import PageResolutionsNew from "./pages/resolutions/New.svelte";
  import PageResolutionsView from "./pages/resolutions/View.svelte";
  import PageResolutionsEdit from "./pages/resolutions/Edit.svelte";
  import PageShareholders from "./pages/shareholders/Index.svelte";
  import NotFound from "./pages/NotFound.svelte";

  import notifications from "./helpers/notifications";

  import Router, { location, replace, push } from "svelte-spa-router";
  import "../node_modules/izitoast/dist/css/iziToast.min.css";

  import PageResolutions from "./pages/resolutions/Index.svelte";
  import ReloadPrompt from "./components/ReloadPrompt.svelte";

  const routes = {
    "/": PageIndex,
    "/tasks": PageTaskIndex,
    "/tasks/:stage": PageTaskIndex,
    "/timeline": PageTimeline,
    "/report": PageReport,
    "/connect/odoo": PageConnectOdoo,
    ...(projectKey === "teledisko" && {
      "/tokens": PageTokens,
      "/resolutions": PageResolutions,
      "/resolutions/new": PageResolutionsNew,
      "/resolutions/:resolutionId": PageResolutionsView,
      "/resolutions/:resolutionId/edit": PageResolutionsEdit,
      "/resolutions/:resolutionId/print": PageResolutionsView,
      "/shareholders": PageShareholders,
    }),
    "*": NotFound,
  };

  $: {
    if ($user && $location === "/") {
      replace("/tasks");
    }
  }

  $: {
    console.log("error is", $userError);
    if ($userError) {
      notifications.error($userError);
      push("/connect/odoo");
    }
  }
</script>

<svelte:head>
  <title>{$title}</title>
</svelte:head>

{#if $username && !$user && !$userError}
  <div out:slide class="loading">
    <p>loading...</p>
  </div>
{:else if /\/print$/.test($location)}
  <Router {routes} restoreScrollState />
{:else}
  <Sidebar />

  <main>
    <TopAppBar />
    {#if $networkError}
      <Alert
        type="warning"
        message="Please check your wallet, there's a network mismatch"
      />
    {/if}
    <Router {routes} restoreScrollState />
    <UpdateAvailable />
  </main>

  <RuntimeErrors />
{/if}

<ReloadPrompt />

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
