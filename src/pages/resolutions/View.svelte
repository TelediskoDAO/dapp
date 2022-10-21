<script lang="ts">
  import { onMount } from "svelte";
  import CircularProgress from "@smui/circular-progress";
  import { location } from "svelte-spa-router";

  import ResolutionView from "../../components/ResolutionView.svelte";
  import { getResolutionQuery } from "../../graphql/get-resolution.query";
  import { graphQLClient } from "../../net/graphQl";
  import type {
    DaoManagerEntity,
    ResolutionEntity,
    ResolutionEntityEnhanced,
  } from "../../types";
  import { getEnhancedResolutionMapper } from "../../helpers/resolutions";
  import { acl, currentTimestamp } from "../../state/resolutions";
  import CurrentTimestamp from "../../components/CurrentTimestamp.svelte";
  import { usersWithEthereumAddress } from "../../state/odoo";
  import Alert from "../../components/Alert.svelte";
  import { getResolutionAndDaoManagerQuery } from "../../graphql/get-resolution-and-dao-manager.query";

  type Params = {
    resolutionId: string;
  };

  export let params: Params = {
    resolutionId: "",
  };

  let resolutionData: ResolutionEntity;
  let daoManagerData: DaoManagerEntity;
  let resolutionDataEnhanced: ResolutionEntityEnhanced;
  let isPrint = /\/print$/.test($location);
  let stillLoading = false;

  async function fethAndSetResolutionData() {
    const {
      resolution,
      daoManager,
    }: {
      resolution: ResolutionEntity;
      daoManager: DaoManagerEntity;
    } = await graphQLClient.request(getResolutionAndDaoManagerQuery, {
      id: params.resolutionId,
    });
    resolutionData = resolution;
    daoManagerData = daoManager;
  }

  onMount(async () => {
    await fethAndSetResolutionData();

    const checkIfStillLoading = () => {
      stillLoading =
        Object.keys($usersWithEthereumAddress).length === 0 && isPrint;
    };

    const interval = setInterval(fethAndSetResolutionData, 5000);
    const timeout = setTimeout(checkIfStillLoading, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  });

  $: {
    if (resolutionData && $acl) {
      resolutionDataEnhanced = getEnhancedResolutionMapper(
        $currentTimestamp,
        $acl
      )(resolutionData);
    }
  }
</script>

<section>
  {#if !resolutionDataEnhanced || (Object.keys($usersWithEthereumAddress).length === 0 && isPrint)}
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
    {#if stillLoading}
      <Alert
        type="warning"
        message="You should login to be able to print the resolution"
      />
    {/if}
  {:else}
    <CurrentTimestamp />
    <ResolutionView {daoManagerData} resolution={resolutionDataEnhanced} />
  {/if}
</section>
