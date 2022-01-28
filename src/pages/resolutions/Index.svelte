<script>
  import Button, { Label } from "@smui/button"
  import { title } from "src/state/runtime";
  title.set("Resolutions");
</script>

<section>
  <h1>Resolutions</h1>

  <Button variant="raised" href="#/resolutions/new">
    <Label>Create resolution</Label>
  </Button>
</section>