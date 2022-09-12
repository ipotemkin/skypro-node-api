const router = require('express').Router();
const { greetings } = require('../views/users');
const logger = require('../middlewares/logger');
const userRouter = require('./users');

router.use(logger);
router.use('/users', userRouter);

router.get('/', greetings);

router.get('/books', (req, resp) => {
  resp.status(200);
  resp.send('Here are books!');
});

module.exports = router;
