import iziToast, { IziToastSettings } from "iziToast";

const DEFAULT_POSITION = "topRight";
const DEFAULT_TIMEOUT = 5000;

const DEFAULTS: IziToastSettings = {
  timeout: DEFAULT_TIMEOUT,
  position: DEFAULT_POSITION,
};

const notifications = {
  error: (message: string, overrides: IziToastSettings = {}) => {
    iziToast.error({
      title: "Oops",
      message,
      ...{ ...DEFAULTS, ...overrides },
    });
  },
  success: (message: string, overrides: IziToastSettings = {}) => {
    iziToast.success({
      title: "Ok",
      message,
      ...{ ...DEFAULTS, ...overrides },
    });
  },
  warning: (message: string, overrides: IziToastSettings = {}) => {
    iziToast.warning({
      title: "Heads up",
      message,
      ...{ ...DEFAULTS, ...overrides },
    });
  },
};

export const notifyNetworkError = () =>
  notifications.error(
    "It looks there's some congestion in the network. Please try again later refreshing the page."
  );

const MESSAGE_DETECT_START = '"message":';
const MESSAGE_DETECT_END = ',"data"';

export const notifyBlockchainError = (msg: string) => {
  if (msg.indexOf(MESSAGE_DETECT_START) === -1) {
    return notifications.error(msg);
  }
  try {
    const humanReadableError = msg.slice(
      msg.indexOf(MESSAGE_DETECT_START) + MESSAGE_DETECT_START.length + 1,
      msg.indexOf(MESSAGE_DETECT_END) - 1
    );
    return notifications.error(humanReadableError);
  } catch (_) {}
  return notifications.error(msg);
};

export default notifications;
