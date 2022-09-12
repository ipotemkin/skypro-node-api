const User = require('../models/user');

const greetings = (req, resp, next) => {
    resp.status(200);
    resp.send('Hello world!');    
}

const getUsers = (req, resp) => {
  return User.find({})
    .then(users => resp.status(200).send(users));
};

// const answer = () => {
//   return new Promise((success, reject) => {
//     if 
//   })
// }

const getUser = (req, resp, next) => {
  const { id } = req.params;
  return User.findById(id)
    .then((user) => {
      if (!user) resp.status(404).send('Not found');
      else resp.status(200).send(user);
    })
    .catch((err) => {
      // next(err);
      resp.status(400).send('Bad request');
    });
};

const createUser = (req, resp) => {
  const data = req.body;
  User.create(data)
    .then(user => {
      resp.status(201).send(user);
    })
    .catch(error => {
      resp.status(500).send(error.message);
    } )
}

// TODO refresh user data after update
const updateUser = (req, resp) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, {...req.body })
      .then(() => {
        User.findById(id)
          .then(user => {
            resp.status(200).send(user);
          });
      }).catch((error) => {
      resp.status(500).send(error.message);
  });
}

const deleteUser = (req, resp) => {
  const {id} = req.params;
  User.deleteOne({"_id": id})
      .then((dbResponse) => {
        resp.status(200).send(dbResponse);
      }).catch((error) => {
      resp.status(500).send(error.message);
  });
}

module.exports = {
  greetings,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
