<script>
  import { authenticate, provider, address, addressShort } from "../state/eth";
  import { user } from "src/state/odoo";
</script>

<style>
  section {
    padding: 0 var(--size-s);
    display: flex;
    align-items: center;
  }

  label {

  }

  h1 {
    font-size: var(--font-l);
    flex: 1;
    margin: 0;
    text-align: center;
  }
</style>

<header>
  <section>
    <label for="sidebar--toggle">≡</label>
    <h1>Teledisko DAO</h1>
  </section>
</header>
