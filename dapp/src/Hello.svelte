<script>
  import Button from "@smui/button";
  import Fab from "@smui/fab";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import { Label, Icon } from "@smui/common";

  import { replace } from "svelte-spa-router";
  export let params = {};
  let name = params.name;
  $: {
    replace("/hello/" + name);
  }
</script>

<h1>Hello {params.name}</h1>
<p>Try to change the last part of the URL!</p>

<input bind:value={name} />
<Button on:click={() => alert('Clicked!')}>Just a Button</Button>
