import { expect } from "chai";

import { createResolutionEntity } from "../mocks/resolutionEntityFactory";
import resolutionContractTypes from "../mocks/resolutionContractTypes.json";
import {
  RESOLUTION_STATES,
  getResolutionState,
} from "../../../src/helpers/resolutions";
import {
  getDateFromUnixTimestamp,
  getRelativeDateFromUnixTimestamp,
  getResolutionTypeInfo,
} from "../../../src/helpers/resolutions";

const APPROVE_UNIX_TS = "1645808255"; // Fri Feb 25 2022 17:57:35
const NOTICE_TS = 1645915897665; // Sat Feb 26 2022 23:51:37 GMT+0100 (Central European Standard Time)
const VOTING_TS = 1646445817665; // Sat Mar 05 2022 03:03:37 GMT+0100 (Central European Standard Time)
const ENDED_TS = 1646945817665; // Thu Mar 10 2022 21:56:57 GMT+0100 (Central European Standard Time)

describe("Resolution helpers", () => {
  it("should get a date from a unix timestamp", () => {
    const unixTs = APPROVE_UNIX_TS;
    expect(getDateFromUnixTimestamp(unixTs)).to.be.an.instanceof(Date);
  });

  it("should get a relative date from a unix timestamp", () => {
    const unixTs = APPROVE_UNIX_TS;
    const fixedDate = new Date(1645802279713);
    expect(getRelativeDateFromUnixTimestamp(unixTs, fixedDate)).to.eq(
      "today at 5:57 PM"
    );
  });

  describe("getResolutionTypeInfo", () => {
    it("should correctly handle a non approved resolution", () => {
      const resolutionEntity = createResolutionEntity();
      const resolutionType = resolutionContractTypes[resolutionEntity.typeId];
      const resolutionTypeInfo = getResolutionTypeInfo(
        resolutionEntity,
        resolutionType
      );

      expect(resolutionTypeInfo).to.deep.equal({
        noticePeriodEnds: null,
        noticePeriodEndsAt: null,
        votingEnds: null,
        votingEndsAt: null,
      });
    });

    it("should correctly handle an approved resolution", () => {
      const resolutionEntity = createResolutionEntity({
        approveTimestamp: APPROVE_UNIX_TS,
      });
      const resolutionType = resolutionContractTypes[resolutionEntity.typeId];
      const resolutionTypeInfo = getResolutionTypeInfo(
        resolutionEntity,
        resolutionType
      );

      expect(resolutionTypeInfo).to.deep.equal({
        noticePeriodEnds: new Date("2022-03-03T16:57:35.000Z"),
        noticePeriodEndsAt: "03 Mar 2022, 17:57:35",
        votingEnds: new Date("2022-03-07T16:57:35.000Z"),
        votingEndsAt: "07 Mar 2022, 17:57:35",
      });
    });
  });

  describe("getResolutionState", () => {
    it("should correctly return a PRE_DRAFT state", () => {
      const resolutionEntity = createResolutionEntity();
      const resolutionType = resolutionContractTypes[resolutionEntity.typeId];
      const resolutionTypeInfo = getResolutionTypeInfo(
        resolutionEntity,
        resolutionType
      );
      const resolutionState = getResolutionState(
        resolutionEntity,
        +new Date(),
        resolutionTypeInfo
      );

      expect(resolutionState).to.eq(RESOLUTION_STATES.PRE_DRAFT);
    });

    it("should correctly return a NOTICE state", () => {
      const resolutionEntity = createResolutionEntity({
        approveTimestamp: APPROVE_UNIX_TS,
      });
      const resolutionType = resolutionContractTypes[resolutionEntity.typeId];
      const resolutionTypeInfo = getResolutionTypeInfo(
        resolutionEntity,
        resolutionType
      );
      const resolutionState = getResolutionState(
        resolutionEntity,
        NOTICE_TS,
        resolutionTypeInfo
      );

      expect(resolutionState).to.eq(RESOLUTION_STATES.NOTICE);
    });

    it("should correctly return a VOTING state", () => {
      const resolutionEntity = createResolutionEntity({
        approveTimestamp: APPROVE_UNIX_TS,
      });
      const resolutionType = resolutionContractTypes[resolutionEntity.typeId];
      const resolutionTypeInfo = getResolutionTypeInfo(
        resolutionEntity,
        resolutionType
      );
      const resolutionState = getResolutionState(
        resolutionEntity,
        VOTING_TS,
        resolutionTypeInfo
      );

      expect(resolutionState).to.eq(RESOLUTION_STATES.VOTING);
    });

    it("should correctly return an ENDED state", () => {
      const resolutionEntity = createResolutionEntity({
        approveTimestamp: APPROVE_UNIX_TS,
      });
      const resolutionType = resolutionContractTypes[resolutionEntity.typeId];
      const resolutionTypeInfo = getResolutionTypeInfo(
        resolutionEntity,
        resolutionType
      );
      const resolutionState = getResolutionState(
        resolutionEntity,
        ENDED_TS,
        resolutionTypeInfo
      );

      expect(resolutionState).to.eq(RESOLUTION_STATES.ENDED);
    });
  });
});
