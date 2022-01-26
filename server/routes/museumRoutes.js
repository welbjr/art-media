const express = require("express");
const museumControllers = require("../controllers/museumController");

const routes = express.Router();

routes.get("/daily", museumControllers.getDailyArts);
routes.get("/popular", museumControllers.getPopularArts);
routes.get("/popular/:id", museumControllers.getPopularArt);
routes.get("/search/:query", museumControllers.queryArt);

module.exports = routes;
