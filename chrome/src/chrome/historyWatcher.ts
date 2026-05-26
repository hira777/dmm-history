import { URL_CHANGE_EVENT } from '@/enums';

const dispatchUrlChange = (): void => {
  window.dispatchEvent(new Event(URL_CHANGE_EVENT));
};

const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function pushState(
  ...args: Parameters<typeof history.pushState>
): void {
  originalPushState.apply(this, args);
  dispatchUrlChange();
};

history.replaceState = function replaceState(
  ...args: Parameters<typeof history.replaceState>
): void {
  originalReplaceState.apply(this, args);
  dispatchUrlChange();
};

window.addEventListener('popstate', dispatchUrlChange);
