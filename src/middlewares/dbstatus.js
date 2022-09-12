const mongoose = require('mongoose');

const dbStatus = () => {
  return { 
     state: 'up', 
     dbState: mongoose.STATES[mongoose.connection.readyState] 
  }
};

module.exports = dbStatus;
