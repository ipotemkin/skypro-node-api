const createError = require('http-errors');

const Book = require('../models/book');

const getBooks = async (req, res, next) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Get all books'
  // #swagger.description = 'Get all books'
  /* #swagger.responses[200] = {
     description: 'Array of all books',
     schema: { $ref: '#/definitions/Books' }
  } */

  return Book.find({})
    .then(books => res.status(200).send(books))
    .catch(error => next(error));
};

const getBook = async (req, res, next) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Get the specified book'
  // #swagger.description = 'Get the specified book'
  /* #swagger.parameters['id'] = {
   description: 'Book ID',
   type: 'string',
   required: true
  }
  #swagger.responses[200] = {
    description: 'Book with the specified ID',
    schema: { $ref: '#/definitions/Book' },
  } */

  const { id } = req.params;
  return Book.findById(id)
    .then((book) => {
      if (!book) throw createError(404, `Book ${id} not found`); 
      else res.status(200).send(book);
    })
    .catch(err => next(err));
};

const createBook = async (req, res, next) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Create a book'
  // #swagger.description = 'Create a book'
  /* #swagger.parameters['NewBook'] = {
    in: 'body',
    description: 'New book',
    type: 'object',
    required: true,
    schema: { $ref: '#/definitions/NewBook' }
  } */
  /* #swagger.responses[201] = {
    description: 'New book',
    schema: { $ref: '#/definitions/Book' }
  } */

  const data = req.body;
  Book.create(data)
    .then(book => res.status(201).send(book))
    .catch(error => next(error));
}

const updateBook = async (req, resp, next) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Update the specified book'
  // #swagger.description = 'Update the specified book'
  /* #swagger.parameters['id'] = {
   description: 'Book ID',
   type: 'string',
   required: true
  } */
  /* #swagger.parameters['NewBook'] = {
   in: 'body',
   description: 'Book with updated fields',
   type: 'object',
   required: true,
   schema: { $ref: '#/definitions/NewBook' }
  } */
  /* #swagger.responses[200] = {
    description: 'Updated book',
    schema: { $ref: '#/definitions/Book' },
  } */

  const { id } = req.params;
  Book.findByIdAndUpdate(id, {...req.body })
      .then(() => {
        Book.findById(id)
          .then(book => resp.status(200).send(book)); // to get the refreshed book
      }).catch(error => next(error));
}

const deleteBook = async (req, res, next) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Delete the specified book'
  // #swagger.description = 'Delete the specified book'
  /* #swagger.parameters['id'] = {
   description: 'Book ID',
   type: 'string',
   required: true
  }
  #swagger.responses[200] = {
    description: 'Operation result info',
    schema: { $ref: '#/definitions/DeletedInfo' },
  } */

  const {id} = req.params;
  Book.deleteOne({"_id": id})
      .then((dbResponse) => res.status(200).send(dbResponse))
      .catch(error => next(error));
}

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
}
