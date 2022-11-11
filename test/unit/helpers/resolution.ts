import { expect } from "chai";
import { mdiEye } from "@mdi/js";
import {
  createResolutionEntity,
  createEnhancedResolutionEntity,
} from "../mocks/resolutionEntityFactory";
import { getEnhancedResolutionMapper } from "../../../src/helpers/resolutions";
import { createResolutionsAcl } from "../mocks/resolutionsAclFactory";
import {
  RESOLUTION_STATES,
  getResolutionState,
} from "../../../src/helpers/resolutions";
import {
  getDateFromUnixTimestamp,
  getRelativeDateFromUnixTimestamp,
  getResolutionTypeInfo,
} from "../../../src/helpers/resolutions";

const FEB_25_2022_UNIX_TS = "1645808255"; // Fri Feb 25 2022 17:57:35
const FEB_26_2022_TS = 1645915897665; // Sat Feb 26 2022 23:51:37 GMT+0100 (Central European Standard Time)
const MAR_05_2022_TS = 1646445817665; // Sat Mar 05 2022 03:03:37 GMT+0100 (Central European Standard Time)
const MAR_10_2022_TS = 1646945817665; // Thu Mar 10 2022 21:56:57 GMT+0100 (Central European Standard Time)

describe("Resolution helpers", () => {
  it("should get a date from a unix timestamp", () => {
    const unixTs = FEB_25_2022_UNIX_TS;
    expect(getDateFromUnixTimestamp(unixTs)).to.be.an.instanceof(Date);
  });

  it("should get a relative date from a unix timestamp", () => {
    const unixTs = FEB_25_2022_UNIX_TS;
    const fixedDate = new Date(1645802279713);
    expect(getRelativeDateFromUnixTimestamp(unixTs, fixedDate)).to.eq(
      "today at 5:57 PM"
    );
  });

  describe("getResolutionTypeInfo", () => {
    it("should correctly handle a non approved resolution", () => {
      const resolutionEntity = createResolutionEntity();
      const resolutionTypeInfo = getResolutionTypeInfo(resolutionEntity);

      expect(resolutionTypeInfo).to.deep.equal({
        noticePeriodEnds: null,
        noticePeriodEndsAt: null,
        votingEnds: null,
        votingEndsAt: null,
      });
    });

    it("should correctly handle an approved resolution", () => {
      const resolutionEntity = createResolutionEntity({
        approveTimestamp: FEB_25_2022_UNIX_TS,
      });
      const resolutionTypeInfo = getResolutionTypeInfo(resolutionEntity);

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
      const resolutionTypeInfo = getResolutionTypeInfo(resolutionEntity);
      const resolutionState = getResolutionState(
        resolutionEntity,
        Date.now(),
        resolutionTypeInfo
      );

      expect(resolutionState).to.eq(RESOLUTION_STATES.PRE_DRAFT);
    });

    it("should correctly return a NOTICE state", () => {
      const resolutionEntity = createResolutionEntity({
        approveTimestamp: FEB_25_2022_UNIX_TS,
      });
      const resolutionTypeInfo = getResolutionTypeInfo(resolutionEntity);
      const resolutionState = getResolutionState(
        resolutionEntity,
        FEB_26_2022_TS,
        resolutionTypeInfo
      );

      expect(resolutionState).to.eq(RESOLUTION_STATES.NOTICE);
    });

    it("should correctly return a VOTING state", () => {
      const resolutionEntity = createResolutionEntity({
        approveTimestamp: FEB_25_2022_UNIX_TS,
      });
      const resolutionTypeInfo = getResolutionTypeInfo(resolutionEntity);
      const resolutionState = getResolutionState(
        resolutionEntity,
        MAR_05_2022_TS,
        resolutionTypeInfo
      );

      expect(resolutionState).to.eq(RESOLUTION_STATES.VOTING);
    });

    it("should correctly return an ENDED state", () => {
      const resolutionEntity = createResolutionEntity({
        approveTimestamp: FEB_25_2022_UNIX_TS,
      });
      const resolutionTypeInfo = getResolutionTypeInfo(resolutionEntity);
      const resolutionState = getResolutionState(
        resolutionEntity,
        MAR_10_2022_TS,
        resolutionTypeInfo
      );

      expect(resolutionState).to.eq(RESOLUTION_STATES.ENDED);
    });

    it("should correctly return a REJECTED state", () => {
      const resolutionEntity = createResolutionEntity({
        rejectTimestamp: FEB_25_2022_UNIX_TS,
      });
      const resolutionTypeInfo = getResolutionTypeInfo(resolutionEntity);
      const resolutionState = getResolutionState(
        resolutionEntity,
        MAR_10_2022_TS,
        resolutionTypeInfo
      );

      expect(resolutionState).to.eq(RESOLUTION_STATES.REJECTED);
    });
  });

  describe("getEnhancedResolutionMapper", () => {
    it("should correctly enhance a resolution entity coming from subgraph", () => {
      const resolutionEntity = createResolutionEntity();
      const acl = createResolutionsAcl();

      const mapper = getEnhancedResolutionMapper(
        Number(FEB_25_2022_UNIX_TS) * 1000,
        acl
      );
      const enhancedResolution = mapper(resolutionEntity);

      const exptectedOutput = createEnhancedResolutionEntity();

      expect(enhancedResolution).to.deep.equal(exptectedOutput);
    });

    describe("ACL", () => {
      it("should correctly map a resolution for a FOUNDER", () => {
        const resolutionEntity = createResolutionEntity();
        const acl = createResolutionsAcl();

        const mapper = getEnhancedResolutionMapper(
          Number(FEB_25_2022_UNIX_TS) * 1000,
          acl
        );
        const enhancedResolution = mapper(resolutionEntity);

        const exptectedOutput = createEnhancedResolutionEntity();

        expect(enhancedResolution).to.deep.equal(exptectedOutput);
      });

      it("should correctly map a resolution for a CONTRIBUTOR", () => {
        const resolutionEntity = createResolutionEntity();
        const acl = createResolutionsAcl({
          canApprove: false,
          canUpdate: false,
        });

        const mapper = getEnhancedResolutionMapper(
          Number(FEB_25_2022_UNIX_TS) * 1000,
          acl
        );
        const enhancedResolution = mapper(resolutionEntity);

        const exptectedOutput = createEnhancedResolutionEntity({
          href: "#/resolutions/42",
          action: {
            label: "View",
            disabled: false,
            icon: mdiEye,
          },
        });

        expect(enhancedResolution).to.deep.equal(exptectedOutput);
      });
    });
  });
});
