const { Router } = require("express");
const getRecentAlbums = require("../controllers/dashboardController");

const dashboardRouter = Router();

dashboardRouter.get("/", (req, res) => {
  res.redirect("/dashboard");
});
dashboardRouter.get("/dashboard", getRecentAlbums);

module.exports = dashboardRouter;
