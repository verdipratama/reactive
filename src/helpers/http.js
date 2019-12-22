'use strict';

const httpStatusCodes = require('http-status-codes');

function isInformational(status) {
  return status >= httpStatusCodes.CONTINUE && status < httpStatusCodes.OK;
}

function isSuccess(status) {
  return status >= httpStatusCodes.OK && status < httpStatusCodes.MULTIPLE_CHOICES;
}

function isRedirection(status) {
  return status >= httpStatusCodes.MULTIPLE_CHOICES && status < httpStatusCodes.BAD_REQUEST;
}

function isClientError(status) {
  return status >= httpStatusCodes.BAD_REQUEST && status < httpStatusCodes.INTERNAL_SERVER_ERROR;
}

function isServerError(status) {
  return status >= httpStatusCodes.INTERNAL_SERVER_ERROR;
}

function isError(status) {
  return status >= httpStatusCodes.BAD_REQUEST;
}

const getStatusText = httpStatusCodes.getStatusText;

module.exports = {
  isInformational,
  isSuccess,
  isRedirection,
  isClientError,
  isServerError,
  isError,
  statusCodes: httpStatusCodes,
  getStatusText
};
