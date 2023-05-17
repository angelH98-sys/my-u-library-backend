const { request, response } = require("express");

const Book = require("../../schema/book/Book.Schema");
const Author = require("../../schema/author/Author.Schema");
const Genre = require("../../schema/genre/Genre.Schema");
const {
  unHandledExceptionResponse,
  getRecordsResponse,
} = require("../../response/general/general.response");
const {
  setAuditorySchemaCreationOptions,
} = require("../../helper/auditory.schema.options");

const createBook = async (req = request, res = response) => {
  try {
    const {
      tittle,
      author: authorName,
      genre: genreName,
      stock,
      publishedYear,
    } = req.body;

    const authorResponse = await Author.findOne({
      name: authorName.toUpperCase(),
    });

    let authorId;

    if (!!authorResponse) {
      authorId = authorResponse._id;
    } else {
      const newAuthor = new Author({ name: authorName.toUpperCase() });
      await newAuthor.save();

      authorId = newAuthor._id;
    }

    const genreResponse = await Genre.findOne({
      name: genreName.toUpperCase(),
    });

    let genreId;

    if (!!genreResponse) {
      genreId = genreResponse._id;
    } else {
      const newGenre = new Genre({ name: genreName.toUpperCase() });
      await newGenre.save();

      genreId = newGenre._id;
    }

    let newBook = new Book({
      tittle,
      author: authorId,
      genre: genreId,
      stock,
      publishedYear,
      status: stock > 0 ? true : false,
    });

    newBook = setAuditorySchemaCreationOptions(newBook);

    await newBook.save();

    const result = getRecordsResponse(newBook);

    return res.status(result.status).json(result);
  } catch (unhandledError) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

module.exports = {
  createBook,
};
