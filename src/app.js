const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const getDb = require('./db/database');
const cors = require('cors');

const routes = require('./routes');
const dbStatus = require('./middlewares/dbstatus')

const swaggerFile = JSON.parse(fs.readFileSync('./src/swagger/output.json'));

dotenv.config();
const { 
  PORT = 3005,
  MONGODB_URI
} = process.env;

// to get DB
getDb(MONGODB_URI);

const app = express();

// to parse json
app.use(bodyParser.json());

// to add CORS contraints
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// healthcheck endpoint
app.use('/health', require('express-healthcheck')({
  healthy: dbStatus
}));

// routers
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server has started on http://localhost:${PORT}/`);
})
