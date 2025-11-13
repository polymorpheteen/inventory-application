require("dotenv").config(); // load API key
const { getCoverUrl } = require("./services/lastfm");
const { updateCoverUrl } = require("./db/queries");

async function updateAlbumCover(albumId, artist, albumTitle) {
  const coverUrl = await getCoverUrl(artist, albumTitle);
  if (!coverUrl) return console.log("Cover not found");

  const updated = await updateCoverUrl(albumId, coverUrl);
  console.log("Updated album:", updated);
}

// Run the function
updateAlbumCover(1, "The Weeknd", "House of Balloons");
