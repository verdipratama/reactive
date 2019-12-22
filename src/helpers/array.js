export const flatMap = fn => arr => {
  // map but remove undefined
  const newArr = [];

  if (typeof arr === 'undefined' || arr === null) {
    return newArr;
  }

  arr.forEach((item, index) => {
    const mapedItem = fn(item, index, arr);

    if (typeof mapedItem !== 'undefined' && mapedItem !== null) {
      newArr.push(mapedItem);
    }
  });

  return newArr;
};

/**
* @function recursiveFindBy
* @description Method to find an object into a nested structure
// @ts-ignore
* @param {String} search
* @param {Array} options
* @param {String} childKey
* @returns {Object} The found object
*/
const iterator = (options = [], key = 'id', value, childKey = 'children') =>
  options.reduce((acc, curr) => {
    let child = [];

    if (curr[childKey] && curr[childKey].length > 0) {
      child = iterator(curr[childKey], key, value, childKey);
    }

    if (curr[key] === value) {
      return [curr];
    }

    return [...acc, ...child];
  }, []);

export const recursiveFindBy = (options, key, value, childKey) => {
  const find = iterator(options, key, value, childKey);

  return find && find.length ? find[0] : undefined;
};
