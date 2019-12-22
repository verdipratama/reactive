import { collapseWhitespace, stripTags } from './strings';

export const configToObject = config => {
  if (config.get && typeof config.get == 'function') {
    return config.get();
  }

  return config;
};

export const getSeoConfigParams = config => {
  const settings = configToObject(config);

  return {
    siteCode: settings.siteCode,
    lang: (settings.SEO && settings.SEO.lang) || settings.lang
  };
};

const mapToString = str => val => {
  return val ? str : '';
};

const mapCategory = mapToString('Category');
const mapQuery = mapToString('Query');
const mapLocation = mapToString('Location');

export const getListingTitleDescriptionTranslationId = ({ category, location, querySearch }) => {
  const tail = mapQuery(querySearch) + mapCategory(category) + mapLocation(location);
  const listingTitle = 'listingTitle';
  const listingDescription = 'listingDescription';

  return {
    titleTranslationId: listingTitle + tail,
    descriptionTranslationId: listingDescription + tail
  };
};

export const normalizeString = (source, maxLength = undefined) => {
  return stripTags(collapseWhitespace(String(source).replace(/"/g, ''))).substr(0, maxLength);
};
