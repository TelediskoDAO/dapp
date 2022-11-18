<script lang="ts">
  import { Icon, Svg } from "@smui/common";
  import {
    mdiAlertOutline,
    mdiInformationOutline,
    mdiCheckboxMarkedCircleOutline,
  } from "@mdi/js";

  export let type: "info" | "warning" | "error" | "success" = "info";
  export let title: string = "";
  export let message: string = "";
  export let marginTop: boolean = false;

  const typeIcon = {
    info: mdiInformationOutline,
    warning: mdiAlertOutline,
    error: mdiInformationOutline,
    success: mdiCheckboxMarkedCircleOutline,
  };
</script>

<div class={`alert alert--${type} ${marginTop ? "alert--has-margin-top" : ""}`}>
  <div class="alert-icon">
    <Icon component={Svg} viewBox="0 0 24 24">
      <path fill="currentColor" d={typeIcon[type]} />
    </Icon>
  </div>
  <div class="alert-content">
    {#if title}
      <div class="alert-title">{title}</div>
    {/if}
    <div class="alert-message">
      {@html message}
      <slot />
    </div>
  </div>
</div>

<style>
  .alert {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    margin-bottom: 1rem;
    font-size: small;
    border-radius: 4px;
  }

  .alert-title {
    font-weight: bold;
    margin-bottom: 0.2rem;
  }

  .alert:last-child {
    margin-bottom: 0;
  }
  .alert--has-margin-top {
    margin-top: 1rem;
  }
  .alert--info {
    color: rgb(1, 67, 97);
    background-color: rgb(229, 246, 253);
  }
  .alert--info .alert-icon {
    color: rgb(3, 169, 244);
  }
  .alert--warning {
    color: rgb(102, 60, 0);
    background-color: rgb(255, 244, 229);
  }
  .alert--warning .alert-icon {
    color: rgb(255, 152, 0);
  }
  .alert--success {
    color: rgb(30, 70, 32);
    background-color: rgb(237, 247, 237);
  }
  .alert--success .alert-icon {
    color: rgb(76, 175, 80);
  }
  .alert--error {
    color: rgb(95, 33, 32);
    background-color: rgb(253, 237, 237);
  }
  .alert--error .alert-icon {
    color: rgb(239, 83, 80);
  }
  .alert-icon {
    display: flex;
    align-items: center;
  }
  .alert-icon :global(svg) {
    width: 18px;
    height: 18px;
  }
  .alert-content {
    width: 100%;
    padding: 0 1rem;
    text-align: left;
  }
</style>
