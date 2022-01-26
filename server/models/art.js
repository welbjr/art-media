"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {
    static associate({ Like, Comment }) {
      Art.hasMany(Like, {
        foreignKey: "artId",
        sourceKey: "apiId",
        onDelete: "cascade",
      });
      Art.hasMany(Comment, {
        foreignKey: "artId",
        sourceKey: "apiId",
        onDelete: "cascade",
      });
    }
  }
  Art.init(
    {
      apiId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Art",
    }
  );
  return Art;
};
