const router = require('express').Router();
const { greetings } = require('../views/users');
const logger = require('../middlewares/logger');
const userRouter = require('./users');
const bookRouter = require('./books');

router.use(logger);

// routes
router.use('/users', userRouter);
router.use('/books', bookRouter);
router.get('/', greetings);

module.exports = router;
