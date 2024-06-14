require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const authRouter = require("./route/authRoute");
const projectRouter = require("./route/projectRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const port = process.env.APP_PORT || 4000;

const app = express();

app.use(express.json());

// All Routes wil be here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
