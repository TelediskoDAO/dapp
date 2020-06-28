<script>
  import Button, { Label } from "@smui/button";
  import Paper, { Title, Subtitle, Content } from "@smui/paper";
  import { sign } from "../state/eth";
  const _sign = () =>
    sign(
      "By signing this message, I allow this website to manage my data on odoo.teledisko.com\n(Request #ceb6081125724e9088871ab86151cbcc)"
    );
</script>

<style>
  .paper {
    width: 500px;
    max-width: 80%;
    margin: 50px auto;
  }
</style>

<section>
  <Paper class="paper" style="width: 500px; max-width: 80%; margin: 50px auto;">
    <Title>Connect to Odoo</Title>
    <Content>
      Allow this website to synchronize your tasks with odoo.teledisko.com.
    </Content>
    <Button style="margin-top: 10px" variant="raised" on:click={_sign}>
      <Label style="color: white">Connect</Label>
    </Button>
  </Paper>
</section>
