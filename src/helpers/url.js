'use strict';

import isString from 'lodash/isString';
import { encodeFilters } from './filters';
import { encodeSearch, slugify, camelize, decodeSearch, safelyDecodeURIComponent } from './strings';
import { decodeFilters } from './filters';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import { COUNTRY } from 'Constants/locations';
import * as objectsHelper from 'Helpers/objects';

/** Joins url paths cleaning trailing slashs
 * @param {String} ... - Parts of url
 * @return {String} joined url without trailing slashes
 */
const urlJoin = (...args) =>
    args.map(a => a.trim().replace(/^\/|\/$/g, ''))
    .filter(a => a)
    .join('/');

/** Method to prevent diferents encodes of the space character. The API is encoding it with + and encodeURIComponent use another encode. In order compare query params and avoid errors, both encoded characters are compare as the space character
 * @param {String} queryParams1 - the first query params
 * @param {String} queryParams2 - the second query params
 * @return {Boolean} return if the query params are equals even if they had diferent encoding for the space.
 */
const compareEncodedParams = (param1, param2) => {
    const replace1 = param1.replace(/%20|%2B/g, ' ');
    const replace2 = param2.replace(/%20|%2B/g, ' ');

    return replace1 === replace2;
};

const defaultParamsToQueryStringSerializer = value => JSON.stringify(value);
/** Serialize a param object into a query string.
 * @param {Object} params - Any object
 * @param {Function serialize - Function to serialize objects `(value : Object, key : String) => String`
 *                              by default JSON.stringify is used.
 * @return {String} query string
 */
const paramsToQueryString = (params, serialize = defaultParamsToQueryStringSerializer) =>
    Object.keys(params || {})
        .map(key => [
            key,
            typeof params[key] === 'string'
                ? params[key]
                : serialize(params[key], key)
        ])
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

const queryStringToParams = queryString => {
    const response = {};
    const decodedQS = decodeURI(queryString).split('&');

    forEach(decodedQS, param => {
        const [paramKey, paramValue] = param.split('=');

        try {
            response[paramKey] = JSON.parse(paramValue);
        }
        catch (e) {
            response[paramKey] = safelyDecodeURIComponent(paramValue);
        }
    });

    return response;
};

const getUrlParams = url => {
    const urlSplitted = url.split('/').slice(1);

    return filter(urlSplitted, el => (isNumber(parseInt(el, 10)) && !isNaN(parseInt(el, 10))));
};

// Function is repeated in `src/server/helpers/url.js : getSlugs
const getSlugs = path => {
    if (!path) {
        return [];
    }

    const slugs = path.split('/');

    slugs.shift();

    if (slugs[slugs.length - 1] === '') {
        slugs.pop();
    }

    return slugs;
};

/**
 * Please use `buildURL`.
 */
const createURL = (params = {}, pathname) => {
    const slug = [''];
    const { location, category, search } = params;
    const [firstSlug, secondSlug] = getSlugs(pathname);

    if (location) {
        if (location.name && location.id && location.type !== COUNTRY) {
            const locationSlug = slugify(location.name);

            slug.push(`${ locationSlug }_g${ location.id }`);
        }
    }
    else if (firstSlug && firstSlug.includes('_g')) {
        slug.push(firstSlug);
    }

    if (category && category.name) {
        const categorySlug = slugify(category.name);

        slug.push(`${ categorySlug }_c${ category.id }`);
    }
    else if (firstSlug && firstSlug.includes('_c')) {
        slug.push(firstSlug);
    }
    else if (secondSlug && secondSlug.includes('_c')) {
        slug.push(secondSlug);
    }

    if (search) {
        if (slug.length === 1) {
            slug.push('items');
        }

        slug.push(`q-${encodeSearch(search)}`);
    }
    else if (pathname && pathname.includes('/q-')) {
        if (slug.length === 1) {
            slug.push('items');
        }

        slug.push(pathname.slice(pathname.indexOf('/q-') + 1));
    }

    return slug.join('/');
};

const filterParamsToQueryStringSerializer = (value, key) => {
    if (key !== 'filter') {
        return defaultParamsToQueryStringSerializer(value, key);
    }

    return encodeFilters(value);
};

/** Build a (Listing) Url.
 *
 * @param {Object} - {
 *   {Object} location - Location object { name, id, type }
 *   {Object} category - Category object (Redux structure)
 *   {String} search - Search string
 *   {Object} params - Query params (it should include the `filter`)
 * }
 * @param {Object} - {
 *   {Boolean} useFakeLevelSlug - True to use the fake l3 slugging
 * }
 * @return {String} Full url
 */
const buildURL = ({ location, category, search, params, base } = {}, { useFakeLevelSlug, categoryCover = {}} = {}) => {
    const url = [];

    if (location && location.id && location.name && location.type !== 'COUNTRY') {
        url.push(`${ slugify(location.name) }_g${ location.id }`);
    }

    if (category && category.id && category.name) {
        const slug = [];

        if (useFakeLevelSlug && params && params.filter && category.params) {
            const filter = isString(params.filter) ? decodeFilters(params.filter) : params.filter;

            slug.push(
                ...category.params
                    .filter(param => !Array.isArray(filter[param.key]))
                    .filter(({ key, definitions }) => {
                        if (
                            !filter[key]
                            || !definitions
                            || !definitions.search
                            || !definitions.search.rules
                        ) {
                            return false;
                        }

                        return definitions.search.rules.find(rule => rule.id === 'hasSlug');
                    })
                    .map(param => {
                        const key = filter[param.key];
                        const value = param.values && param.values.find(({ key: k }) => k === key);

                        if (value) {
                            return slugify(value.name);
                        }

                        return slugify(key);
                    })
            );
        }

        if (categoryCover[category.id]) {
            params = {
                ...params,
                'show-more': true
            };
        }

        slug.push(`${slugify(category.name)}_c${category.id}`);
        url.push(slug.join('-'));
    }

    if (url.length === 0) {
        url.push(base || 'items');
    }

    if (search) {
        url.push(`q-${ encodeSearch(search) }`);
    }

    const joinedUrl = `/${urlJoin(...url)}`;

    if (params) {
        if (
            !params.filter
            || Object.keys(params.filter).length === 0
            || params.filter.length === 0
        ) {
            params = { ...params };
            delete params.filter;
        }

        return [joinedUrl, paramsToQueryString(params, filterParamsToQueryStringSerializer)]
            .filter(e => e)
            .join('?');
    }

    return joinedUrl;
};

const splitStringByToken = (string, token) => string.split(token);

/**
 * Build Object from a URL
 * @param {String} url - the url for convert into url object
 * @returns {Object} - {
 *    {String} [path]       - base path
 *    {Object} [location]   - location object { name, id }
 *    {Object} [category]   - category object { name, id }
 *    {Object} [item]       - item object { name, id }
 *    {String} [search]     - search term in the url
 *    {Object} [params]     - url query params { page, sorting, filters }
 * }
*/
const buildObjectFromURL = (fullUrl = '') => {
    const [url, params] = splitStringByToken(fullUrl, '?');
    const urlObject = getSlugs(url).reduce((prev, curr) => {
        if (curr.includes('_g')) {
            const [name, id] = splitStringByToken(curr, '_g');

            return {
                ...prev,
                location: {
                    id,
                    name: camelize(decodeSearch(name))
                }
            };
        }
        if (curr.includes('_c')) {
            const [name, id] = splitStringByToken(curr, '_c');

            return {
                ...prev,
                category: {
                    id,
                    name: camelize(decodeSearch(name))
                }
            };
        }
        if (curr.includes('q-')) {
            return {
                ...prev,
                search: curr.slice(2)
            };
        }
        if (curr.includes('-iid-')) {
            const [name, id] = splitStringByToken(curr, '-iid-');

            return {
                ...prev,
                item: {
                    id,
                    name: camelize(decodeSearch(name))
                }
            };
        }
        return {
            path: (prev && prev.path) ? `${prev.path}/${curr}` : `/${curr}`
        };
    }, {});

    const { filter, ...res } = params ? queryStringToParams(params) : {};
    const paramsObject = omitBy({
        ...res,
        filters: decodeFilters(filter)
    }, param => (isNil(param) || isObject(param) && isEmpty(param)));

    return omitBy({
        ...urlObject,
        params: {
            ...paramsObject
        }
    }, param => (isNil(param) || isObject(param) && isEmpty(param)));
};

const getUrlSearchPathname = (location, queryString, value) => {
    const { search, query, pathname } = location;
    const url = pathname.includes('/items')
        ? '/items'
        : createURL({}, pathname);
    let searchPathname = `?${queryString}=${value}`;

    if (search) {
        if (queryString !== 'filter' && query.filter) {
            searchPathname += `&filter=${query.filter}`;
        }

        if (queryString !== 'location' && query.location) {
            searchPathname += `&location=${query.location}`;
        }

        if (queryString !== 'sorting' && query.sorting) {
            searchPathname += `&sorting=${query.sorting}`;
        }

        if (queryString !== 'page' && query.page) {
            searchPathname += `&page=${query.page}`;
        }
    }

    return `${url}${searchPathname}`;
};

/**
 * Deprecate it, use:
 * - buildObjectFromURL
 * - buildURL
 */
const urlPathCreate = (filters, location = {}) => {
    const params = [];

    if ((Array.isArray(filters) ? filters : Object.keys(filters)).length) {
        params.push({ key: 'filter', value: encodeFilters(filters) });
    }

    if (location.query) {
        if (location.query.location) {
            params.push({ key: 'location', value: location.query.location });
        }

        if (location.query.page) {
            params.push({ key: 'page', value: location.query.page });
        }

        if (location.query.sorting) {
            params.push({ key: 'sorting', value: location.query.sorting });
        }
    }

    if (!params.length) {
        return location.pathname;
    }

    return `${location.pathname}?${
        params.map(e => `${encodeURIComponent(e.key)}=${encodeURIComponent(e.value)}`)
            .join('&')
    }`;
};

const getItemUrl = (id, title, lang = '') => {
    if (lang) {
        return `/${lang}/item/${ slugify(title) }-iid-${ id }`;
    }
    return `/item/${ slugify(title) }-iid-${ id }`;
};

/** Convert React Router's location object to a string.
 * RR doesn't offer a method to convert the location object back to string, this helper doest that.
 *
 * @param {ReactRouterLocation} location - React router's location Object
 * @return {String} URL representation of the location
 */
const locationToString = (location = {}) =>
    [
        location.pathname,
        location.search,
        location.hash
    ]
    .filter(i => i)
    .join('');

const getUrlWithhash = ({ location, hashValue }) => {
    const queryParams = location && location.query;
    const params = Object.assign({}, queryParams);
    let newPath;

    if (queryParams && !objectsHelper.isEmpty(queryParams)) {
        newPath = `${ location.pathname }?${ paramsToQueryString(params) }`;
    }
    else {
        newPath = location.pathname;
    }

    if (hashValue) {
        newPath = `${newPath}#${hashValue}`;
    }

    return newPath;
};

const isAbsoluteUrl = url => {
    const r = new RegExp('^(?:[a-z]+:)?//', 'i');

    return r.test(url);
};

export {
    paramsToQueryString,
    queryStringToParams,
    getUrlParams,
    getSlugs,
    createURL,
    buildURL,
    getUrlSearchPathname,
    urlPathCreate,
    urlJoin,
    getItemUrl,
    locationToString,
    buildObjectFromURL,
    compareEncodedParams,
    getUrlWithhash,
    isAbsoluteUrl
};
