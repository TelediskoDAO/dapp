<script>
  import Login from "./Login.svelte";
  import Ethereum from "./Ethereum.svelte";
  import Info from "./Info.svelte";
  import { title } from "src/state/runtime";
  import ShowFeatures from "./showFeatures.svelte";
  title.set("Settings");
</script>

<Login />
<Ethereum />
<hr />
<Info />
<hr />
<ShowFeatures />
