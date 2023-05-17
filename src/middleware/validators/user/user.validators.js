const { request, response } = require("express");

const User = require("../../../schema/user/User.Schema");
const {
  getSchemaErrorResponse,
  unHandledExceptionResponse,
  unauthorizedResponse,
} = require("../../../response/general/general.response");
const { userStore } = require("../../../config/user.store");

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

const checkLoggedUserIsLibrarian = async (
  req = request,
  res = response,
  next
) => {
  const { uid } = userStore.getState();

  try {
    if (!(await User.exists({ firebaseId: uid, role: "lib" }))) {
      const response = unauthorizedResponse();
      return res.status(response.status).json(response);
    }
    next();
  } catch (error) {
    console.log(error);
    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

module.exports = {
  checkUserSchemaValidators,
  checkLoggedUserIsLibrarian,
};
