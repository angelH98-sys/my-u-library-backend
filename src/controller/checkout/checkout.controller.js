const { request, response } = require("express");

const Checkout = require("../../schema/checkout/Checkout.Schema");
const {
  unHandledExceptionResponse,
  getRecordsResponse,
} = require("../../response/general/general.response");
const { userStore } = require("../../config/user.store");
const Book = require("../../schema/book/Book.Schema");

const createNewCheckout = async (req = request, res = response) => {
  try {
    const { book } = req.body;
    const student = userStore.getState().uid;
    const checkoutAt = new Date();
    const status = "checkout";

    const bookToUpdate = await Book.findById(book);

    bookToUpdate.stock -= 1;

    await bookToUpdate.save();

    const checkout = new Checkout({ book, student, checkoutAt, status });

    await checkout.save();

    const response = getRecordsResponse(checkout);

    return res.status(response.status).json(response);
  } catch (unhandledError) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

module.exports = {
  createNewCheckout,
};
