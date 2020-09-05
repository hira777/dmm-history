let store = {};

function resolveKey(
  key: string | [] | Record<string, unknown>
): Record<string, unknown> {
  if (typeof key === 'string') {
    const result = {};
    result[key] = store[key];
    return result;
  } else if (Array.isArray(key)) {
    return key.reduce((accumulator, currentValue) => {
      accumulator[currentValue] = store[currentValue];
      return accumulator;
    }, {});
  } else if (typeof key === 'object') {
    return Object.keys(key).reduce((accumulator, currentValue) => {
      accumulator[currentValue] = store[currentValue];
      return accumulator;
    }, {});
  }

  throw new Error('Wrong key given');
}

export const storage = ['sync', 'local'].reduce((accumulator, storageArea) => {
  return {
    ...accumulator,
    ...{
      [storageArea]: {
        get: jest.fn((id, cb) => {
          const result = id === null ? store : resolveKey(id);
          if (cb !== undefined) {
            return cb(result);
          }
          return Promise.resolve(result);
        }),
        getBytesInUse: jest.fn((id, cb) => {
          if (cb !== undefined) {
            return cb(0);
          }
          return Promise.resolve(0);
        }),
        set: jest.fn((payload, cb) => {
          Object.keys(payload).forEach((key) => (store[key] = payload[key]));
          if (cb !== undefined) {
            return cb();
          }
          return Promise.resolve();
        }),
        remove: jest.fn((id, cb) => {
          const keys = typeof id === 'string' ? [id] : id;
          keys.forEach((key) => delete store[key]);
          if (cb !== undefined) {
            return cb();
          }
          return Promise.resolve();
        }),
        clear: jest.fn((cb) => {
          store = {};
          if (cb !== undefined) {
            return cb();
          }
          return Promise.resolve();
        }),
      },
    },
  };
}, {});
