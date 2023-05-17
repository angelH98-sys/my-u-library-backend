const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = model("author", AuthorSchema);
