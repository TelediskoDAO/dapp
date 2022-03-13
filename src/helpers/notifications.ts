import iziToast, { IziToastSettings } from "iziToast";

const DEFAULT_POSITION = "topRight";
const DEFAULT_TIMEOUT = 5000;

const notifications = {
  error: (
    message: string,
    overrides: IziToastSettings = {
      timeout: DEFAULT_TIMEOUT,
      position: DEFAULT_POSITION,
    }
  ) => {
    iziToast.error({
      title: "Oops",
      message,
      ...overrides,
    });
  },
  success: (
    message: string,
    overrides: IziToastSettings = {
      timeout: DEFAULT_TIMEOUT,
      position: DEFAULT_POSITION,
    }
  ) => {
    iziToast.success({
      title: "Ok",
      message,
      ...overrides,
    });
  },
  warning: (
    message: string,
    overrides: IziToastSettings = {
      timeout: DEFAULT_TIMEOUT,
      position: DEFAULT_POSITION,
    }
  ) => {
    iziToast.warning({
      title: "Heads up",
      message,
      ...overrides,
    });
  },
};

export const notifyNetworkError = () =>
  notifications.error(
    "It looks there's some congestion in the network. Please try again later refreshing the page."
  );
export const notifyBlockchainError = (msg: string) => {
  try {
    const blockChainError = msg.slice(
      msg.indexOf('"message":') + '"message":'.length + 1,
      msg.indexOf(',"data"') - 1
    );
    notifications.error(blockChainError);
  } catch (_) {}
  return msg;
};

export default notifications;
