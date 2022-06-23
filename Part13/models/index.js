const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");
const BlogReadingList = require("./blog_readinglist");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(ReadingList, { through: BlogReadingList });
ReadingList.belongsToMany(Blog, { through: BlogReadingList });

module.exports = {
  Blog,
  User,
  ReadingList,
  BlogReadingList,
};
