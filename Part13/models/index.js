const Blog = require("./blog");
const User = require("./user");
const UserReading = require("./userReading");
const ActiveSession = require("./activeSession");

User.hasMany(Blog, { as: "blogsCreated" });
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: UserReading, as: "blogsReading" });
Blog.belongsToMany(User, { through: UserReading, as: "inReadingList" });

User.hasOne(ActiveSession);
ActiveSession.belongsTo(User);

module.exports = {
  Blog,
  User,
  UserReading,
  ActiveSession,
};
