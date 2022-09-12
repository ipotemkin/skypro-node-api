const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minLength: [2, 'Min 2 letters'],
  },
  author: {
    type: String,
    require: false,
    minLength: [2, 'Min 2 letters'],
  },
  release_year: {
    type: Number,
    require: false,
  },
});

module.exports = mongoose.model('books', bookSchema);
