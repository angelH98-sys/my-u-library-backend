const { Router } = require("express");
const { createUser } = require("../../controller/user/user.controller");
const {
  checkUserSchemaValidators,
} = require("../../middleware/validators/user/user.validators");
const {
  isUserAuthenticated,
} = require("../../middleware/firebase/firebase.middleware");

const UserRouter = Router();

UserRouter.post(
  "/",
  [isUserAuthenticated, checkUserSchemaValidators],
  createUser
);

module.exports = {
  UserRouter,
};
