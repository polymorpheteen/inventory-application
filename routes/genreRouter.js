const { Router } = require("express");
const { getGenre, getGenreAlbums } = require("../controllers/genreController");

const genreRouter = Router();

genreRouter.get("/", getGenre);
genreRouter.get("/:id", getGenreAlbums);

module.exports = genreRouter;
