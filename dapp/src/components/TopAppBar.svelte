<script>
  import TopAppBar, {
    Row,
    Section,
    Title,
    FixedAdjust
  } from "@smui/top-app-bar";
  import Button, { Group, GroupItem, Label, Icon } from "@smui/button";
  import IconButton from "@smui/icon-button";

  import { authenticate, provider, address, addressShort } from "../state/eth";

  const title = "Home";
</script>

<style>

</style>

<TopAppBar>
  <Row>
    <Section>
      <!--IconButton class="material-icons">menu</IconButton-->
      <Title>Teledisko DAO: {title}</Title>
    </Section>
    <Section align="end" toolbar>
      {#if $provider}
        <Button on:click={authenticate}>
          <Label>{$addressShort}</Label>
        </Button>
      {:else}
        <Button on:click={authenticate}>
          <Label>Login</Label>
        </Button>
      {/if}
    </Section>
  </Row>
</TopAppBar>
