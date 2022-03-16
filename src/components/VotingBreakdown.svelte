<script lang="ts">
  export let totalYes: number;
  export let totalNo: number;
  export let hasQuorum: boolean;
  export let voters: string;
  export let votedVotingPower: number;
  export let maxVotingPower: number;
</script>

<div class="wrapper">
  <div class="voting-breakdown">
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Total Yes</div>
      <div class="voting-breakdown__value">
        {totalYes}
      </div>
    </div>
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Total No</div>
      <div class="voting-breakdown__value">
        {totalNo}
      </div>
    </div>
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Quorum</div>
      <div class="voting-breakdown__value">
        {hasQuorum ? "Yes" : "No"}
      </div>
    </div>
  </div>
  <hr />
  <div class="voting-breakdown">
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Voters</div>
      <div class="voting-breakdown__value">
        {voters}
      </div>
    </div>
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Voted voting power</div>
      <div class="voting-breakdown__value">
        {votedVotingPower}
      </div>
    </div>
    <div class="voting-breakdown__item">
      <div class="voting-breakdown__title">Max voting power</div>
      <div class="voting-breakdown__value">
        {maxVotingPower}
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
