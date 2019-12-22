/* global window */

const bCanBeEncrypted = isWindowEncryptionAvailable();
const encodingScheme = 'utf-8';
const ivHex = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
const algorithm = 'AES-CBC';
const hashingScheme = 'SHA-256';

let iv;

if (bCanBeEncrypted) {
  iv = new window.TextEncoder(encodingScheme).encode(ivHex);
}

function isWindowEncryptionAvailable() {
  if (typeof window !== 'undefined') {
    let bCanBeEncrypted = false;
    let bIsCryptoAvailable = false;
    let bIsEncyptionAvailable = false;
    let bIsTextEncodingAvailable = false;
    let bIsTextDecodingAvailable = false;

    if (window.crypto || window.msCrypto || window.webkitCrypto) {
      window.cryptography = window.crypto || window.msCrypto || window.webkitCrypto;
      bIsCryptoAvailable = true;

      if (
        window.cryptography.subtle &&
        typeof window.cryptography.subtle.digest === 'function' &&
        typeof window.cryptography.subtle.encrypt === 'function' &&
        typeof window.cryptography.subtle.decrypt === 'function' &&
        typeof window.cryptography.subtle.importKey === 'function'
      ) {
        bIsEncyptionAvailable = true;
      }
    }

    if (window.TextEncoder || window.msTextEncoder || window.webkitTextEncoder) {
      window.TextEncoder = window.TextEncoder || window.msTextEncoder || window.webkitTextEncoder;
      bIsTextEncodingAvailable = true;
    }

    if (window.TextDecoder || window.msTextDecoder || window.webkitTextDecoder) {
      window.TextDecoder = window.TextDecoder || window.msTextDecoder || window.webkitTextDecoder;
      bIsTextDecodingAvailable = true;
    }

    if (
      bIsCryptoAvailable &&
      bIsEncyptionAvailable &&
      bIsTextEncodingAvailable &&
      bIsTextDecodingAvailable
    ) {
      bCanBeEncrypted = true;
    }

    return bCanBeEncrypted;
  }
  return false;
}

function arrayBufferToEncodedText(buffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

function encodedTextToArrayBuffer(encodedText) {
  const buf = new ArrayBuffer(encodedText.length);
  const bufView = new Uint8Array(buf);

  for (let i = 0, strLen = encodedText.length; i < strLen; i++) {
    bufView[i] = encodedText.charCodeAt(i);
  }
  return buf;
}

function encrypt(plainText, workingKey) {
  if (bCanBeEncrypted) {
    const encodedText = new window.TextEncoder(encodingScheme).encode(plainText);
    const encodedKey = new window.TextEncoder(encodingScheme).encode(workingKey);
    const alg = { name: algorithm, iv };

    return window.cryptography.subtle
      .digest(hashingScheme, encodedKey)
      .then(pwHash => {
        return window.cryptography.subtle.importKey('raw', pwHash, alg, false, ['encrypt']);
      })
      .then(key => {
        return window.cryptography.subtle.encrypt(alg, key, encodedText);
      })
      .then(buffer => {
        return arrayBufferToEncodedText(buffer);
      })
      .catch(error => {
        window.console.log(error); // eslint-disable-line
        return plainText;
      });
  }

  return new Promise(resolve => {
    resolve(plainText);
  });
}

function decrypt(encText, workingKey) {
  if (bCanBeEncrypted) {
    const encodedText = encodedTextToArrayBuffer(encText);
    const encodedKey = new window.TextEncoder(encodingScheme).encode(workingKey);
    const alg = { name: algorithm, iv };

    return window.cryptography.subtle
      .digest(hashingScheme, encodedKey)
      .then(pwHash => {
        return window.cryptography.subtle.importKey('raw', pwHash, alg, false, ['decrypt']);
      })
      .then(key => {
        return window.cryptography.subtle.decrypt(alg, key, encodedText);
      })
      .then(buffer => {
        return new window.TextDecoder(encodingScheme).decode(buffer);
      })
      .catch(error => {
        window.console.log(error); // eslint-disable-line
        return false;
      });
  }

  return new Promise(resolve => {
    resolve(encText);
  });
}

function decryptHash(hash) {
  const cryptoKey = '0123456789abcdefghijklmnopqrstuwvxyzABCDEFGHIJKLMNOPQRSTUWVXYZ';
  const len = hash.length - 1;
  const system = 62;
  let int = 0;

  for (let i = len; i >= 0; i--) {
    int += cryptoKey.indexOf(hash[i]) * Math.pow(system, len - i);
  }

  return int;
}

module.exports = {
  encrypt,
  decrypt,
  decryptHash
};
