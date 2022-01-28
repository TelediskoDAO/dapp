<script>
  import { title } from "src/state/runtime";
</script>

<style>
  section {
    display: flex;
    align-items: center;
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
    <label for="sidebar--toggle"><i>menu</i></label>
    <h1>{$title}</h1>
  </section>
</header>
