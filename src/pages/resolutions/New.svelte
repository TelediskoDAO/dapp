<script>
  import Button, { Label } from "@smui/button"
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import { title } from "src/state/runtime";
  
  title.set("Resolutions");
  let open = false;
  let clicked = 'Nothing yet.';
</script>

<section>
  <h1>New Resolution</h1>

  <Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">Dialog Title</Title>
  <Content id="simple-content">Super awesome dialog body text?</Content>
  <Actions>
    <Button on:click={() => (clicked = 'No')}>
      <Label>No</Label>
    </Button>
    <Button on:click={() => (clicked = 'Yes')}>
      <Label>Yes</Label>
    </Button>
  </Actions>
</Dialog>

<Button on:click={() => (open = true)}>
  <Label>Open Dialog</Label>
</Button>

<pre class="status">Clicked: {clicked}</pre>

</section>