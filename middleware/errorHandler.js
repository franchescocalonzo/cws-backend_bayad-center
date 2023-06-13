const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  switch (statusCode) {
    case 400:
      res.json({
        title: "Bad request.",
        message: "The server cannot or will not process the request due to client err.",
        stackTrace: err.stack,
      });
      break;
    case 404:
      res.json({
        title: "Not found.",
        message: "Request cannot be found.",
        stackTrace: err.stack,
      });
      break;
    case 500:
      res.json({
        title: "Server error.",
        message: "Internal server error.",
        stackTrace: err.stack,
      });
    default:
      break;
  }
};

module.exports = errorHandler;
