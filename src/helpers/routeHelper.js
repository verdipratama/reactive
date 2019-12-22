export const movedPermanently = () => {
  const status = 301;

  return { status };
};

export const movedTemporarily = () => {
  const status = 302;

  return { status };
};

export const maxPage = (location, replace) => {
  const maxpage = 999;
  const { page } = location.query;

  if (page && page > maxpage) {
    const searchPath = location.search.replace(/page=[0-9]+/, 'page=999');

    replace({
      pathname: searchPath,
      state: movedPermanently()
    });
  }
};

export const getLanguageBasePath = params => {
  if (params && params.lang) {
    return `/${params.lang}`;
  }
  return '';
};

export const checkLangPathParam = (firstPathParam, langs) => {
  const lang = langs.find(({ pathParam }) => pathParam === firstPathParam);

  return !!lang;
};
