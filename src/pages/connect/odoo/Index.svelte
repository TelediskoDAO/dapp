<script>
  import Login from "./Login.svelte";
  import Ethereum from "./Ethereum.svelte";
  import Info from "./Info.svelte";
  import { title } from "../../../state/runtime";
  title.set("Settings");
  // import ShowFeatures from "./ShowFeatures.svelte";
</script>

<Login />
<Ethereum />
<hr />
<Info />
<hr />

<!-- <ShowFeatures /> -->
<style>
  hr {
    border: none;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
  }
</style>
