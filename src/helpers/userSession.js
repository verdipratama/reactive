import cookies from './cookies';

const getSessionLong = sessionLong => {
  if (typeof sessionLong !== 'undefined') {
    return sessionLong.slice(0, sessionLong.indexOf('-'));
  }

  const cookieFromServer = cookies.readCookie('onap');

  return cookieFromServer ? cookieFromServer.slice(0, cookieFromServer.indexOf('-')) : undefined;
};

export { getSessionLong };
