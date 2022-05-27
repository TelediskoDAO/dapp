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

  const [unlocked, currentlyOffered] = userOffers.reduce(
    (totals, offer) => {
      const offerAmount = Number(formatEther(BigNumber.from(offer.amount)));
      const offerExpirationTimestamp = Number(offer.expirationTimestamp) * 1000;
      const [totUnlocked, totCurrentlyOffered] = totals;
      const newUnlocked =
        totUnlocked +
        (nowTimestamp > offerExpirationTimestamp ? offerAmount : 0);
      const newCurrentlyOffered =
        totCurrentlyOffered +
        (nowTimestamp <= offerExpirationTimestamp ? offerAmount : 0);
      return [newUnlocked, newCurrentlyOffered];
    },
    [0, 0]
  );

  return {
    total,
    vesting,
    unlocked,
    locked: total - unlocked,
    currentlyOffered,
  };
};
