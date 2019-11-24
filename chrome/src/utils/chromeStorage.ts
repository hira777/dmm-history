/**
 * @file chrome.storageを操作するためのメソッド群
 */

type StorageArea = 'sync' | 'local';

const get = ({
  storageArea = 'local',
  keys = null
}: {
  storageArea: StorageArea;
  keys: string | string[] | Record<string, any> | null;
}): Promise<{
  [key: string]: any;
}> =>
  new Promise(resolve =>
    chrome.storage[storageArea].get(keys, obj => resolve(obj))
  );

const set = ({
  storageArea = 'local',
  obj
}: {
  storageArea: StorageArea;
  obj: { [key: string]: any };
}): Promise<void> =>
  new Promise(resolve => chrome.storage[storageArea].set(obj, () => resolve()));

const clear = ({
  storageArea = 'local'
}: {
  storageArea: StorageArea;
}): Promise<void> =>
  new Promise(resolve => chrome.storage[storageArea].clear(() => resolve()));

export default {
  get,
  set,
  clear
};
