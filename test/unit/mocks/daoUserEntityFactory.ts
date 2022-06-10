import type { DaoUser } from "../../../src/types";

const daoUser: DaoUser = {
  id: "0x7fc365bd6c47779a97b2c65f39b80de197cf130e",
  address: "0x7fc365bd6c47779a97b2c65f39b80de197cf130e",
  totalBalance: BigInt("42000000000000000000"),
  vestingBalance: BigInt(0),
  unlockedTempBalance: BigInt(0),
};

export const createDaoUserEntity = (overrides?: Partial<DaoUser>): DaoUser => ({
  ...daoUser,
  ...overrides,
});
