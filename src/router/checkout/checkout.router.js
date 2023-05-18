const Router = require("express");
const {
  checkCheckoutSchemaValidators,
  checkIdIsInCheckoutStatus,
} = require("../../middleware/validators/checkout/checkout.validators");
const {
  createNewCheckout,
  getAllCheckouts,
  updateCheckout,
} = require("../../controller/checkout/checkout.controller");
const {
  isUserAuthenticated,
} = require("../../middleware/firebase/firebase.middleware");
const {
  checkParamIdIsAMongoId,
} = require("../../middleware/validators/general/general.validators");
const {
  checkLoggedUserIsLibrarian,
} = require("../../middleware/validators/user/user.validators");

const CheckoutRouter = Router();

CheckoutRouter.post("/", [checkCheckoutSchemaValidators], createNewCheckout);

CheckoutRouter.get("/", [isUserAuthenticated], getAllCheckouts);

CheckoutRouter.put(
  "/:id",
  [
    isUserAuthenticated,
    checkLoggedUserIsLibrarian,
    checkParamIdIsAMongoId,
    checkIdIsInCheckoutStatus,
  ],
  updateCheckout
);

module.exports = {
  CheckoutRouter,
};
