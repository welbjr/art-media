const express = require("express");
const likeControllers = require("../controllers/likeController");
const isLoggedIn = require("../middlewares/isLoggedIn");

const routes = express.Router();

routes
  .route("/")
  .get(likeControllers.getLikes)
  .post(likeControllers.createLike)
  .delete(likeControllers.deleteLike);

routes.get("/total/:artId", likeControllers.countLikes);
routes.get("/:artId", likeControllers.getLike);

module.exports = routes;
