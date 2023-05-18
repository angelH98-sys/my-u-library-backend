const { Router } = require("express");
const {
  createBook,
  getBookById,
  getAllPaginatedBooks,
} = require("../../controller/book/book.controler");
const {
  checkBookSchemaValidators,
} = require("../../middleware/validators/book/book.validators");
const {
  isUserAuthenticated,
} = require("../../middleware/firebase/firebase.middleware");
const {
  checkLoggedUserIsLibrarian,
} = require("../../middleware/validators/user/user.validators");
const {
  checkParamIdIsAMongoId,
} = require("../../middleware/validators/general/general.validators");

const BookRouter = Router();

BookRouter.post(
  "/",
  [isUserAuthenticated, checkLoggedUserIsLibrarian, checkBookSchemaValidators],
  createBook
);

BookRouter.get(
  "/:id",
  [isUserAuthenticated, checkParamIdIsAMongoId],
  getBookById
);

BookRouter.get(
  "/",
  //[isUserAuthenticated],
  getAllPaginatedBooks
);

module.exports = {
  BookRouter,
};
