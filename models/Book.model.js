
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  }
})

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;