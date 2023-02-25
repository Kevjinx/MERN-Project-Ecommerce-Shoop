//404 error handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.log(req.originalUrl);
  res.status(404);
  next(error);
};

//505 error handler
//err as first param to override default error handler
const errorHandler = (err, req, res, next) => {
  //just in case we get a 200 status code with error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next(err);
};

export { notFound, errorHandler };
