// app.js
const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const todosRouter = require("./controllers/todos");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
// mongoose config and connection
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongodbURI)
  .then(() => {
    logger.log("Connection established");
  })
  .catch((err) =>
    logger.log("Error connecting to Mongoose server: ", err.message)
  );
// implementation middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(middleware.requestLogger);
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

module.exports = app;
