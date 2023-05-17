const { Router } = require("express");
const { getAllAuthors } = require("../../controller/author/author.controler");

const AuthorRouter = Router();

AuthorRouter.get("/", getAllAuthors);

module.exports = {
  AuthorRouter,
};
