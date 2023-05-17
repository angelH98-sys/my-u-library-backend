const { Router } = require("express");
const { createBook } = require("../../controller/book/book.controler");
const {
  checkBookSchemaValidators,
} = require("../../middleware/validators/book/book.validators");
const {
  isUserAuthenticated,
} = require("../../middleware/firebase/firebase.middleware");
const {
  checkLoggedUserIsLibrarian,
} = require("../../middleware/validators/user/user.validators");

const BookRouter = Router();

BookRouter.post(
  "/",
  [isUserAuthenticated, checkLoggedUserIsLibrarian, checkBookSchemaValidators],
  createBook
);

module.exports = {
  BookRouter,
};
