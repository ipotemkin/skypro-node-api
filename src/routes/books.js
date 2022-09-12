const router = require('express').Router();
const {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
   } = require('../views/books');

router.get('/', getBooks);

router.get('/:id', getBook);
router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
