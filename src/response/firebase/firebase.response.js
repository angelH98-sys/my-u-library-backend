const {
  MessageDictionary: { ERROR },
} = require("../../helper/message.dictionary");
const { MyULibraryResponse } = require("../../helper/Response");
const { unHandledExceptionResponse } = require("../general/general.response");

const SOURCE_LOCAL = process.env.ERROR_SOURCE_LOCAL;
const SOURCE_FIREBASE = process.env.ERROR_SOURCE_FIREBASE;

/**
 * Returns an MyULibraryResponse object with a custom error.
 *
 * It's used if access token is not found in the request's header.
 *
 * @returns MyULibraryResponse with an error
 */
const accessTokenRequiredResponse = () => {
  const response = new MyULibraryResponse();

  response.status = 400;

  const message = ERROR.FIREBASE.TOKEN.REQUIRED;

  response.addError(SOURCE_LOCAL, message);

  return response;
};

const getFirebaseExceptionResponse = (code) => {
  switch (code) {
    case "auth/id-token-expired":
      return getTokenExpiredResponse();
    case "auth/argument-error":
      return getTokenDecodingFailedResponse();
    default:
      return unHandledExceptionResponse();
  }
};

const getTokenExpiredResponse = () => {
  const response = new MyULibraryResponse();

  response.status = 400;

  const message = ERROR.FIREBASE.TOKEN.EXPIRED;

  response.addError(SOURCE_FIREBASE, message);

  return response;
};

const getTokenDecodingFailedResponse = () => {
  const response = new MyULibraryResponse();

  response.status = 400;

  const message = ERROR.FIREBASE.TOKEN.INVALID;

  response.addError(SOURCE_FIREBASE, message);

  return response;
};

const getUploadFileToFirebaseError = (fieldname) => {
  const response = new MyULibraryResponse();
  response.status = 500;

  const message = ERROR.FIREBASE.FILE_UPLOAD_ERROR;

  response.addError(SOURCE_FIREBASE, message, fieldname);
};

module.exports = {
  accessTokenRequiredResponse,
  getTokenDecodingFailedResponse,
  getTokenExpiredResponse,
  getFirebaseExceptionResponse,
  getUploadFileToFirebaseError,
};
