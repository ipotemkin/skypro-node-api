const createError = require('http-errors');

const Book = require('../models/book');

const getBooks = async (req, res, next) => {
  return Book.find({})
    .then(books => res.status(200).send(books))
    .catch(error => next(error));
};

const getBook = async (req, res, next) => {
  const { id } = req.params;
  return Book.findById(id)
    .then((book) => {
      if (!book) throw createError(404, `Book ${id} not found`); 
      else res.status(200).send(book);
    })
    .catch(err => next(err));
};

const createBook = (req, res, next) => {
  const data = req.body;
  Book.create(data)
    .then(book => res.status(201).send(book))
    .catch(error => next(error));
}

const updateBook = (req, resp, next) => {
  const { id } = req.params;
  Book.findByIdAndUpdate(id, {...req.body })
      .then(() => {
        Book.findById(id)
          .then(book => resp.status(200).send(book)); // to get the refreshed book
      }).catch(error => next(error));
}

const deleteBook = (req, res, next) => {
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
