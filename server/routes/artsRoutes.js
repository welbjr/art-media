const express = require("express");
const artControllers = require("../controllers/artController");

const routes = express.Router();

routes.route("/");

routes.get("/", artControllers.getArts);
routes.get("/:artId", artControllers.getArt);

module.exports = routes;
