/* global window */
'use strict';

export const scrollToTop = () => {
  if (window) {
    window.scrollTo(0, 0);
  }
};
