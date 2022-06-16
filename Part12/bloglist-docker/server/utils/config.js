// if (!process.env.USE_ENV) {
//   const path = require("path");
//   require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
// }

const PORT = process.env.PORT || 3001;

const NODE_ENV = process.env.NODE_ENV;

const SECRET = process.env.SECRET;

let MONGODB_URI;

if (NODE_ENV === "test") {
  MONGODB_URI = process.env.MONGODB_URI_TEST;
} else if (NODE_ENV === "production") {
  MONGODB_URI = process.env.MONGODB_URI_PROD;
} else {
  MONGODB_URI = process.env.MONGODB_URI_DEV;
}

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  NODE_ENV,
};
