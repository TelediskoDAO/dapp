import type { Offer } from "../../../src/types";

const offer: Offer = {
  id: "0x0-0x7fc365bd6c47779a97b2c65f39b80de197cf130e",
  from: "0x7fc365bd6c47779a97b2c65f39b80de197cf130e",
  expirationTimestamp: "1654275557",
  amount: BigInt("1000000000000000000"),
};

export const createOfferEntity = (overrides?: Partial<Offer>): Offer => ({
  ...offer,
  ...overrides,
});
