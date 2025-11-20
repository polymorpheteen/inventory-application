const { Router } = require("express");
const {
  getSearch,
  getSearchQuery,
} = require("../controllers/searchController");

const searchRouter = Router();

searchRouter.get("/", getSearch);
searchRouter.get("/results", getSearchQuery);

module.exports = searchRouter;
