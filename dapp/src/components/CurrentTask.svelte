<script>
  import { tasks, currentTask, currentDuration, currentHours, currentHoursTotal } from "src/state/odoo";
  import { toPrettyDuration } from "src/utils";
  import Headroom from "headroom.js";

  let element;
  let headroom;

  $: {
    console.log('element is', element);
    if (!element && headroom) {
      headroom.destroy();
    }
    if (element && !headroom) {
      headroom = new Headroom(element, {
        classes: {
          unpinned: "headroom-bottom--unpinned"
        }
      });
      headroom.init();
    }
    /*
    // select your header or whatever element you wish
    const header = document.querySelector("header");
    const headroom = new Headroom(header);
    headroom.init();
    */
  }

</script>

<style type="text/scss">
@import 'src/styles/index';

section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-blue);
  @include elevation-mid;
}

div {
  padding: var(--size-s);
  max-width: var(--max-width);
  margin: 0 auto;
}

h4, p {
  margin: 0;
}

h4 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: var(--size-xs);
}

</style>

{#if $currentTask}
<section bind:this={element}>
  <div>

    <h4>{$currentTask.name}</h4>
    <p>
      <i>timer</i>
      {toPrettyDuration($currentHoursTotal)},
      <a href="#/tasks?scrollToCurrent"><i>open_in_new</i> go to task</a>
    </p>
  </div>
</section>
{/if}
