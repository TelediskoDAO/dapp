<script>
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
  <div="paper">
    <h2>Connect to Odoo</h2>
    <p>
      Allow this website to synchronize your tasks with odoo.teledisko.com.
    </p>
    <button style="margin-top: 10px" variant="raised" on:click={_sign}>
      Connect
    </button>
  </div>
</section>
