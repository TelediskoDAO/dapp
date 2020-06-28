<script>
  import CONFIG from "./config";

  import Router from "svelte-spa-router";

  // Pages
  import PageIndex from "./pages/Index.svelte";
  import PageConnectOdoo from "./pages/connect/odoo/Index.svelte";

  import Home from "./Home.svelte";
  import NotFound from "./NotFound.svelte";
  import { FixedAdjust } from "@smui/top-app-bar";

  import TopAppBar from "./components/TopAppBar.svelte";
  import Tokenholders from "./components/Tokenholders.svelte";

  import { clock } from "./state";

  const routes = {
    "/": PageConnectOdoo,
    "*": NotFound,
  };
</script>

<style>
main {
  max-width: 1024px;
  padding: calc(64px + 24px) 0;
  margin: 0 auto;
}
</style>

<TopAppBar />

<main use:FixedAdjust>
  <Router {routes} />
  <!--footer>production: {CONFIG.production}, built on: {CONFIG.date}</footer-->
</main>
