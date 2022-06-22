const jwt = require("jsonwebtoken");

const { SECRET } = require("./config");
const { Blog, User } = require("../models/");

const extractToken = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return jwt.verify(authorization.substring(7), SECRET);
  } else {
    return null;
  }
};

const tokenExtractor = (req, res, next) => {
  req.decodedToken = extractToken(req);

  next();
};

const userExtractor = async (req, res, next) => {
  const token = extractToken(req);
  const userId = token?.id;

  if (userId) {
    req.user = await User.findByPk(userId);
  } else {
    req.user = null;
  }

  next();
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const errorHandler = (err, req, res, next) => {
  console.log(err);

  switch (err.name) {
    case "JsonWebTokenError":
      return res.status(401).json({
        error: "invalid token",
      });
    case "TokenExpiredError":
      return res.status(401).json({
        error: "token expired",
      });
    case "SequelizeValidationError":
      return res.status(400).json({
        error: generateSqlErrorMessage(err.errors[0]),
      });
  }

  return res.status(500).json({
    error: err.toString(),
  });
};

const generateSqlErrorMessage = (error) => {
  const message = `${error.type} in ${error.path}: ${error.value}. ${error.message}`;
  return message;
};

module.exports = {
  tokenExtractor,
  userExtractor,
  blogFinder,
  errorHandler,
  generateSqlErrorMessage,
};
