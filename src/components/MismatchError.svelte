<script>
  import { networkMismatchError, addressMismatchError } from "../state/eth";
  import { user } from "../state/odoo";
</script>

<style>
  div {
    color: var(--color-warning-fg);
    background-color: var(--color-warning-bg);
    text-align: center;
    padding: var(--size-s);
    margin-bottom: var(--size-m);
  }
</style>

{#if $user && !$user.address}
  <div>
    <strong>The DAO doesn't know how to pay you.</strong>
    <a
      href="https://odoo.teledisko.com/web#id={$user.uid}&action=71&model=res.users&view_type=form&menu_id=4"
      target="_blank"
    >Open your Odoo settings</a>
    and set your Ethereum address.
  </div>
{:else if $networkMismatchError}
  <div>
    Your wallet is connected to
    <strong>{$networkMismatchError.has}</strong>, please connect it to
    <strong>{$networkMismatchError.want}</strong>
  </div>
{:else if $addressMismatchError}
  <div>
    Your wallet address is
    <strong>{$addressMismatchError.has}</strong>, but your profile is registered
    with address
    <strong>{$addressMismatchError.want}</strong>, please change address.
  </div>
{/if}
