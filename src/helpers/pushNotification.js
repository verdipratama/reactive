/* global window */

import fetchPonyfill from 'fetch-ponyfill';
import httpStatusCodes from 'http-status-codes';
import isEmpty from 'lodash/isEmpty';
import { supportLocalStorage } from './localStorage';
// import { FCM_INSTALL_ID, GCM_SUBSCRIPTION_ID, FCM_TOKEN } from '../constants/localStorage';

const { fetch } = fetchPonyfill();
const bindUser = '/api/devices';
const localStorageIsSupported = supportLocalStorage();
const getFcmSubscription = () => window.localStorage.getItem(FCM_INSTALL_ID.key);
const getGcmSubscription = () => window.localStorage.getItem(GCM_SUBSCRIPTION_ID.key);
const getFcmToken = () => window.localStorage.getItem(FCM_TOKEN.key);

/**
 * Send fcm token to api/devices, get a installation id and store it in localstorage.
 * @param {string} token
 */
const sendTokenToServer = async token => {
  // This const (pwa_core_dummy_installation_id) should be delete when devices service is in prod.
  // Is a workaround to CORE, because in CORE installation id is required.
  const pwa_core_dummy_installation_id = '37eb8a74-4624-3137-e36b-047097409eff';
  const data = {
    data: {
      platform: 'pwa',
      push_token: token,
      provider: 'fcm'
    }
  };
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };
  const storedInstallationId = localStorageIsSupported ? getFcmSubscription() : '';
  const subscriptionCode = storedInstallationId
    ? encodeURIComponent(storedInstallationId)
    : pwa_core_dummy_installation_id;
  const url = subscriptionCode
    ? `${bindUser}/${subscriptionCode}?version=1`
    : `${bindUser}?version=1`;

  fetch(url, options)
    .then(response => {
      if (response.status !== httpStatusCodes.OK) {
        throw new Error(response.message);
      }
      return response.json();
    })
    .then(
      res => {
        const { installation_id } = res.data;

        if (localStorageIsSupported && installation_id) {
          window.localStorage.setItem(FCM_INSTALL_ID.key, installation_id);
          window.localStorage.setItem(FCM_TOKEN.key, token);
        }
        return res;
      },
      err => {
        return err;
      }
    );
};

/**
 *
 * @param {object} messaging: Plush instance.
 */
const updateToken = async messaging => {
  const currentFcmToken = getFcmToken();
  const token = await messaging.getToken();

  if (token && currentFcmToken !== token) {
    sendTokenToServer(token);
  }
};

/**
 *
 * @param {object} registration
 */
const initializePlush = registration => {
  const { plushMessages: messaging, brand } = global.plushData || {};
  const icon = `/logo/${brand}.png`;

  messaging.useServiceWorker(registration);
  messaging.onMessage(payload => {
    const { title, body } = payload;
    const options = {
      body,
      icon,
      badge: icon,
      data: payload.data
    };

    messaging.showNotification(title, options);
  });

  messaging.onTokenRefresh(() => {
    updateToken(messaging);
  });

  return messaging;
};

/**
 * if sw is registered and active, will initizalize plush with the sw
 * and get the token.
 */
const setNotificationToken = async () => {
  window.navigator.serviceWorker.ready.then(registration => {
    const messaging = initializePlush(registration);

    updateToken(messaging);
  });
};

/**
 *
 * @param {function} track
 */
const askForPermissionToReceiveNotifications = async track => {
  if (window.navigator && 'serviceWorker' in window.navigator && 'Notification' in window) {
    if (window.Notification.permission === 'default') {
      track('permissions_impression', {
        permission_for: 'notification'
      });
      window.Notification.requestPermission()
        .then(permission => {
          if (permission === 'granted') {
            track(
              'permissions_tap_allow',
              {
                permission_for: 'notification'
              },
              true
            );
            setNotificationToken();
          } else {
            track(
              'permissions_tap_deny',
              {
                permission_for: 'notification'
              },
              true
            );
          }
        })
        .catch(e => {
          console.log('Error:: ', e); // eslint-disable-line
        });
    }
  }
};

/**
 * Remove any storage of GCM_SUBSCRIPTION_ID (old notification).
 * MUST be delete when all the users have migrated to FCM!!.
 */
const removeGcmSubscription = () => {
  if (getGcmSubscription()) {
    window.localStorage.removeItem(GCM_SUBSCRIPTION_ID.key);
  }
};

/**
 * Returns installation id if is stored in localstorage.
 * Check GCM first, if it doesn't exist it checks for FCM.
 * If no installation id is stored, returns an empty string;
 */
const getNotificationInstallationId = () => {
  let installation_id = '';

  if (localStorageIsSupported) {
    installation_id = getGcmSubscription() || getFcmSubscription() || '';
  }
  return installation_id;
};

/**
 * return tracking page value based on the brand.
 * @param {string} brand [olx]
 */
const getTrackingPage = brand => {
  const brands = {
    olx: 'p-olx-webpush'
  };

  return (!isEmpty(brand) && brands[brand.toLowerCase()]) || 'unknown';
};

/**
 * return tracking platform type value.
 * @param {number} breakpoint
 */
const getTrackingPlatformType = breakpoint => {
  if (typeof breakpoint === 'number') {
    return window.screen.availWidth < breakpoint ? 'mobile-html5' : 'desktop';
  }
  return 'unknown';
};

export {
  setNotificationToken,
  askForPermissionToReceiveNotifications,
  getNotificationInstallationId,
  getTrackingPage,
  getTrackingPlatformType,
  removeGcmSubscription
};
