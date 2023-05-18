const { request, response } = require("express");
const {
  getSchemaErrorResponse,
  unHandledExceptionResponse,
} = require("../../../response/general/general.response");
const Checkout = require("../../../schema/checkout/Checkout.Schema");
const {
  getParamIdNotFoundInModelReponse,
} = require("../../../response/general/general.response");

const checkCheckoutSchemaValidators = async (
  req = request,
  res = response,
  next
) => {
  const checkout = new Checkout(req.body);

  try {
    await checkout.validate();
  } catch (errors) {
    const response = getSchemaErrorResponse(errors.errors);
    return res.status(response.status).json(response);
  }

  next();
};

const checkIdIsInCheckoutStatus = async (
  req = request,
  res = response,
  next
) => {
  try {
    const { id } = req.params;

    if (!(await Checkout.exists({ _id: id, status: "checkout" }))) {
      const response = getParamIdNotFoundInModelReponse();
      return res.status(response.status).json(response);
    }
  } catch (unhandledError) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
  next();
};

module.exports = {
  checkCheckoutSchemaValidators,
  checkIdIsInCheckoutStatus,
};
