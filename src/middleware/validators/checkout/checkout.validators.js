const {
  getSchemaErrorResponse,
} = require("../../../response/general/general.response");
const Checkout = require("../../../schema/checkout/Checkout.Schema");

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

module.exports = {
  checkCheckoutSchemaValidators,
};
