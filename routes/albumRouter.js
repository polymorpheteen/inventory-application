const { Router } = require("express");
const {
  getAlbum,
  showCreateAlbumForm,
  getAlbum,
  createAlbum,
} = require("../controllers/albumController");

const albumRouter = Router();

albumRouter.get("/:albumId", getAlbum);

albumRouter.get("/new", showCreateAlbumForm);
albumRouter.post("/new", createAlbum);

module.exports = albumRouter;
