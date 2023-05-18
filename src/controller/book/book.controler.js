const { request, response } = require("express");

const Book = require("../../schema/book/Book.Schema");
const Author = require("../../schema/author/Author.Schema");
const Genre = require("../../schema/genre/Genre.Schema");
const {
  unHandledExceptionResponse,
  getRecordsResponse,
  getParamIdNotFoundInModelReponse,
  getRecordsResponseWithMetadata,
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

const getBookById = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    let bookResult = await Book.findById(id);

    if (bookResult) {
      const { name: authorName } = await Author.findById(
        bookResult.author
      ).select("name");
      const { name: genreName } = await Genre.findById(bookResult.genre).select(
        "name"
      );

      bookResult.author = authorName;
      bookResult.genre = genreName;

      const response = getRecordsResponse(bookResult);
      return res.status(response.status).json(response);
    }

    const response = getParamIdNotFoundInModelReponse();

    return res.status(response.status).json(response);
  } catch (unhandledError) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

const getAllPaginatedBooks = async (req = request, res = response) => {
  try {
    const { limit = 10, skip = 0, searchparam, searchtext = "" } = req.query;

    let paginatedBooks,
      authors,
      genres,
      totalBooks,
      response,
      authorName,
      genreName;

    const pattern = new RegExp(searchtext.toLowerCase(), "i");
    switch (searchparam) {
      case "tittle":
        paginatedBooks = await Book.find({ tittle: pattern }, null, {
          limit,
          skip,
        });

        authors = await Author.find({
          _id: {
            $in: paginatedBooks.map((b) => b.author),
          },
        });

        genres = await Genre.find({
          _id: {
            $in: paginatedBooks.map((b) => b.genre),
          },
        });

        paginatedBooks = paginatedBooks.map(({ _doc }) => {
          authorName = authors.filter((a) => a.id === _doc.author)[0].name;
          genreName = genres.filter((a) => a.id === _doc.genre)[0].name;

          return {
            ..._doc,
            author: authorName,
            genre: genreName,
          };
        });

        totalBooks = await Book.count({ tittle: pattern });

        response = getRecordsResponseWithMetadata(
          paginatedBooks,
          limit,
          skip,
          totalBooks
        );

        return res.status(response.status).json(response);

      case "author":
        const authorArray = await Author.find({ name: pattern });

        paginatedBooks = await Book.find(
          { author: { $in: authorArray.map((a) => a.id) } },
          null,
          {
            limit,
            skip,
          }
        );

        genres = await Genre.find({
          _id: { $in: paginatedBooks.map((b) => b.genre) },
        });

        paginatedBooks = paginatedBooks.map(({ _doc }) => {
          authorName = authorArray.filter((a) => a.id === _doc.author)[0].name;
          genreName = genres.filter((a) => a.id === _doc.genre)[0].name;
          return {
            ..._doc,
            author: authorName,
            genre: genreName,
          };
        });

        totalBooks = await Book.count({
          author: { $in: authorArray.map((a) => a.id) },
        });

        response = getRecordsResponseWithMetadata(
          paginatedBooks,
          limit,
          skip,
          totalBooks
        );

        return res.status(response.status).json(response);

      case "genre":
        const genreArray = await Genre.find({ name: pattern });

        paginatedBooks = await Book.find(
          { genre: { $in: genreArray.map((a) => a.id) } },
          null,
          {
            limit,
            skip,
          }
        );
        authors = await Author.find({
          _id: {
            $in: paginatedBooks.map((b) => b.author),
          },
        });

        paginatedBooks = paginatedBooks.map(({ _doc }) => {
          authorName = authors.filter((a) => a.id === _doc.author)[0].name;
          genreName = genreArray.filter((a) => a.id === _doc.genre)[0].name;

          return {
            ..._doc,
            author: authorName,
            genre: genreName,
          };
        });

        totalBooks = await Book.count({
          genre: { $in: genreArray.map((a) => a.id) },
        });

        response = getRecordsResponseWithMetadata(
          paginatedBooks,
          limit,
          skip,
          totalBooks
        );

        return res.status(response.status).json(response);
      default:
        paginatedBooks = await Book.find().setOptions({ limit, skip });

        authors = await Author.find({
          _id: {
            $in: paginatedBooks.map((b) => b.author),
          },
        });

        genres = await Genre.find({
          _id: {
            $in: paginatedBooks.map((b) => b.genre),
          },
        });

        paginatedBooks = paginatedBooks.map(({ _doc }) => {
          authorName = authors.filter((a) => a.id === _doc.author)[0].name;
          genreName = genres.filter((a) => a.id === _doc.genre)[0].name;

          return {
            ..._doc,
            author: authorName,
            genre: genreName,
          };
        });

        totalBooks = await Book.count();

        response = getRecordsResponseWithMetadata(
          paginatedBooks,
          limit,
          skip,
          totalBooks
        );

        return res.status(response.status).json(response);
        break;
    }
  } catch (unhandledError) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

module.exports = {
  createBook,
  getBookById,
  getAllPaginatedBooks,
};
