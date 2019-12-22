import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isNil from 'lodash/isNil';
import { compose } from 'redux';

const CONDITIONALS_TOKENS = {
  equal: '_eq_',
  notEqual: '_ne_',
  greater: '_gt_',
  less: '_le_',
  greaterEquals: '_gte_',
  lessEquals: '_lte_',
  between: '_between_',
  min: '_min_',
  max: '_max_'
};
const TOKENS = {
  ...CONDITIONALS_TOKENS,
  to: '_to_',
  and: '_and_'
};
const FILTER_SEPARATOR = ',';
const FILTER_KEY = 0;
const FILTER_VALUE = 1;
const findConditionalToken = filter =>
  Object.values(CONDITIONALS_TOKENS).find(token => filter.includes(token));

/** Transform the filters object to string urls
 *
 * @param {Object} filters - Current filters
 * @return {String} - adapted filters
 */
const codeFilter = (filterName, filterValue) => {
  if (typeof filterValue === 'string' || !isNaN(filterValue)) {
    return `${filterName}${TOKENS.equal}${filterValue}`;
  }

  if (Array.isArray(filterValue) && filterValue.length) {
    const joinedValues = filterValue.join(TOKENS.and);

    return `${filterName}${TOKENS.equal}${joinedValues}`;
  }

  if (typeof filterValue === 'object') {
    const { min, max } = filterValue;

    if (isNil(min) && isNil(max)) {
      return '';
    }

    if (!isNil(min) && isNil(max)) {
      return `${filterName}${TOKENS.min}${min}`;
    }

    if (isNil(min) && !isNil(max)) {
      return `${filterName}${TOKENS.max}${max}`;
    }

    return `${filterName}${TOKENS.between}${min}${TOKENS.to}${max}`;
  }

  return '';
};

const encodeFilters = filters => {
  const transformFilters = Object.keys(filters)
    .filter(
      name =>
        typeof filters[name] !== 'undefined' &&
        filters[name] !== null &&
        filters[name] !== '' &&
        (!isEmpty(filters[name]) || isNumber(filters[name]))
    )
    .map(name => codeFilter(name, filters[name]));

  return transformFilters.sort().join(FILTER_SEPARATOR);
};

const encodeFiltersUrl = compose(encodeURIComponent, encodeFilters);

/** Transform the filters urls to filter object
 *
 * @param {String} filters - Current filters
 * @return {Object} - adapted filters
 */
const decodeFilters = (filters = '') => {
  const filtersObj = {};

  filters.split(FILTER_SEPARATOR).map(filter => {
    const findCondition = findConditionalToken(filter);

    if (!findCondition) {
      return filtersObj;
    }

    const filterArr = filter.split(findCondition);
    const filterName = filterArr[FILTER_KEY];
    const filterValues =
      findCondition === TOKENS.between
        ? filterArr[FILTER_VALUE].split(TOKENS.to)
        : filterArr[FILTER_VALUE];

    if (Array.isArray(filterValues)) {
      filtersObj[filterName] = {};

      if (filterValues[FILTER_KEY]) {
        filtersObj[filterName].min = filterValues[FILTER_KEY];
      }
      if (filterValues[FILTER_VALUE]) {
        filtersObj[filterName].max = filterValues[FILTER_VALUE];
      }
      return filtersObj;
    }

    const multiFilter = filterValues.split(TOKENS.and);

    if (findCondition === TOKENS.min) {
      filtersObj[filterName] = {
        min: filterValues
      };
    } else if (findCondition === TOKENS.max) {
      filtersObj[filterName] = {
        max: filterValues
      };
    } else {
      filtersObj[filterName] = multiFilter.length >= 2 ? multiFilter : filterValues;
    }
    return filtersObj;
  });

  return filtersObj;
};

/** Transform the filters urls to filter object for relevance
 *
 * @param {String} filters - Current filters
 * @return {Object} - adapted filters
 */
const decodeRelevanceFilters = (filters = '') => {
  const filtersObj = {};

  filters.split(FILTER_SEPARATOR).map(filter => {
    const findCondition = findConditionalToken(filter);

    if (!findCondition) {
      return filtersObj;
    }

    const filterArr = filter.split(findCondition);
    const filterName = filterArr[FILTER_KEY];
    const filterValues =
      findCondition === TOKENS.between
        ? filterArr[FILTER_VALUE].split(TOKENS.to)
        : filterArr[FILTER_VALUE];

    if (Array.isArray(filterValues)) {
      if (filterValues[FILTER_KEY]) {
        filtersObj[`${filterName}_min`] = filterValues[FILTER_KEY];
      }
      if (filterValues[FILTER_VALUE]) {
        filtersObj[`${filterName}_max`] = filterValues[FILTER_VALUE];
      }
      return filtersObj;
    }

    const multiFilter = filterValues.split(TOKENS.and);

    if (findCondition === TOKENS.min) {
      filtersObj[`${filterName}_min`] = filterValues;
    } else if (findCondition === TOKENS.max) {
      filtersObj[`${filterName}_max`] = filterValues;
    } else {
      filtersObj[filterName] = multiFilter.length >= 2 ? multiFilter.join(',') : filterValues;
    }
    return filtersObj;
  });

  return filtersObj;
};

const filterRegex = /.*filter=(.*)&?.*/;
const exec = reg => val => reg.exec(val);
const takeIndex = index => a => a[index];
const mapNullEmpty = a => {
  return typeof a === 'undefined' || a === null ? [] : a;
};

const decodeFiltersUrl = compose(
  decodeFilters,
  decodeURIComponent,
  takeIndex(1),
  mapNullEmpty,
  exec(filterRegex)
);

const matchFilter = (filtersRedirect = [], originalPath) => {
  const filters = filtersRedirect.find(filter => {
    return filter.path === originalPath;
  });

  if (filters) {
    return filters.redirectPath;
  }

  return '';
};

const excludeFilters = (filters = {}, excludedFiltersKeys = []) => {
  if (excludedFiltersKeys && excludedFiltersKeys.length) {
    const filtersWithoutTheExcluded = Object.keys(filters)
      .filter(filter => !excludedFiltersKeys.includes(filter))
      .reduce((prev, curr) => ({ ...prev, [curr]: filters[curr] }), {});

    if (filters !== filtersWithoutTheExcluded) {
      return filtersWithoutTheExcluded;
    }
  }
  return filters;
};

/** Apply the filters to the current ones.
 *
 * @param {Object} filters - Current filters
 * @param {Object} values - values for filters (keys must be filter id)
 * @param {Array} availableFilters - Available filters to use
 * @param {Array} excludeNestedFilters - Value for exclude the nestedFilters
 * @return {Object} - Merged filters
 */
const applyFilter = (filtersParams, values, availableFilters, excludedNestedFilters) => {
  let filters = excludeFilters(filtersParams, excludedNestedFilters);

  if (values) {
    filters = {
      ...filters,
      ...values
    };

    Object.keys(values)
      .filter(k => k in values && Array.isArray(values[k]) && !values[k].length)
      .forEach(k => delete filters[k]);
  } else if (filters.category) {
    filters = { category: filters.category };
  } else {
    filters = {};
  }

  if (!availableFilters) {
    return filters;
  }

  return Object.keys(filters)
    .filter(f => availableFilters.find(af => af.id === f))
    .reduce(
      (f, k) =>
        Object.assign(f, {
          [k]: filters[k]
        }),
      {}
    );
};

/** Appends the filter (ie: adds the value to the existing one)
 * @param {Object} filters - Current applied filters
 * @param {String} id - key / id of the filter
 * @param {String / String[]} value - Value to be appended
 * @param {Array} availableFilters
 * @return {Object} - New filters
 */
const appendFilter = (filters, id, value, availableFilters) => {
  const oldValue = filters[id] || [];

  return applyFilter(
    filters,
    {
      [id]: [
        ...(Array.isArray(oldValue) ? oldValue : [oldValue]),
        ...(Array.isArray(value) ? value : [value])
      ]
    },
    availableFilters
  );
};

/**
 * Removes the filter name
 * @param {Object} filters - Current applied filters
 * @param {String} name - the name of the filter
 * @param {Array} excludeNestedFilters - nestedFilters to be excluded
 */
const removeFilter = (filtersParams, name, excludedNestedFilters) => {
  let filters = excludeFilters(filtersParams, excludedNestedFilters);
  const arrayOfName = name.split('|');

  if (arrayOfName.length > 1) {
    const index = filters[arrayOfName[0]].indexOf(arrayOfName[1]);

    filters = {
      ...filters,
      [arrayOfName[0]]: filters[arrayOfName[0]].filter((f, i) => i !== index)
    };
  } else {
    filters = excludeFilters(filters, [name]);
  }

  return filters;
};

/** Pops the filter value (or it removes it if it's the last)
 * @param {Object} filters - Current applied filters
 * @param {String} id - key / id of the filter
 * @param {String} value - Value to be poped
 * @param {Array} excludeNestedFilters - nestedFilters to be excluded
 */
const popFilter = (filters, id, value, excludeNestedFilters) => {
  if (!filters[id]) {
    return filters;
  }

  const values = (Array.isArray(filters[id]) ? filters[id] : [filters[id]]).filter(
    e => `${e}` !== `${value}`
  );

  if (values.length) {
    return applyFilter(filters, { [id]: values }, undefined, excludeNestedFilters);
  }

  return removeFilter(filters, id, excludeNestedFilters);
};

/** Checks if a filter is applied
 * @param {Object} filters - Current applied filters
 * @param {String} id - key / id of the filter
 * @param {String} value - Value to be poped
 * @return {Boolean}
 */
const isFilterApplied = (filters, id, value) => {
  const filter = filters[id];

  if (!filter) {
    return false;
  }

  if (Array.isArray(filter)) {
    return filter.find(f => `${f}` === `${value}`);
  }

  if (`${filter}` === `${value}`) {
    return true;
  }

  return false;
};

/** Checks if an applied filter is ranged value.
 * @param {Object} filter - Filter object
 * @return {Boolean}
 */
const isRangeFilter = filter =>
  filter.values &&
  filter.values[0] &&
  (filter.values[0].id === 'min' || filter.values[0].id === 'max');

/** Generates filters breadcrumb list.
 *
 * @param {Array} filter - Applied filters, it supports `item.parameters` and `getAppliedFilters` structure
 * @param {Function} builfFilterURL - Function that receives applied filters and returns the url.
 * @param {Object} location - Location where the item is.
 * @return {Array<{ text, href }>} List of applied filters to be shown
 *
 */
const getFilterHeirarchy = (filters, buildFilterURL, location) => {
  if (!filters) {
    return [];
  }

  const breadcrumbs = [];
  const findFilter = name => {
    const filter = filters.find(({ id, key }) => key === name || id === name);

    if (!filter) {
      return undefined;
    }

    let formattedValue;
    let value;

    if (filter.values) {
      if (filter.values.length !== 1) {
        return undefined;
      }

      const val = filter.values[0];

      value = val.id || val.key;
      formattedValue = val.description;
    } else {
      formattedValue = filter.formatted_value || filter.value_name || filter.value;
      value = filter.applied_value || filter.value;
    }

    return {
      formattedValue,
      value
    };
  };
  const getTitle = (filter, location) => {
    if (location) {
      return {
        translation: {
          id: 'categoryInLocation',
          values: {
            location: location.name,
            category: filter
          }
        }
      };
    }
    return {
      text: filter
    };
  };

  const makeFilter = findFilter('make');

  if (makeFilter) {
    breadcrumbs.push({
      ...getTitle(makeFilter.formattedValue, location),
      href: buildFilterURL({
        make: makeFilter.value
      })
    });

    const modelFilter = findFilter('model');

    if (modelFilter) {
      breadcrumbs.push({
        ...getTitle(modelFilter.formattedValue, location),
        href: buildFilterURL({
          make: makeFilter.value,
          model: modelFilter.value
        })
      });
    }
  }

  return breadcrumbs;
};

export {
  codeFilter,
  encodeFilters,
  encodeFiltersUrl,
  decodeFilters,
  decodeRelevanceFilters,
  decodeFiltersUrl,
  matchFilter,
  applyFilter,
  appendFilter,
  removeFilter,
  popFilter,
  isFilterApplied,
  isRangeFilter,
  getFilterHeirarchy
};
