// Custom error handler middleware
// Express' error handler returns HTML, so instead we are making it return JSON

// 404 status page not found handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// 500 status error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = req.status === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
