import type { DaoUser, Offer, ComputedBalances } from "../types";
import { formatEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";

export const bigIntToNum = (bigIntNum: BigInt) =>
  Number(formatEther(BigNumber.from(bigIntNum)));

export const computeBalances = (
  daoUser: DaoUser | null,
  userOffers: Offer[]
): ComputedBalances => {
  const nowTimestamp = Date.now();

  const total = daoUser?.totalBalance ? bigIntToNum(daoUser.totalBalance) : 0;
  const vesting = daoUser?.vestingBalance
    ? bigIntToNum(daoUser.vestingBalance)
    : 0;
  const unlockedTempBalance = daoUser?.unlockedTempBalance
    ? bigIntToNum(daoUser.unlockedTempBalance)
    : 0;

  const [unlocked, currentlyOffered] = userOffers
    .filter(
      (offer) => offer.from.toLowerCase() === daoUser.address.toLowerCase()
    )
    .reduce(
      (totals, offer) => {
        const offerAmount = Number(formatEther(BigNumber.from(offer.amount)));
        const offerExpirationTimestamp =
          Number(offer.expirationTimestamp) * 1000;
        const [totUnlocked, totCurrentlyOffered] = totals;
        const newUnlocked =
          totUnlocked +
          (nowTimestamp > offerExpirationTimestamp ? offerAmount : 0);
        const newCurrentlyOffered =
          totCurrentlyOffered +
          (nowTimestamp <= offerExpirationTimestamp ? offerAmount : 0);
        return [newUnlocked, newCurrentlyOffered];
      },
      [unlockedTempBalance, 0]
    );

  const locked = total - unlocked;
  const maxToOffer = locked - currentlyOffered;

  return {
    total,
    vesting,
    unlocked,
    locked,
    currentlyOffered,
    maxToOffer,
  };
};
