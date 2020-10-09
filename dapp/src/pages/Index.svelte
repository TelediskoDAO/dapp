<script>
  import CONFIG from "src/config";
  import { user } from "src/state/odoo";
  import { platform } from "src/state/runtime";

  const buildDate = new Date(CONFIG.date).toISOString().substr(0, 19).replace('T', ' ');
</script>

<style type="text/scss">
  @import 'src/styles/index';

  .apps {
    display: flex;
    flex-wrap: wrap;

    > div {

      width: 45%;
      @include respond-to(handhelds) {
        width: 100% ;
      }

      padding: var(--size-m);
      margin: var(--size-s);
      @include border;

      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }

  small {
    color: #ccc;
  }
</style>

<section>
  <h1>Welcome to Teledisko DAO</h1>

  <p>
    This web application allows contributors to interact with the <strong>Teledisko DAO</strong>. You can use it both from your laptop and from your smartphone.
  </p>


  <h2>What you can do now</h2>

  <div class="apps">
    {#if $platform.isStandalone === false}
      {#if $platform.isAndroid}
        <div>
          <h3><i>phone_android</i> Install the App</h3>
          <p>On your browser, tap on the <i class="medium">more_vert</i> icon, then <em>Add to Home Screen</em>.</p>
        </div>
      {/if}

      {#if $platform.isIOS}
        <div>
          <h3><i>phone_iphone</i> Install the App</h3>
          <p>On your browser, tap on the <img class="icon medium" alt="iOS share icon" src="images/icons/ios-share.png" /> icon, then <em>Add to Home Screen</em>.</p>
        </div>
      {/if}
    {/if}

    {#if !$user}
    <div>
      <h3><i>login</i> Login</h3>
      <p>Login to use the DAO applications.</p>
      <a class="button medium" href="#/connect/odoo">Login</a>
    </div>
    {/if}

    <div>
      <h3><i>timer</i> Time Tracking</h3>
      <p>Track the time you work on tasks.</p>
      <a class="button medium" href="#/tasks">Track Time</a>
    </div>

    <div>
      <h3><i>calendar_today</i> Timeline</h3>
      <p>Display where you spend time.</p>
      <a class="button medium" href="#/timeline">Timeline</a>
    </div>

    <div class:disabled={!$user}>
      <h3><i>settings</i> Settings</h3>
      <p>Details about your account.</p>
      <a class="button medium" href="#/connect/odoo">Settings</a>
    </div>

  </div>

  <h2>What will be available in the future</h2>

  <ul>
    <li>Login using MetaMask.</li>
    <li>Check the balance of your Teledisko tokens.</li>
    <li>Create and vote on polls created by other contributors.</li>
    <li>Sell your tokens.</li>
  </ul>
</section>

<section>
  <small>Software version: {CONFIG.version}</small><br>
  <small>Build date: {buildDate}</small>
</section>
