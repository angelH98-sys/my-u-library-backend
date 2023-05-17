const { MyULibraryResponse } = require("../../helper/Response");
const {
  MessageDictionary: { ERROR },
} = require("../../helper/message.dictionary");

const SOURCE_LOCAL = process.env.SOURCE_LOCAL;

const getSchemaErrorResponse = (errors) => {
  const response = new MyULibraryResponse();
  response.status = 400;

  Object.keys(errors).forEach((errorKey) => {
    const {
      properties: { message, path },
    } = errors[errorKey];
    response.addError(SOURCE_LOCAL, message, path);
  });

  return response;
};

const unHandledExceptionResponse = () => {
  const response = new MyULibraryResponse();
  response.status = 500;

  const message = ERROR.UNHANDLED;

  response.addError(SOURCE_LOCAL, message);

  return response;
};

const getRecordsResponse = (records) => {
  const response = new MyULibraryResponse();
  response.status = 200;

  Array.isArray(records)
    ? records.forEach((record) => response.addRecord(record))
    : response.addRecord(records);

  return response;
};

const unauthorizedResponse = () => {
  const response = new MyULibraryResponse();
  response.status = 403;
  response.addError(SOURCE_LOCAL, ERROR.UNAUTHORIZED);
  return response;
};

module.exports = {
  getSchemaErrorResponse,
  unHandledExceptionResponse,
  getRecordsResponse,
  unauthorizedResponse,
};
