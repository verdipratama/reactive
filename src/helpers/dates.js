'use strict';

import React from 'react';
// @ts-ignore
import { FormattedDate, FormattedRelative, FormattedMessage } from 'react-intl';

const MS_PER_DAY = 86400000;
const MS_PER_HOUR = 3600000;
const MS_PER_MINUTE = 60000;
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const decimalCount = 10;
const NO_DAY = 0;
const ONE_DAY = 1;
const SEVEN_DAYS = 7;

const translations = {
  today: <FormattedMessage id="today" />,
  yesterday: <FormattedMessage id="yesterday" />
};

function utcDateDiff(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes());

  return Math.abs(utc2 - utc1);
}

function utcDaysDiff(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.abs(utc2 - utc1);
}

function daysDiff(a, b) {
  return Math.floor(utcDateDiff(a, b) / MS_PER_DAY);
}

function daysOnlyDiff(a, b) {
  return Math.floor(utcDaysDiff(a, b) / MS_PER_DAY);
}

function hoursDiff(a, b) {
  return Math.floor(utcDateDiff(a, b) / MS_PER_HOUR);
}

function minutesDiff(a, b) {
  return Math.floor(utcDateDiff(a, b) / MS_PER_MINUTE);
}

function daysUntilNow(date, isDaysOnlyDiff = false) {
  return isDaysOnlyDiff
    ? daysOnlyDiff(new Date(), new Date(date))
    : daysDiff(new Date(), new Date(date));
}

function hoursUntilNow(date) {
  return hoursDiff(new Date(), new Date(date));
}

function minutesUntilNow(date) {
  return minutesDiff(new Date(), new Date(date));
}

function formatDate(dateObj, format) {
  const date = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  let formattedDate = '';

  switch (format) {
    case 'DD/MM/YY': {
      const monthNum = month + 1;
      const mm = monthNum >= decimalCount ? monthNum : `0${monthNum}`;
      const yy = String(year).substr(2);

      formattedDate = `${date}/${mm}/${yy}`;
      break;
    }
    case 'Day, DD Month': {
      formattedDate = `${dayNames[dateObj.getDay()]}, ${date} ${monthNames[month]}`;
      break;
    }
    case 'DD': {
      formattedDate = `${date}`;
      break;
    }
    case 'Day': {
      formattedDate = `${dayNames[dateObj.getDay()]}`;
      break;
    }
    case 'DD Month': {
      formattedDate = `${date} ${monthNames[month]}`;
      break;
    }
    case 'DD Month YYYY': {
      formattedDate = `${date} ${monthNames[month]} ${year}`;
      break;
    }
  }

  return formattedDate;
}

function relativeDate(date, dateFormat, props = {}) {
  dateFormat = dateFormat || { month: 'short', day: '2-digit' };

  const today = new Date();
  const currentDate = new Date(date);
  const diff = daysDiff(currentDate, today);

  if (diff > ONE_DAY && diff < SEVEN_DAYS) {
    return (
      <FormattedRelative value={currentDate} style="numeric">
        {date => <span {...props}>{date}</span>}
      </FormattedRelative>
    );
  }

  switch (diff) {
    case NO_DAY:
      return translations.today;
    case ONE_DAY:
      return translations.yesterday;
    default:
      return (
        <FormattedDate value={currentDate} {...dateFormat}>
          {date => <span {...props}>{date}</span>}
        </FormattedDate>
      );
  }
}

export {
  daysDiff,
  hoursDiff,
  minutesDiff,
  daysUntilNow,
  hoursUntilNow,
  minutesUntilNow,
  formatDate,
  relativeDate
};
