<script>
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text/index';

  import Button, { Label } from "@smui/button";
  import Paper, { Title, Subtitle, Content } from "@smui/paper";

  let username = '';
  let password = '';

  function handleConnect() {

  }


  function handleSubmit() {
  }
</script>

<style>
  .paper {
    width: 500px;
    max-width: 80%;
    margin: 50px auto;
  }
</style>

<section>
  <Paper class="paper">
    <Title>Odoo Integration</Title>
    <Content>
      Connect to Odoo to:
      <ul>
        <li>Manage your projects and tasks.</li>
        <li>Time track your activities.</li>
      </ul>
      You are <strong>not connected</strong>.
      <Button variant="raised" on:click={handleConnect}>
        <Label style="color: white">Connect</Label>
      </Button>

      <form>
        <div>
          <Textfield variant="outlined" bind:value={username} label="Username" input$aria-controls="username-input" input$aria-describedby="username-input" />
          <HelperText id="username-input">Your Odoo username</HelperText>
        </div>

        <div>
            <Textfield variant="outlined" bind:value={password} label="password" input$aria-controls="password-input" input$aria-describedby="password-input" />
            <HelperText id="password-input">Your Odoo password</HelperText>
        </div>

        <Button variant="raised" on:click={handleSubmit}>
          <Label style="color: white">Submit</Label>
        </Button>
      </form>

    </Content>

  </Paper>
</section>
