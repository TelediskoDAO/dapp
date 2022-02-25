import { expect } from "chai";
import {
  getDateFromUnixTimestamp,
  getRelativeDateFromUnixTimestamp,
} from "../../../src/helpers/resolutions";

describe("Resolution helpers", () => {
  it("should get a date from a unix timestamp", () => {
    const unixTs = "1645470817";
    expect(getDateFromUnixTimestamp(unixTs)).to.be.an.instanceof(Date);
  });

  it("should get a relative date from a unix timestamp", () => {
    const unixTs = "1645470817";
    const fixedDate = new Date(1645802279713);
    expect(getRelativeDateFromUnixTimestamp(unixTs, fixedDate)).to.eq(
      "last Monday at 8:13 PM"
    );
  });
});
