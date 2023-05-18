const { Schema, model, isObjectIdOrHexString } = require("mongoose");

const Book = require("../book/Book.Schema");

const {
  MessageDictionary: { ERROR },
} = require("../../helper/message.dictionary");

const CheckoutSchema = new Schema({
  book: {
    type: String,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
    validate: [
      {
        validator: (_id) => {
          return isObjectIdOrHexString(_id);
        },
        message: ERROR.CHECKOUT.BOOK_ID.INVALID,
      },
      {
        validator: async (_id) => {
          return await Book.exists({ _id });
        },
        message: ERROR.CHECKOUT.BOOK_ID.NOT_FOUND,
      },
      {
        validator: async (_id) => {
          return await Book.exists({ _id, stock: { $gt: 0 } });
        },
        message: ERROR.CHECKOUT.BOOK_ID.OUT_OF_STOCK,
      },
    ],
  },
  student: {
    type: String,
  },
  librarian: {
    type: String,
  },
  checkingAt: {
    type: Date,
  },
  checkoutAt: {
    type: Date,
  },
  status: {
    type: String,
  },
});

module.exports = model("checkout", CheckoutSchema);
