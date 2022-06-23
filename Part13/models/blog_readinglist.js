const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class BlogReadingList extends Model {}

BlogReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "readingList", key: "id" },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
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
    modelName: "blogReadingList",
  }
);

module.exports = BlogReadingList;
