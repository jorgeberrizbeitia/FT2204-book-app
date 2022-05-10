
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "author" // el nombre de nuestro modelo (collection)
  }],
  cover: {
    type: String
  }
})

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;