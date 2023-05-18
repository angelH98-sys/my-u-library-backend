const Router = require("express");
const {
  checkCheckoutSchemaValidators,
} = require("../../middleware/validators/checkout/checkout.validators");
const {
  createNewCheckout,
} = require("../../controller/checkout/checkout.controller");

const CheckoutRouter = Router();

CheckoutRouter.post("/", [checkCheckoutSchemaValidators], createNewCheckout);

module.exports = {
  CheckoutRouter,
};
