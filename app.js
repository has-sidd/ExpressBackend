require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const authRouter = require("./route/authRoute");
const port = process.env.APP_PORT || 4000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Rest APIs are working...",
  });
});

// All Routes wil be here
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found!",
  });
});

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
