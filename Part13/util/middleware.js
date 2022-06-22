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

const errorHandler = async (err, req, res, next) => {
  switch (err.name) {
    case "JsonWebTokenError":
      return response.status(401).json({
        error: "invalid token",
      });
    case "TokenExpiredError":
      return response.status(401).json({
        error: "token expired",
      });
    default:
      next(err);
  }
};

module.exports = { tokenExtractor, blogFinder, errorHandler };
