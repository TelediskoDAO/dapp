import { expect } from "chai";

import { createDaoUserEntity } from "../mocks/daoUserEntityFactory";
import { computeBalances, bigIntToNum } from "../../../src/helpers/tokens";
import { createOfferEntity } from "../mocks/offerEntityFactory";
import { add, getUnixTime, sub } from "date-fns";

describe("Tokens helpers", () => {
  it("should correctly transform a bigInt to an integer", () => {
    expect(bigIntToNum(BigInt("42000000000000000000"))).to.eql(42);
  });

  describe("computeBalances", () => {
    it("should correctly compute the totals for a user with no offers", () => {
      const daoUserEntity = createDaoUserEntity();
      const computedBalances = computeBalances(daoUserEntity, []);

      expect(computedBalances).to.deep.equal({
        currentlyOffered: 0,
        locked: 42,
        total: 42,
        unlocked: 0,
        vesting: 0,
        maxToOffer: 42,
      });
    });

    it("should correctly compute the totals for a user with one non expired offer", () => {
      const now = Date.now();
      const expirationTimestamp = String(getUnixTime(add(now, { days: 1 })));

      const daoUserEntity = createDaoUserEntity();
      const offerEntity = createOfferEntity({
        expirationTimestamp,
        amount: BigInt("12000000000000000000"),
      });
      const computedBalances = computeBalances(daoUserEntity, [offerEntity]);

      expect(computedBalances).to.deep.equal({
        currentlyOffered: 12,
        locked: 42,
        total: 42,
        unlocked: 0,
        vesting: 0,
        maxToOffer: 30,
      });
    });

    it("should correctly compute the totals for a user with one expired offer", () => {
      const now = Date.now();
      const expirationTimestamp = String(getUnixTime(sub(now, { days: 1 })));

      const daoUserEntity = createDaoUserEntity();
      const offerEntity = createOfferEntity({
        expirationTimestamp,
        amount: BigInt("12000000000000000000"),
      });
      const computedBalances = computeBalances(daoUserEntity, [offerEntity]);

      expect(computedBalances).to.deep.equal({
        currentlyOffered: 0,
        locked: 30,
        total: 42,
        unlocked: 12,
        vesting: 0,
        maxToOffer: 30,
      });
    });

    it("should correctly compute the totals for a user with mixed offers", () => {
      const now = Date.now();
      const expirationTimestampPast = String(
        getUnixTime(sub(now, { days: 1 }))
      );
      const expirationTimestampPast1 = String(
        getUnixTime(sub(now, { days: 2 }))
      );
      const expirationTimestampFuture = String(
        getUnixTime(add(now, { days: 1 }))
      );
      const expirationTimestampFuture1 = String(
        getUnixTime(add(now, { days: 2 }))
      );

      const daoUserEntity = createDaoUserEntity({
        vestingBalance: BigInt("42000000000000000000"),
      });

      const offerEntityPast = createOfferEntity({
        expirationTimestamp: expirationTimestampPast,
        amount: BigInt("12000000000000000000"),
      });
      const offerEntityPast2 = createOfferEntity({
        expirationTimestamp: expirationTimestampPast1,
        amount: BigInt("2000000000000000000"),
      });
      const offerEntityFuture = createOfferEntity({
        expirationTimestamp: expirationTimestampFuture,
        amount: BigInt("22000000000000000000"),
      });
      const offerEntityFuture2 = createOfferEntity({
        expirationTimestamp: expirationTimestampFuture1,
        amount: BigInt("3000000000000000000"),
      });
      const computedBalances = computeBalances(daoUserEntity, [
        offerEntityPast,
        offerEntityPast2,
        offerEntityFuture,
        offerEntityFuture2,
      ]);

      expect(computedBalances).to.deep.equal({
        currentlyOffered: 25,
        locked: 28,
        total: 42,
        unlocked: 14,
        vesting: 42,
        maxToOffer: 3,
      });
    });

    it("should ignore offers from other users", () => {
      const now = Date.now();
      const expirationTimestamp = String(getUnixTime(sub(now, { days: 1 })));

      const daoUserEntity = createDaoUserEntity();
      const offerEntity = createOfferEntity({
        expirationTimestamp,
        from: "0x7fc365bd6c47779a97b2c65f39b80de197cf130d",
        amount: BigInt("12000000000000000000"),
      });
      const computedBalances = computeBalances(daoUserEntity, [offerEntity]);

      expect(computedBalances).to.deep.equal({
        currentlyOffered: 0,
        locked: 42,
        total: 42,
        unlocked: 0,
        vesting: 0,
        maxToOffer: 42,
      });
    });
  });
});
