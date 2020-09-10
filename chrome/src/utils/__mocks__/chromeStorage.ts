/**
 * @file chrome.storageを操作するためのメソッド群
 */

type StorageArea = 'sync' | 'local';

const get = (): Promise<{ [key: string]: unknown }> => {
  console.log(222);
  return new Promise((resolve) => resolve());
};

const set = ({
  storageArea = 'local',
  obj,
}: {
  storageArea?: StorageArea;
  obj: { [key: string]: unknown };
}): Promise<void> => {
  return new Promise((resolve) =>
    chrome.storage[storageArea].set(obj, () => resolve())
  );
};

const clear = ({
  storageArea = 'local',
}: {
  storageArea: StorageArea;
}): Promise<void> => {
  return new Promise((resolve) =>
    chrome.storage[storageArea].clear(() => resolve())
  );
};

export default {
  get,
  set,
  clear,
};
