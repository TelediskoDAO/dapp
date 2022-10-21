<script lang="ts">
  export let maxVotingPower: number;
  export let totalVotedYes: number;
  export let totalVotedNo: number;
  export let totalAbstained: number;
  export let quorum: string;
  export let hasQuorum: boolean;
  export let isNegative: boolean;
</script>

<div class="wrapper">
  <div class="voting-breakdown">
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Total</div>
      <div class="voting-breakdown__value">
        {maxVotingPower} / 100%
      </div>
    </div>
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">In favour</div>
      <div class="voting-breakdown__value">
        {totalVotedYes} / {((100 * totalVotedYes) / maxVotingPower).toFixed(2)}%
      </div>
    </div>
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Against</div>
      <div class="voting-breakdown__value">
        {totalVotedNo} / {((100 * totalVotedNo) / maxVotingPower).toFixed(2)}%
      </div>
    </div>
  </div>
  <hr />
  <div class="voting-breakdown">
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Abstain</div>
      <div class="voting-breakdown__value">
        {totalAbstained} / {((100 * totalAbstained) / maxVotingPower).toFixed(
          2
        )}%
      </div>
    </div>
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">
        {isNegative ? "Negative" : ""} Votes needed to approve
      </div>
      <div class="voting-breakdown__value">
        {Math.round((maxVotingPower * Number(quorum)) / 100)} / {quorum}%
      </div>
    </div>
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Quorum reached</div>
      <div class="voting-breakdown__value">
        {hasQuorum ? "Yes" : "No"}
      </div>
    </div>
  </div>
</div>

<style>
  .wrapper {
    margin-bottom: 1rem;
  }
  .voting-breakdown {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    cursor: default;
  }

  .voting-breakdown__item {
    flex: 1 1 0;
    text-align: center;
    padding: 1rem;
  }

  .voting-breakdown__title {
    font-weight: 300;
    font-size: large;
    margin-bottom: 0.3rem;
  }

  .voting-breakdown__value {
    font-weight: 700;
    font-size: larger;
  }

  .voting-breakdown > div:not(:last-child) {
    border-right: 1px solid var(--color-gray-1);
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
</style>
