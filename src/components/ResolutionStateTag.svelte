<script lang="ts">
  export let label;
</script>

<span class={`resolution-tag ${label}`}>
  {label}
</span>

<style>
  .resolution-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;

    border-radius: 14px;
  }

  .resolution-tag.pre-draft {
    background-color: var(--middle-blue-green);
    color: var(--color-white);
  }

  .resolution-tag.notice {
    background-color: var(--gamboge);
    color: var(--color-white);
  }

  .resolution-tag.voting {
    border: 1px solid var(--ruby-red);
    color: var(--ruby-red);
  }

  .resolution-tag.voting:after {
    content: "";
    width: 8px;
    height: 8px;
    margin-left: 8px;
    background-color: var(--ruby-red);
    border-radius: 50%;
    animation: blink 1s infinite;
  }

  .resolution-tag.ended {
    background-color: var(--color-gray-1);
  }
</style>
