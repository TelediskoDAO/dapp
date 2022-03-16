<script lang="ts">
  export let label: string;
  export let size: "sm" | "md" | "lg" = "md";
</script>

<span class={`tag tag--${label} tag--${size}`}>
  {label}
</span>

<style>
  .tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;

    border-radius: 14px;
    color: rgb(1, 67, 97);
    background-color: rgb(229, 246, 253);
  }

  .tag--sm {
    font-size: smaller;
    padding: 2px 6px;
  }

  .tag.tag--pre-draft {
    background-color: var(--middle-blue-green);
    color: var(--color-white);
  }

  .tag.tag--notice {
    background-color: var(--gamboge);
    color: var(--color-white);
  }

  .tag.tag--voting {
    background-color: var(--color-white);
    border: 1px solid var(--ruby-red);
    color: var(--ruby-red);
  }

  .tag.tag--voting:after {
    content: "";
    width: 8px;
    height: 8px;
    margin-left: 8px;
    background-color: var(--ruby-red);
    border-radius: 50%;
    animation: blink 1s infinite;
  }

  .tag.tag--ended {
    background-color: var(--color-gray-1);
  }
</style>
