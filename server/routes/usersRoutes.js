const express = require("express");
const userControllers = require("../controllers/userController");

const routes = express.Router();

routes
  .route("/")
  .get(userControllers.getUsers)
  .post(userControllers.createUser)
  .delete(userControllers.deleteUser)
  .patch(userControllers.updateUser);

module.exports = routes;
