const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class BlogReadinglist extends Model {}

BlogReadinglist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    readingListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "readingList", key: "id" },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blog", key: "id" },
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blogReadinglist",
  }
);

module.exports = BlogReadinglist;
