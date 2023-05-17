const { Schema, model } = require("mongoose");

const GenreSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = model("genre", GenreSchema);
