const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");
const BlogReadinglist = require("./blog_readinglist");

User.hasMany(Blog);
Blog.belongsTo(User);

User.hasMany(ReadingList);
ReadingList.belongsTo(User);

Blog.belongsToMany(ReadingList, { through: BlogReadinglist });
ReadingList.belongsToMany(Blog, { through: BlogReadinglist });

module.exports = {
  Blog,
  User,
  ReadingList,
  BlogReadinglist,
};
