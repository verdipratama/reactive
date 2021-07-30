'use strict';

import * as Config from '../../client_config';

export function ucwords(str) {
  return (str + '').replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase();
  });
}

export function formatRupiah(angka, prefix) {
  var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
}

export function toString(str) {
  return str.replace(/null/i, '');
}

export function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function imgSrc(url, width = '0', height = '0') {
  var baseAssetsUrl = Config.assetsUrl;
  var base_url = url.base_url + width + '/' + height + '/';
  var file = url.file ? url.file : 'placeholder.png';
  if (!file.match(/.(jpg|jpeg|png|gif)$/i)) {
    file = 'placeholder.png';
  }
  var assetsUrl = baseAssetsUrl + base_url + file;

  return assetsUrl;
}

export function getMonths(mo) {
  let months = (mo > 8 ? '' : '0') + (mo + 1);
  return months;
}

export function getHour(mi) {
  let minutes = (mi > 9 ? '' : '0') + mi;
  return minutes;
}

export function getCurrentDate() {
  let date = new Date().getDate();
  let month = getMonths(new Date().getMonth());
  let year = new Date().getFullYear();
  return year + '-' + month + '-' + date;
}

export function timeToDate(input) {
  input = input * 1000;
  let date = new Date(input).getDate();
  let month = getMonths(new Date(input).getMonth());
  let year = new Date(input).getFullYear();
  return date + '/' + month + '/' + year;
}

export function timeToDateTime(input) {
  let time = input * 1000;
  let hour = getHour(new Date(time).getHours());
  let minute = getHour(new Date(time).getMinutes());
  let second = getHour(new Date(time).getSeconds());
  return timeToDate(input) + ' ' + hour + ':' + minute + ':' + second;
}

export function isDev() {
  console.log('masuk');
  console.log(process.env.NODE_ENV);
  return false;
}

export function getDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getYear();
  return '_' + day + month + year;
}

export function toTimeZone(time) {
  let format = 'YYYY/MM/DD';
  let zone = 'Asia/Jakarta';
  return moment(time, format).tz(zone).format(format);
}

export function arrayKeys(input) {
  let output = new Array();
  let counter = 0;
  let i;
  for (i in input) {
    output[counter++] = i;
  }
  return output;
}

export function arrayUnique(array) {
  return array.filter(function (el, index, arr) {
    return index == arr.indexOf(el);
  });
}

export function getArticleView() {
  return false;
}

export function generateCamelCase(string) {
  return string.replace(/['"]+/g, '').trim().toLowerCase();
}

/**
 * Set localstorage
 */
export function setLocalStorage(key, value) {
  if (typeof Storage !== 'undefined') {
    return localStorage.setItem(key, value);
  }

  console.log('Sorry! No Web Storage support..');
  return false;
}
/**
 * Get localstorage
 */
export function getLocalStorage(key) {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem(key);
  }
  console.log('Sorry! No Web Storage support..');
  return false;
}
/**
 * Remove localstorage
 */
export function removeLocalStorage(key) {
  if (typeof Storage !== 'undefined') {
    return localStorage.removeItem(key);
  }
  console.log('Sorry! No Web Storage support..');
  return false;
}

export function buildUcFirst(string) {
  string = string.toLowerCase().replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
  return string;
}

export function buildStringFromArray(item, key, addition = '') {
  let stringToReturn = '';
  if (Array.isArray(item)) {
    for (var i = 0; i < item.length; i++) {
      stringToReturn += ' ' + item[i].title + ',';
      if (i == 2) {
        break;
      }
    }
    stringToReturn = stringToReturn.trim().slice(0, -1);
  } else {
    stringToReturn += item;
  }

  return buildUcFirst(stringToReturn) + addition;
}

/**
 * Set timeout for every fetch
 */
export function fetchTimeout(url, options = {}, s = 20) {
  // start fetch
  return fetch(url, options)
    .then(function (res) {
      return !res ? res : res.json();
    })
    .catch(function (err) {
      return false;
    });
}
