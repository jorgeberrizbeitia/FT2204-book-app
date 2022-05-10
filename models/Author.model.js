
const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({

  name: {
    type: String
  },
  country: {
    type: String
  },
  yearBorn: {
    type: Number
  }

})

const AuthorModel = mongoose.model("author", authorSchema);

module.exports = AuthorModel;