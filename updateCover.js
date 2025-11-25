require("dotenv").config(); // load API key
const { getCoverUrl } = require("./services/lastfm");
const { updateCoverUrl } = require("./db/queries");

/**
 * Fetches the album cover from Last.fm and updates the database.
 * @param {number} albumId
 * @param {string} artist
 * @param {string} albumTitle
 * @returns
 */
async function updateAlbumCover(albumId, artist, albumTitle) {
  try {
    const coverUrl = await getCoverUrl(artist, albumTitle);
    if (!coverUrl) return console.log("Cover not found:", artist, albumTitle);

    const updated = await updateCoverUrl(albumId, coverUrl);
    console.log("Updated album:", updated);
  } catch (err) {
    console.error("Error Updating cover:", err);
    throw err;
  }
}

module.exports = { updateAlbumCover };
