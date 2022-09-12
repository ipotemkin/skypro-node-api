const handleErrors = (error, req, res, next) => {
    res.status(error.status || 400);
    res.json({ 
      status: error.status || 400,
      message: error.message,
      stack: error.stack
    });
};

module.exports = handleErrors;
