const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof MyError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = errorHandler;
