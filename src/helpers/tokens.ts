import type { DaoUser, Offer, ComputedBalances } from "../types";
import { formatEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";

export const bigIntToNum = (bigIntNum: BigInt) =>
  Number(formatEther(BigNumber.from(bigIntNum)));

export const computeBalances = (
  daoUser: DaoUser,
  userOffers: Offer[]
): ComputedBalances => {
  const nowTimestamp = Date.now();

  const total = bigIntToNum(daoUser.totalBalance);
  const vesting = bigIntToNum(daoUser.vestingBalance);

  const unlocked = userOffers.reduce((totalUnlocked, offer) => {
    const offerAmount = Number(formatEther(BigNumber.from(offer.amount)));
    return (
      totalUnlocked +
      (nowTimestamp > Number(offer.expirationTimestamp) ? offerAmount : 0)
    );
  }, 0);

  return {
    total,
    vesting,
    unlocked,
    locked: total - unlocked,
  };
};
