/* global window */
const supportLocalStorage = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage;
  } catch (error) {
    return false;
  }
};

export { supportLocalStorage };
