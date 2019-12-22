function clone(source) {
  if (Array.isArray(source)) {
    return source.map(value => clone(value));
  } else if (source && typeof source === 'object') {
    return Object.keys(source).reduce((memo, key) => {
      memo[key] = clone(source[key]);
      return memo;
    }, {});
  }
  return source;
}

/* @this ctx */
function merge() {
  const ctx = this || {};
  const [target, source, ...rest] = [...arguments].map(arg => clone(arg));

  if (typeof source === 'undefined' || (typeof source === 'object' && !source)) {
    return rest.length ? merge.call(ctx, target, ...rest) : target;
  }
  if (typeof target === 'undefined' || (typeof target === 'object' && !target)) {
    return rest.length ? merge.call(ctx, source, ...rest) : source;
  }
  if (typeof target === typeof source) {
    if (!Array.isArray(source) && typeof source === 'object') {
      for (const key of Object.keys(source)) {
        target[key] = merge.call(
          {
            files: ctx.files,
            keys: (ctx.keys || []).concat(key)
          },
          target[key],
          source[key]
        );
      }
      return rest.length ? merge.call(ctx, target, ...rest) : target;
    }
    return rest.length ? merge.call(ctx, source, ...rest) : source;
  }
  throw new TypeError(
    `Type missmatch (${typeof source} over ${typeof target}) trying to MERGE '${ctx.files.join(
      "' over '"
    )}' at key '${(ctx.keys || []).join(' -> ')}'.`
  );
}

/* @this ctx */
function combine() {
  const ctx = this || {};
  const [target, source, ...rest] = [...arguments].map(arg => clone(arg));

  if (typeof source === 'undefined' || (typeof source === 'object' && !source)) {
    return rest.length ? combine.call(ctx, target, ...rest) : target;
  }
  if (typeof target === 'undefined' || (typeof target === 'object' && !target)) {
    return rest.length ? combine.call(ctx, source, ...rest) : source;
  }
  if (
    !Array.isArray(source) &&
    typeof source === 'object' &&
    !Array.isArray(target) &&
    typeof target === 'object'
  ) {
    const targetKeys = Object.keys(target);
    const sourceKeys = Object.keys(source);

    for (const key of targetKeys.concat(sourceKeys.filter(key => !targetKeys.includes(key)))) {
      target[key] = combine.call(
        {
          files: ctx.files,
          keys: (ctx.keys || []).concat(key)
        },
        target[key],
        source[key]
      );
    }
    return rest.length ? combine.call(ctx, target, ...rest) : target;
  }
  throw new TypeError(
    `Ambiguous value trying to COMBINE '${ctx.files.join("' with '")}' at key '${(
      ctx.keys || []
    ).join(' -> ')}'.`
  );
}

const isUndefined = value => typeof value === 'undefined';
const isObject = object => !isUndefined(object) && object != null && typeof object === 'object';

const isEmpty = object =>
  !isObject(object) || (Object.keys(object).length === 0 && object.constructor === Object);

const clean = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && (typeof obj[key] === 'undefined' || obj[key] === '')) {
      delete obj[key];
    }
  }
  return obj;
};

/**
 * @function pickBy
 * @description Native implementation of loadash "pickBy"
 *
 * @param {Object} object
 *
 * @returns {Object} Sanitized object
 */
const pickBy = object => {
  const obj = {};

  for (const key in object) {
    if (object[key] !== null && object[key] !== false && object[key] !== undefined) {
      obj[key] = object[key];
    }
  }

  return obj;
};

const resolve = (obj, path) => {
  const properties = path.split('.');
  const resolvedValue = properties.reduce((prev, curr) => prev && prev[curr], obj);

  if (!resolvedValue) {
    return '';
  }
  return resolvedValue;
};

export { clone, merge, combine, isEmpty, isUndefined, isObject, clean, pickBy, resolve };
