/* global window */
const supportSessionStorage = () => {
  try {
    return typeof window !== 'undefined' && window.sessionStorage;
  } catch (error) {
    return false;
  }
};

export { supportSessionStorage };
