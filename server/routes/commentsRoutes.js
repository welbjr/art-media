const express = require("express");
const commentControllers = require("../controllers/commentController");

const routes = express.Router();

// todo: patch
routes
  .route("/")
  .get(commentControllers.getComments)
  .post(commentControllers.createComment)
  .delete(commentControllers.deleteComment);

routes.get("/arts/:artId", commentControllers.getArtsComments);

module.exports = routes;
