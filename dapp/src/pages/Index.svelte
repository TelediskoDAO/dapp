<script>
  import { user } from "src/state/odoo";
  import { platform } from "src/state/runtime";
</script>

<section>
  <h1>Teledisko DAO</h1>

  {#if $platform.isStandalone}
    <p><a href="#/connect/odoo">Log in now</a> and start using Teledisko DAO</p>
  {:else}
    <p>
      This application allows contributors to interact with <strong>Teledisko DAO</strong>.
    </p>

    <h2>Use Teledisko DAO from your laptop</h2>

    <p><a href="#/connect/odoo">Log in now</a> and start using Teledisko DAO.</p>

    {#if $platform.isAndroid}
      <h2><i>phone_android</i> Install the App</h2>
      <p>On your browser, tap on the <i class="medium">more_vert</i> icon, then <em>Add to Home Screen</em> or <em>Install</em>.</p>
    {:else if $platform.isIOS}
      <h2><i>phone_iphone</i> Install the App</h2>
      <p>On your browser, tap on the <img class="icon medium" alt="iOS share icon" src="images/icons/ios-share.png" /> icon, then <em>Add to Home Screen</em>.</p>
    {:else}
      <h2>Install Teledisko DAO in your smartphone</h2>

      <p>This website can also be installed as an app in your Android phone or iPhone. Open this website from your smartphone and follow the instructions.</p>
    {/if}
  {/if}
</section>
