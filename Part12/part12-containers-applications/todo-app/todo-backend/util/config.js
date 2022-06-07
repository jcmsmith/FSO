const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://admin:Pa$$pa$$@localhost:3456/prod_database";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6378";

module.exports = {
  MONGO_URL, //: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL, //: '//localhost:6378'
};
