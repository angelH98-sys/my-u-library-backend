const { Router } = require("express");
const {
  createUser,
  getRoleFromLoggedUser,
  getAllUsersPaginated,
} = require("../../controller/user/user.controller");
const {
  checkUserSchemaValidators,
  checkLoggedUserIsLibrarian,
} = require("../../middleware/validators/user/user.validators");
const {
  isUserAuthenticated,
} = require("../../middleware/firebase/firebase.middleware");

const UserRouter = Router();

UserRouter.post(
  "/",
  [isUserAuthenticated, checkLoggedUserIsLibrarian, checkUserSchemaValidators],
  createUser
);

UserRouter.get("/role", [isUserAuthenticated], getRoleFromLoggedUser);

UserRouter.get(
  "/",
  [isUserAuthenticated, checkLoggedUserIsLibrarian],
  getAllUsersPaginated
);

module.exports = {
  UserRouter,
};
