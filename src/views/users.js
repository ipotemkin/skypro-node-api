const createError = require('http-errors');

const User = require('../models/user');

const greetings = (req, res, next) => {
    res.status(200);
    res.send('Hello world!');    
}

const getUsers = (req, res, next) => {
  return User.find({})
    .then(users => res.status(200).send(users))
    .catch(error => next(error));
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  return User.findById(id)
    .then((user) => {
      if (!user) throw createError(404, `User ${id} not found`); 
      else res.status(200).send(user);
    })
    .catch(err => next(err));
};

const createUser = (req, res, next) => {
  const data = req.body;
  User.create(data)
    .then(user => res.status(201).send(user))
    .catch(error => next(error));
}

const updateUser = (req, resp, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, {...req.body })
      .then(() => {
        User.findById(id)
          .then(user => resp.status(200).send(user)); // to get the refreshed user
      }).catch(error => next(error));
}

const deleteUser = (req, res, next) => {
  const {id} = req.params;
  User.deleteOne({"_id": id})
      .then((dbResponse) => res.status(200).send(dbResponse))
      .catch(error => next(error));
}

module.exports = {
  greetings,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
