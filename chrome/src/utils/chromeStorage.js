/**
 * @file chrome.storageを操作するためのメソッド群
 */

const get = ({ storageArea = 'local', keys = null }) =>
  new Promise(resolve =>
    chrome.storage[storageArea].get(keys, obj => resolve(obj))
  );

const set = ({ storageArea = 'local', obj }) =>
  new Promise(resolve => chrome.storage[storageArea].set(obj, () => resolve()));

const clear = ({ storageArea = 'local' }) =>
  new Promise(resolve => chrome.storage[storageArea].clear(() => resolve()));

export default {
  get,
  set,
  clear
};
