const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
if (config.NODE_ENV !== "test") {
  app.use(express.static("build"));
}

app.use(express.json());
app.use(middleware.tokenExtractor);

app.use(middleware.requestLogger);

app.get("/ping", (request, res) => {
  res.status(200).send("pong");
});

app.get("/health", (request, res) => {
  res.status(200).send("all good");
});

app.use("/login", loginRouter);
app.use("/blogs", blogsRouter);
app.use("/users", usersRouter);

if (config.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
