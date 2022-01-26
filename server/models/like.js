"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate({ Art, User }) {
      Like.belongsTo(Art, { foreignKey: "artId", targetKey: "apiId" });
      Like.belongsTo(User, { foreignKey: "userId" });
    }
  }
  Like.init(
    {},
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
