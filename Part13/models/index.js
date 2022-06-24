const Blog = require("./blog");
const User = require("./user");
const UserReading = require("./userReading");

User.hasMany(Blog, { as: "blogsCreated" });
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: UserReading, as: "blogsReading" });
Blog.belongsToMany(User, { through: UserReading, as: "inReadingList" });

module.exports = {
  Blog,
  User,
  UserReading,
};
