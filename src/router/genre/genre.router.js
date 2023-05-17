const { Router } = require("express");
const { getAllGenres } = require("../../controller/genre/genre.controller");

const GenreRouter = Router();

GenreRouter.get("/", getAllGenres);

module.exports = {
  GenreRouter,
};
