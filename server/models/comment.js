"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Art }) {
      Comment.belongsTo(Art, { foreignKey: "artId" });
      Comment.belongsTo(User, { foreignKey: "userId" });
    }
  }
  Comment.init(
    {
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
