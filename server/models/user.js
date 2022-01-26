"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Comment }) {
      User.hasMany(Comment, { foreignKey: "userId", onDelete: "cascade" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      googleId: DataTypes.STRING,
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
