const { Router } = require("express");
const { getAlbum } = require("../controllers/albumController");

const albumRouter = Router();

albumRouter.get("/:albumId", getAlbum);

module.exports = albumRouter;
