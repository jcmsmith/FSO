const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = null;

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = jwt.verify(authorization.substring(7), SECRET);
  }

  req.decodedToken = token;

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
    default:
      next(err);
  }
};

const generateSqlErrorMessage = (error) => {
  const message = `${error.type} in ${error.path}: ${error.value}. ${error.message}`;
  return message;
};

module.exports = {
  tokenExtractor,
  blogFinder,
  errorHandler,
  generateSqlErrorMessage,
};
