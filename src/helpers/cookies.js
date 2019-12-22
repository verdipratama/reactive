'use strict';

/* global document */

const expiryInMilliSeconds = 86400000;

export default class CookieManager {
  static isCookieEnabled() {
    CookieManager.createCookie('testCookie', 'testCookie');
    return CookieManager.readCookie('testCookie') === 'testCookie';
  }

  static createCookie(name, value, days, secure = true) {
    if (typeof document !== 'undefined') {
      let expires = '';
      let https = '';

      if (days) {
        const date = new Date();

        date.setTime(date.getTime() + days * expiryInMilliSeconds);
        // @ts-ignore
        expires = '; expires='.concat(date.toGMTString());
      }

      if (secure && location.protocol === 'https:') {
        // eslint-disable-line
        https = ';secure';
      }

      document.cookie = name.concat('=', value, expires, '; path=/', https);
    }
  }

  static readCookie(name) {
    let value;

    if (typeof document !== 'undefined') {
      const nameEQ = name.concat('=');
      const ca = document.cookie.split(';');

      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          value = c.substring(nameEQ.length, c.length);
        }
      }
    }
    return value;
  }

  static eraseCookie(name) {
    this.createCookie(name, '', -1);
  }

  static getAllCookies() {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');

      if (cookies.length) {
        return cookies
          .map(cookie => {
            const [cookieName, ...cookieValues] = cookie.split('=');

            return {
              [cookieName.trim()]: cookieValues.join('=')
            };
          })
          .reduce((acc, curr) => ({ ...acc, ...curr }), {});
      }
    }
    return {};
  }
}
