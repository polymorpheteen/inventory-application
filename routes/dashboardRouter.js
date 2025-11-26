const { Router } = require("express");
const getRecentAlbums = require("../controllers/dashboardController");
const pool = require("../db");

const dashboardRouter = Router();

dashboardRouter.get("/", (req, res) => {
  res.redirect("/dashboard");
});
dashboardRouter.get("/dashboard", getRecentAlbums);

dashboardRouter.get("/dbtest", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    res.send(`DB Connected: ${rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB connection failed");
  }
});

module.exports = dashboardRouter;
