const AppError = require("../utils/appError");

const sendErrorDev = (error, res) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message;
  const stack = error.stack;

  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

const sendErrorProd = (error, res) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message;
  const stack = error.stack;

  if (error.isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });
  }

  console.log(error.name, error.message, stack);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

const globalErrorHandler = (error, req, res, next) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    error = new AppError(error.errors[0].message, 400);
  }
  if (error.name === "SequelizeValidationError") {
    error = new AppError(error.errors[0].message, 400);
  }
  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(error, res);
  }
  sendErrorProd(error, res);
};

module.exports = globalErrorHandler;
