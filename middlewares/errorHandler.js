const errorHandler = (err, req, res, next) => {
  if (err instanceof MyError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }

  next();
};

module.exports = errorHandler;
