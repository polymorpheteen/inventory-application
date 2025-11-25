const { Router } = require("express");
const {
  getAlbum,
  showCreateAlbumForm,
  createAlbum,
} = require("../controllers/albumController");

const albumRouter = Router();

albumRouter.get("/new", showCreateAlbumForm);
albumRouter.post("/new", createAlbum);

albumRouter.get("/:albumId", getAlbum);

module.exports = albumRouter;
