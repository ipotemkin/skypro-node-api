const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const createError = require('http-errors');
const process = require('process');
// const cors = require('cors');

const routes = require('./routes');
const handleErrors = require('./middlewares/errors');
const dbStatus = require('./middlewares/dbstatus')

dotenv.config();
const { 
  PORT = 3005,
  MONGODB_URI
} = process.env;

mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true, },
  () => {
    if (!mongoose.connection.readyState) {
      console.log('Database error');
      process.exit(1);
    }
  }
);


const app = express();

// to parse json
app.use(bodyParser.json());

// to add CORS contraints
// app.use(cors());


// healthcheck endpoint
app.use('/health', require('express-healthcheck')({
  healthy: dbStatus
}));

// routers
app.use('/', routes);

// to handle error 404
app.use((req, res, next) => next(createError(404)));

// to handle other errors
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}/`);
})
