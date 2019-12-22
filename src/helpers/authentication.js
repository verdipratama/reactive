/* global window navigator */
import jwt_decode from 'jwt-decode';

const parserToken = token => {
    let result = '';

    if (token) {
        result = jwt_decode(token);
    }
    return result;
};

const smartlockHelper = {
    isCredentialManagementSupportedInBrowser: () => {
        return typeof window !== 'undefined'
                && navigator
                && navigator.credentials
                && navigator.credentials.preventSilentAccess;
    },
    preventSilentAccess: () => {
        if (smartlockHelper.isCredentialManagementSupportedInBrowser()) {
            navigator.credentials.preventSilentAccess();
        }
    },
    getCredentials: mediation => {
        return navigator.credentials.get({
            password: true,
            mediation
        });
    },
    storePasswordCredentials: (id, password) => {
        if (smartlockHelper.isCredentialManagementSupportedInBrowser() && window.PasswordCredential) {
            const passwordCredential = new window.PasswordCredential({
                id,
                password
            });

            navigator.credentials.store(passwordCredential);
        }
    }
};

export {
    parserToken,
    smartlockHelper
};
