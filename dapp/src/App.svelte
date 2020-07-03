<script>
  import CONFIG from "./config";

  import Router from "svelte-spa-router";

  // Pages
  import PageIndex from "./pages/Index.svelte";
  import PageConnectOdoo from "./pages/connect/odoo/Index.svelte";
  import PageTaskList from "./pages/task/List.svelte";

  import Home from "./Home.svelte";
  import NotFound from "./NotFound.svelte";

  import TopAppBar from "./components/TopAppBar.svelte";
  import Tokenholders from "./components/Tokenholders.svelte";

  import { clock } from "./state";

  const routes = {
    "/": PageIndex,
    "/task/list": PageTaskList,
    "/connect/odoo": PageConnectOdoo,
    "*": NotFound,
  };
</script>

<TopAppBar />

<main>
  <Router {routes} />
</main>
