/* global window */
// import Auth from '../app/Auth';
// import { RECENT_LOCATIONS } from 'Constants/localStorage';
// import { supportLocalStorage } from './localStorage';

const getKey = () => {
  const user = Auth.getUser();

  if (user && user.id) {
    return `${RECENT_LOCATIONS.key}_${user.id}`;
  }
  return RECENT_LOCATIONS.key;
};

const add = location => {
  if (supportLocalStorage() && location && location.id && location.name) {
    const saved = window.localStorage.getItem(getKey());
    let recentLocations = [];

    if (saved) {
      recentLocations = JSON.parse(saved);
      if (!recentLocations.find(loc => loc.id === location.id)) {
        recentLocations.unshift(location);
        if (recentLocations.length > RECENT_LOCATIONS.max + 1) {
          recentLocations.pop();
        }
      }
    } else {
      recentLocations.push(location);
    }
    window.localStorage.setItem(getKey(), JSON.stringify(recentLocations));
  }
};

const get = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(getKey());

      return saved ? JSON.parse(saved) : [];
    }
    return [];
  } catch (e) {
    return [];
  }
};

export { add, get, getKey };
