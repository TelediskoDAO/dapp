<script>
  import CONFIG from "./config";

  import Router from "svelte-spa-router";
  import Home from "./Home.svelte";
  import Hello from "./Hello.svelte";
  import NotFound from "./NotFound.svelte";
  import { FixedAdjust } from "@smui/top-app-bar";

  import TopAppBar from "./components/TopAppBar.svelte";
  import Tokenholders from "./components/Tokenholders.svelte";

  import { clock } from "./state";

  const routes = {
    "/": Tokenholders,
    "/hello/:name": Hello,
    "*": NotFound,
  };
</script>

<TopAppBar />

<div use:FixedAdjust>
  <Router {routes} />
  <hr />
  <footer>production: {CONFIG.production}, built on: {CONFIG.date}</footer>
</div>
