const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database.config");
const { UserRouter } = require("../router/user/user.router");
const { BookRouter } = require("../router/book/book.router");
const { AuthorRouter } = require("../router/author/author.router");
const { GenreRouter } = require("../router/genre/genre.router");

class ExpressServer {
  constructor() {
    this.port = process.env.PORT;

    this.app = express();
    this.createDbConnection();
    this.middlewares();
    this.routes();
  }

  async createDbConnection() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(process.env.PATH_USERS, UserRouter);
    this.app.use(process.env.PATH_BOOKS, BookRouter);
    this.app.use(process.env.PATH_AUTHORS, AuthorRouter);
    this.app.use(process.env.PATH_GENRES, GenreRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }
}

module.exports = {
  ExpressServer,
};
