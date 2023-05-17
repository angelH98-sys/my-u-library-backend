const { Schema, model } = require("mongoose");

const {
  MessageDictionary: { ERROR },
} = require("../../helper/message.dictionary");
const {
  AuditorySchemaOptions,
} = require("../../helper/auditory.schema.options");

const BookSchema = new Schema({
  tittle: {
    type: String,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
  },
  author: {
    type: String,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
  },
  genre: {
    type: String,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
  },
  stock: {
    type: Number,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
    min: [0, ERROR.BOOK.STOCK.MINIMUM],
  },
  publishedYear: {
    type: Number,
    required: [true, ERROR.FORM.FIELD.REQUIRED],
    min: [0, ERROR.BOOK.STOCK.MINIMUM],
    validate: {
      validator: (year) => {
        return new Date().getFullYear() >= year;
      },
      message: ERROR.BOOK.YEAR.INVALID,
    },
  },
  status: {
    type: Boolean,
  },
  ...AuditorySchemaOptions,
});

module.exports = model("book", BookSchema);
