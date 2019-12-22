export const makeTopSearchesUrl = ({
  baseUrl = '',
  categoryId,
  locationId,
  siteCode,
  querySearch = '',
  filters = ''
}) => {
  const pathComponents = ['/api/seo'];

  if (locationId) {
    pathComponents.push(`/locations/${locationId}`);
  }
  if (categoryId) {
    pathComponents.push(`/categories/${categoryId}`);
  }

  pathComponents.push('/topSearches?');

  const path = pathComponents.join('');

  const queryComponents = [];

  if (querySearch) {
    queryComponents.push(`querySearch=${encodeURIComponent(querySearch)}`);
  }
  if (filters) {
    queryComponents.push(`filters=${filters}`);
  }

  queryComponents.push(`siteCode=${siteCode}`);

  const query = queryComponents.join('&');

  return baseUrl + path + query;
};

export const makeTopSearchesSitemapUrl = ({ baseUrl = '', categoryId, locationId, siteCode }) => {
  const apiPath = '/api/seo/topSearches/sitemap?';
  const queryComponents = [];

  if (locationId) {
    queryComponents.push(`locationId=${locationId}`);
  }
  if (categoryId) {
    queryComponents.push(`categoryId=${categoryId}`);
  }

  queryComponents.push(`siteCode=${siteCode}`);

  const query = queryComponents.join('&');

  return baseUrl + apiPath + query;
};

export const getTopSearchesIdFromUrl = url => url.split('/api/seo')[1].replace(/&siteCode=.*$/, '');

export const hashTopSearchesParams = params => {
  const seoUrl = makeTopSearchesUrl({ ...params, baseUrl: '' });

  return getTopSearchesIdFromUrl(seoUrl);
};

export const hashTopSearchesSitemapParams = params => {
  const seoUrl = makeTopSearchesSitemapUrl({ ...params, baseUrl: '' });

  return getTopSearchesIdFromUrl(seoUrl);
};
