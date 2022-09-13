const createError = require('http-errors');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  // #swagger.description = 'Get all users'
  /* #swagger.responses[200] = {
     description: 'Array of all users',
     schema: { $ref: '#/definitions/Users' }
 } */
  return User.find({})
    .then(users => res.status(200).send(users))
    .catch(error => next(error));
};

const getUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get the specified user'
  // #swagger.description = 'Get the specified user'
  /* #swagger.parameters['id'] = {
   description: 'User ID',
   type: 'string',
   required: true
  }
  #swagger.responses[200] = {
    description: 'User with the specified ID',
    schema: { $ref: '#/definitions/User' },
  } */
 const { id } = req.params;
  return User.findById(id)
    .then((user) => {
      if (!user) throw createError(404, `User ${id} not found`); 
      else res.status(200).send(user);
    })
    .catch(err => next(err));
};

const createUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Create a user'
  // #swagger.description = 'Create a user'
  /* #swagger.parameters['NewUser'] = {
    in: 'body',
    description: 'New user',
    type: 'object',
    required: true,
    schema: { $ref: '#/definitions/NewUser' }
  } */
  /* #swagger.responses[201] = {
    description: 'New user',
    schema: { $ref: '#/definitions/User' }
  } */

  const data = req.body;
  User.create(data)
    .then(user => res.status(201).send(user))
    .catch(error => next(error));
}

const updateUser = async (req, resp, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Update the specified user'
  // #swagger.description = 'Update the specified user'
  /* #swagger.parameters['id'] = {
    description: 'User ID',
    type: 'string',
    required: true
  } */
  /* #swagger.parameters['NewUser'] = {
    in: 'body',
    description: 'User with updated fields',
    type: 'object',
    required: true,
    schema: { $ref: '#/definitions/NewUser' }
  } */
  /* #swagger.responses[200] = {
    description: 'Updated user',
    schema: { $ref: '#/definitions/User' },
  } */

  const { id } = req.params;
  User.findByIdAndUpdate(id, {...req.body })
      .then(() => {
        User.findById(id)
          .then(user => resp.status(200).send(user)); // to get the refreshed user
      }).catch(error => next(error));
}

const deleteUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete the specified user'
  // #swagger.description = 'Delete the specified user'
  /* #swagger.parameters['id'] = {
    description: 'User ID',
    type: 'string',
    required: true
  }
  #swagger.responses[200] = {
    description: 'Operation result info',
    schema: { $ref: '#/definitions/DeletedInfo' },
  } */
 const {id} = req.params;
  User.deleteOne({"_id": id})
      .then((dbResponse) => res.status(200).send(dbResponse))
      .catch(error => next(error));
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
