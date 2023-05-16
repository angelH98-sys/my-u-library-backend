const { request, response } = require("express");

const User = require("../../../schema/user/User.Schema");
const {
  getSchemaErrorResponse,
} = require("../../../response/general/general.response");

const checkUserSchemaValidators = async (
  req = request,
  res = response,
  next
) => {
  const user = new User(req.body);

  try {
    await user.validate();
  } catch (errors) {
    const response = getSchemaErrorResponse(errors.errors);
    return res.status(response.status).json(response);
  }

  next();
};

module.exports = {
  checkUserSchemaValidators,
};
