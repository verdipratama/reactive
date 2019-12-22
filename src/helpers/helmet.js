'use strict';

function getSeoPage(rel, searchParams) {
  const pageChar = 5;

  const searchPath = searchParams.replace(/page=[0-9]+/, match => {
    const currentPage = parseInt(match.substr(pageChar), 10);
    const param = rel === 'prev' ? `page=${currentPage - 1}` : `page=${currentPage + 1}`;

    return param;
  });

  return searchPath;
}

function getLinks(
  currentPage,
  hostUrl,
  path,
  totalPages,
  searchParams,
  searchPath,
  hasNextPageUrl
) {
  let linkPrevPage = [];
  let linkNextPage = [];
  const maxPage = 1000;
  const pathname = searchPath || path;

  if (currentPage && currentPage <= totalPages && currentPage > 1) {
    linkPrevPage = [
      {
        rel: 'prev',
        href: `${hostUrl}${currentPage == 1 ? pathname : getSeoPage('prev', searchParams)}`
      }
    ];
  }

  if (currentPage && currentPage < totalPages && currentPage < maxPage && hasNextPageUrl) {
    linkNextPage = [{ rel: 'next', href: `${hostUrl + getSeoPage('next', searchParams)}` }];
  } else if (!currentPage && hasNextPageUrl) {
    linkNextPage = [
      {
        rel: 'next',
        href: `${hostUrl}${pathname}${searchPath ? '&page=1' : '?page=1'}`
      }
    ];
  }

  return { linkPrevPage, linkNextPage };
}

module.exports = { getLinks, getSeoPage };
