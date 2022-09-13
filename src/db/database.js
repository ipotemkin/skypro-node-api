const mongoose = require('mongoose');
const process = require('process');

const getDb = (dbURI) => {
  // DEBUG
  // console.log('dbURI =' + dbURI);  
  
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
