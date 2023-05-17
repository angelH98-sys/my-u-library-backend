const { request, response } = require("express");
const Genre = require("../../schema/genre/Genre.Schema");
const {
  unHandledExceptionResponse,
  getRecordsResponse,
} = require("../../response/general/general.response");

const getAllGenres = async (req = request, res = response, next) => {
  try {
    const result = await Genre.find();

    const response = getRecordsResponse(result);

    return res.status(response.status).json(response);
  } catch (unhandledError) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

module.exports = {
  getAllGenres,
};
