const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const createError = require('http-errors');
// const cors = require('cors');

const routes = require('./routes');
const handleErrors = require('./errors');

dotenv.config();
const { 
  PORT = 3005,
  MONGODB_URI
} = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});

const app = express();
app.use(bodyParser.json());
// app.use(cors());

app.use('/', routes);
app.use((req, res, next) => next(createError(404)));
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}/`);
})
