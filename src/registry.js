import config from './config';
import { noop, upperFirst } from './util';

let registry = new Map();
const stack = [];
export const keys = Object.freeze(['server', 'models', 'pubsub']);

for (let key of keys) {
  const Key = upperFirst(key);

  exports[`provide${Key}`] = (value) => {
    registry.set(key, value);

    return value;
  };

  exports[`use${Key}`] = () => {
    return registry.get(key);
  };
}

export const get = (key) => {
  if (!has(key)) {
    throw Error(`"${key.toString()}" was not provided!`);
  }

  return registry.get(key);
};

export const set = (key, value) => {
  registry.set(key, value);
};

export const has = (key) => {
  return registry.has(key);
};

// Affects the global registry exported from this module. Useful to change the resolved
// values across diffrent components in the project.
// DO NOT expose it, it's dangerous to use it explicitly
const fork = () => {
  const child = new Map(registry);
  stack.push(registry);
  registry = child;
};

const converge = () => {
  if (!stack.length) {
    throw Error('Cannot converge from root registry');
  }

  registry = stack.pop();
};

export const forkBefore = (beforeCb = noop) => {
  if (!config.isTest) {
    throw Error(`expected env to be "test", got "${config.env}" instead`);
  }

  global.before(() => {
    fork();
    beforeCb();
  });
  global.after(converge);
};

export const forkBeforeEach = (beforeEachCb = noop) => {
  if (!config.isTest) {
    throw Error(`expected env to be "test", got "${config.env}" instead`);
  }

  global.beforeEach(() => {
    fork();
    beforeEachCb();
  });
  global.afterEach(converge);
};

export const forkRegistry = (cb) => {
  fork();

  let result;
  try {
    result = cb();
  }
  finally {
    if (result && typeof result.then == 'function' && typeof result.catch == 'function') {
      result = result.then((r) => {
        converge();

        return r;
      }, (e) => {
        converge();

        return Promise.reject(e);
      });
    }
    else {
      converge();
    }
  }

  return result;
};
