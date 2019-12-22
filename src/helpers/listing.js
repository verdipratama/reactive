import { camelize } from './strings';
import { getSlugs } from './url';

/** Context should have config, location and cookies
 * @param {Object} props: { params, location, }
 * @param {Object} context - { config: { get: }, cookies: { get } }
 */

const parsePathname = pathname => {
  let location = {};

  if (pathname) {
    const [firstSlug] = getSlugs(pathname);

    if (firstSlug && firstSlug.includes('_g')) {
      const [slug, id] = firstSlug.split('_g');
      const name = camelize(slug.split('-').join(' '));

      location = {
        id,
        name
      };
    }
  }

  return location;
};

const routerParamsToSeoQuery = ({
  location: {
    query: { filter }
  },
  params: { categoryID, geoID, text } = {}
}) => {
  const seoQuery = {};

  if (categoryID) {
    seoQuery.categoryId = categoryID;
  }

  if (geoID) {
    seoQuery.locationId = geoID;
  }

  if (text) {
    seoQuery.query = text;
  }

  if (filter) {
    seoQuery.filter = filter;
  }

  return seoQuery;
};

const itemCollection = (...args) => {
  Object.setPrototypeOf(args, itemCollection.prototype);
  return args;
};

itemCollection.prototype = Object.create(Array.prototype);
itemCollection.prototype.constructor = itemCollection;
itemCollection.prototype.setTotal = total => {
  if (total) {
    itemCollection.prototype.total = total;
    return null;
  }
  delete itemCollection.prototype.total;
  return null;
};
itemCollection.prototype.setCursor = cursor => {
  if (cursor) {
    itemCollection.prototype.cursor = cursor;
    return null;
  }
  delete itemCollection.prototype.cursor;
  return null;
};
itemCollection.prototype.setNextPageUrl = nextPageUrl => {
  if (nextPageUrl) {
    itemCollection.prototype.nextPageUrl = nextPageUrl;
    return null;
  }
  delete itemCollection.prototype.nextPageUrl;
  return null;
};

export { parsePathname, routerParamsToSeoQuery, itemCollection };
