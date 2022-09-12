const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: [5, 'Min 5 letters'],
  },
  name: {
    type: String,
    require: false,
    minLength: [2, 'Too short name (min 2 letters)'],
  },
  surname: {
    type: String,
    require: false,
    minLength: [2, 'Too short name (min 2 letters)'],
  },
});

module.exports = mongoose.model('users', userSchema);
