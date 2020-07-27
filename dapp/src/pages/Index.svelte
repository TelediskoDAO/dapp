<style type="text/scss">
  @import 'src/styles/index';

  .apps {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    > div {

      width: 45%;
      @include respond-to(handhelds) {
        width: 100% ;
      }

      padding: var(--size-m);
      margin-top: var(--size-m);
      @include border;

      :not(:last-child) {
        margin-right: var(--size-s);
      }

      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }

</style>

<section>
  <h1>Welcome to Teledisko DAO</h1>

  <p>
    This web application allows contributors to interact with the <strong>Teledisko DAO</strong>. You can use it both from your laptop and from your smartphone.
  </p>

  <h2>What you can do now</h2>

  <div class="apps">

    <div>
      <h3><i>login</i> Login</h3>
      <p>Login to Odoo to enable other applications.</p>
      <a class="button medium" href="#/connect/odoo">Login</a>
    </div>

    <div class="disabled">
      <h3><i>timer</i> Time Tracking</h3>
      <p>Track your time and manage your timesheets, directly on your odoo task.</p>
      <a class="button medium" href="#/tasks">Track Time</a>
    </div>

  </div>

  <h2>What will be available in the future</h2>

  <ul>
    <li>Login to Odoo using MetaMask.</li>
    <li>Track time for your Odoo tasks.</li>
    <li>Check the balance of your Teledisko tokens.</li>
    <li>Create and vote on polls created by other contributors.</li>
    <li>Sell your tokens.</li>
  </ul>
</section>
