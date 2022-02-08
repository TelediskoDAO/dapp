<script lang="ts">
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";

  import FormField from "@smui/form-field";
  import Checkbox from "@smui/checkbox";
  import { showWIPFeatures } from "../../../state/settings";

  let open = false;
  let clicked = "Nothing yet.";

  function onWIPChange(e) {
    if ($showWIPFeatures) {
      $showWIPFeatures = false;
    } else {
      open = true;
      e.stopPropagation();
    }
  }
  function onWIPDialogSelect(v: boolean) {
    $showWIPFeatures = v;
  }
</script>

<section>
  <h2>Advanced features</h2>
  <FormField>
    <Checkbox value={$showWIPFeatures} on:change={onWIPChange} />
    <span slot="label">
      Enable features that are <em>Work In Progress</em>.
    </span>
  </FormField>
</section>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">🐉 Here be dragons 🐉</Title>
  <Content id="simple-content"
    >Enabling these features can make the app unstable. Are you sure you want to
    enable them?</Content
  >
  <Actions>
    <Button on:click={() => onWIPDialogSelect(false)}>
      <Label>No</Label>
    </Button>
    <Button on:click={() => onWIPDialogSelect(true)}>
      <Label>Yes</Label>
    </Button>
  </Actions>
</Dialog>
