const { Router } = require("express");
const { getSearchQuery } = require("../controllers/searchController");

const searchRouter = Router();

searchRouter.get("/results", getSearchQuery);

module.exports = searchRouter;
