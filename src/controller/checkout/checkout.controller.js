const { request, response } = require("express");

const Checkout = require("../../schema/checkout/Checkout.Schema");
const {
  unHandledExceptionResponse,
  getRecordsResponse,
  getRecordsResponseWithMetadata,
} = require("../../response/general/general.response");
const { userStore } = require("../../config/user.store");
const Book = require("../../schema/book/Book.Schema");
const User = require("../../schema/user/User.Schema");

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

const getAllCheckouts = async (req = request, res = response) => {
  try {
    const { limit = 10, skip = 0, id } = req.query;

    let result, books, bookName, studentName, total, response;

    if (id) {
      result = await Checkout.find({ student: id, status: "checkout" }, null, {
        limit,
        skip,
      });

      books = await Book.find({
        _id: { $in: result.map((c) => c.book) },
      });

      const { firstName, lastName } = await User.findOne({
        firebaseId: id,
      }).select("firstName lastName");

      studentName = `${firstName} ${lastName}`;

      result = result.map(({ _doc }) => {
        bookName = books.filter((b) => b.id === _doc.book)[0].tittle;
        return {
          ..._doc,
          book: bookName,
          student: studentName,
        };
      });

      total = await Checkout.count({ student: id, status: "checkout" });

      response = getRecordsResponseWithMetadata(result, limit, skip, total);

      return res.status(response.status).json(response);
    } else {
      result = await Checkout.find({ status: "checkout" }, null, {
        limit,
        skip,
      });

      books = await Book.find({
        _id: { $in: result.map((c) => c.book) },
      });

      let students = await User.find({
        firebaseId: { $in: result.map((c) => c.student) },
      });

      students = students.map(({ _doc }) => {
        return {
          id: _doc.firebaseId,
          studentName: `${_doc.firstName} ${_doc.lastName}`,
        };
      });

      result = result.map(({ _doc }) => {
        bookName = books.filter((b) => b.id === _doc.book)[0].tittle;
        studentName = students.filter((s) => s.id === _doc.student)[0]
          .studentName;
        return {
          ..._doc,
          book: bookName,
          student: studentName,
        };
      });

      total = await Checkout.count({ status: "checkout" });

      response = getRecordsResponseWithMetadata(result, limit, skip, total);

      return res.status(response.status).json(response);
    }
  } catch (unhandledError) {
    console.log(unhandledError);

    const response = unHandledExceptionResponse();
    return res.status(response.status).json(response);
  }
};

const updateCheckout = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const librarian = userStore.getState().uid;

    const checkout = await Checkout.findByIdAndUpdate(id, {
      status: "checkin",
      librarian,
      checkingAt: new Date(),
    });

    const bookToUpdate = await Book.findById(book);

    bookToUpdate.stock += 1;

    await bookToUpdate.save();

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
  getAllCheckouts,
  updateCheckout,
};
