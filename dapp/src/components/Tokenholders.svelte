<script>
  import List, { Item, Text, PrimaryText, SecondaryText } from "@smui/list";

  import { contributors } from "../state/eth";
</script>

<section>
  <h2>Contributors</h2>
  <List class="demo-list" threeLine nonInteractive>
    {#each Object.entries($contributors || {}) as [address, value]}
      <Item>
        <Text>
          <PrimaryText>{value.name || address}</PrimaryText>
          <SecondaryText>{address}</SecondaryText>
          <SecondaryText>{value.balance} TDT</SecondaryText>
        </Text>
      </Item>
    {/each}
  </List>
</section>
