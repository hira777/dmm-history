/**
 * @file chrome.storageを操作するためのメソッド群
 */

type StorageArea = 'sync' | 'local';

const get = ({
  storageArea = 'local',
  keys = null
}: {
  storageArea?: StorageArea;
  keys: string | string[] | Record<string, unknown> | null;
}): Promise<{ [key: string]: unknown }> => {
  return new Promise((resolve) =>
    chrome.storage[storageArea].get(keys, (obj) => resolve(obj))
  );
};

const set = ({
  storageArea = 'local',
  obj
}: {
  storageArea?: StorageArea;
  obj: { [key: string]: unknown };
}): Promise<void> => {
  return new Promise((resolve) =>
    chrome.storage[storageArea].set(obj, () => resolve())
  );
};

const clear = ({
  storageArea = 'local'
}: {
  storageArea: StorageArea;
}): Promise<void> => {
  return new Promise((resolve) =>
    chrome.storage[storageArea].clear(() => resolve())
  );
};

const remove = ({
  storageArea = 'local',
  keys
}: {
  storageArea?: StorageArea;
  keys: string | string[];
}): Promise<void> => {
  return new Promise((resolve) =>
    chrome.storage[storageArea].remove(keys, () => resolve())
  );
};

export default {
  get,
  set,
  clear,
  remove
};
