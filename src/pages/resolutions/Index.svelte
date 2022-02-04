<script lang="ts">
  import Button, { Label } from "@smui/button"
  import { resolutions } from "../../state/resolutions";
  import { title } from "../../state/runtime";

  title.set("Resolutions");
</script>

<section>
  <h1>Resolutions</h1>

  {#each $resolutions as resolution}
    <div>
      <h4>Title: {resolution.title} <span>status: {resolution.status}</span></h4>
      <Button variant="raised" href={`#/resolutions/${resolution.ipfsId}`}>
        <Label>Edit</Label>
      </Button>
    </div>
  {/each}

  <Button variant="raised" href="#/resolutions/new">
    <Label>Create resolution</Label>
  </Button>
</section>