<script>
  import Login from "./Login.svelte";
  import Ethereum from "./Ethereum.svelte";
  import { title } from "src/state/runtime";
  title.set("Settings");
</script>

<Login />
<Ethereum />
