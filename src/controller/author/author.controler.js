const { request, response } = require("express");
const {
  unHandledExceptionResponse,
  getRecordsResponse,
} = require("../../response/general/general.response");
const Author = require("../../schema/author/Author.Schema");

const getAllAuthors = async (req = request, res = response) => {
  try {
    const result = await Author.find();

    const response = getRecordsResponse(result);

    return res.status(response.status).json(response);
  } catch (unhandledError) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

module.exports = {
  getAllAuthors,
};
