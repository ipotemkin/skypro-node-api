const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');

const routes = require('./routes');

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

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}/`);
})
