const { request, response } = require("express");
const { isObjectIdOrHexString } = require("mongoose");
const {
  getParamIdNotMongoIdResponse,
} = require("../../../response/general/general.response");

const checkParamIdIsAMongoId = (req = request, res = response, next) => {
  const { id } = req.params;

  if (!isObjectIdOrHexString(id)) {
    const response = getParamIdNotMongoIdResponse();
    return res.status(response.status).json(response);
  }

  next();
};

module.exports = {
  checkParamIdIsAMongoId,
};
