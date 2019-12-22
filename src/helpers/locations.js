'use strict';
/* global navigator */
import cookieHelper from './cookies';
import { isEmpty } from 'Helpers/objects';
import { buildURL } from './url';

function matchLocation(locationsMap = {}, slug) {
    let indexPoint = -1;

    if (locationsMap.slugs) {
        indexPoint = locationsMap.slugs.indexOf(slug);
    }

    return indexPoint >= 0 ? locationsMap.points[indexPoint].split(',') : [];
}

function getBucketSize(categoriesTree, categoryID, configBucketSize) {
    let listingCategory;

    if (categoriesTree) {
        categoriesTree.forEach(category => {
            if (category.id === categoryID) {
                listingCategory = category;
            }
            else {
                category.sub_categories.forEach(subCategory => {
                    if (subCategory.id === categoryID) {
                        listingCategory = subCategory;
                    }
                });
            }
        });
    }

    return listingCategory && listingCategory.bucketSize || configBucketSize;
}

function createLocationCookie(navigator, values, contextLocation) {
    if (navigator && navigator.permissions) {
        const expiration = 1;

        navigator.permissions.query({ name: 'geolocation' }).then(result => {
            if (result.state !== 'granted' && result.state !== 'prompt') {
                const location = {
                    ...values
                };

                contextLocation.set(location, undefined, expiration);
            }
        });
    }
}

const encodeCookieValue = value => encodeURIComponent(JSON.stringify(value));
const decodeCookieValue = value => JSON.parse(decodeURIComponent(value));

const createLocationPathCookie = (value = {}, name = 'locationPath') => {
    const defaultExpiration = 30;

    if (navigator && navigator.permissions) {
        const expiration = 1;

        return navigator.permissions.query({ name: 'geolocation' }).then(result => {
            if (result.state === 'denied') {
                return cookieHelper.createCookie(name, encodeCookieValue(value), defaultExpiration);
            }
            return cookieHelper.createCookie(name, encodeCookieValue(value), expiration);
        });
    }
    return cookieHelper.createCookie(name, encodeCookieValue(value), defaultExpiration);
};
const readLocationPathCookie = (name = 'locationPath') => {
    const findCookie = cookieHelper.readCookie(name);

    if (findCookie) {
        return decodeCookieValue(findCookie);
    }
    return undefined;
};
const removeLocationPathCookie = (name = 'locationPath') => {
    const findCookie = cookieHelper.readCookie(name);

    if (findCookie) {
        cookieHelper.eraseCookie(name);
    }
};
const getLocationPath = props => {
    const { geoID } = props.params;
    const locationFilter = (props.location.query && props.location.query.location)
        ? props.location.query.location.split(',')
        : undefined;

    if (locationFilter) {
        const [lat, lon] = locationFilter;

        return {
            lat: Number(lat),
            lon: Number(lon)
        };
    }
    else if (geoID) {
        return { id: geoID };
    }
    else if (props.selectedLocation) {
        return { id: props.selectedLocation.id };
    }
    return undefined;
};

const addressComponentsToString = (addressComponents = [], limit = 2, separator = ', ') => {
    if (!!addressComponents.length && addressComponents[0].type == 'COUNTRY') {
        addressComponents.reverse();
    }
    return addressComponents.slice(0, limit).reduce((acc, b) => {
        return acc ? acc.concat(`${separator}${b.name}`) : b.name;
    }, '');
};

const locationsKeyMapper = (value, mapper) => {
    if (isEmpty(mapper)) {
        return false;
    }

    return mapper[value] || value;
};

const getLocationHeirarchy = (locations, category) => {
    const heirarchy = [];

    if (locations) {
        for (let i = locations.length - 2; i >= 0; i--) {
            const location = locations[i];

            heirarchy.push({
                translation: {
                    id: 'categoryInLocation',
                    values: {
                        location: location.name,
                        category: category.name
                    }
                },
                href: buildURL({ location, category })
            });
        }
    }
    return heirarchy;
};

export {
    matchLocation,
    getBucketSize,
    createLocationCookie,
    addressComponentsToString,
    createLocationPathCookie,
    readLocationPathCookie,
    getLocationPath,
    locationsKeyMapper,
    removeLocationPathCookie,
    getLocationHeirarchy
};
