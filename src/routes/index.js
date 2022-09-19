const router = require('express').Router();
const createError = require('http-errors');
const logger = require('../middlewares/logger');
const userRouter = require('./users');
const bookRouter = require('./books');
const handleErrors = require('../middlewares/errors');

router.use(logger);

// routes
router.use('/users', userRouter);
router.use('/books', bookRouter);
router.get('/', (req, res, next) => {
  // #swagger.ignore = true
  res.status(200);
  res.send('Hello! For SWAGGER UI please visit /docs');    
});

// to handle error 404
router.use((req, res, next) => next(createError(404)));

// to handle other errors
router.use(handleErrors);

module.exports = router;
