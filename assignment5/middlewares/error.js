const errorMiddleware = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err); // defaults to the larger Express handler if we have sent a response to browser already
  }
  console.error(err);
  res.status(500).send({ error: "Oops, an error has occurred" });
};

module.exports = errorMiddleware;
