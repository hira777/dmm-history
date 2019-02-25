import { ROOT_KEY, HISTORIES_KEY } from '../config';

const chromeStorageUpdater = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type === 'REMOVE_ITEM') {
      const entity = {};

      entity[ROOT_KEY] = {};
      entity[ROOT_KEY][HISTORIES_KEY] = state.items;
      chrome.storage.local.set(entity);
    }
  });
};

export default chromeStorageUpdater;
