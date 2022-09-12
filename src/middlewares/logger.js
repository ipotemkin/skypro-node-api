const logger = (req, resp, next) => {
  console.log(req.originalUrl);
  next();
}

module.exports = logger;
