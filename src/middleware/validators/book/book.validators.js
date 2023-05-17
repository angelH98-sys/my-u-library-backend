const {
  getSchemaErrorResponse,
} = require("../../../response/general/general.response");
const Book = require("../../../schema/book/Book.Schema");

const checkBookSchemaValidators = async (
  req = request,
  res = response,
  next
) => {
  const book = new Book(req.body);

  try {
    await book.validate();
  } catch (errors) {
    const response = getSchemaErrorResponse(errors.errors);
    return res.status(response.status).json(response);
  }

  next();
};

module.exports = {
  checkBookSchemaValidators,
};
