const dotenv = require('dotenv');
const mongoose = require('mongoose');
const process = require('process');

// dotenv.config();
// const { 
//   PORT = 3005,
//   MONGODB_URI
// } = process.env;
const getDb = (dbURI) => {
    mongoose.connect(dbURI,
        { useNewUrlParser: true, },
        () => {
          if (!mongoose.connection.readyState) {
            console.log('Database error');
            process.exit(1);
          }
        }
      );    
}

module.exports = getDb;
