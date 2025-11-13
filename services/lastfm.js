const axios = require("axios");
const API_KEY = process.env.LASTFM_API_KEY;

async function getCoverUrl(artist, album) {
  try {
    const response = await axios.get("http://ws.audioscrobbler.com/2.0/", {
      params: {
        method: "album.getinfo",
        api_key: API_KEY,
        artist,
        album,
        format: "json",
      },
    });

    const images = response.data.album?.image;
    if (!images) return null;

    return images[images.length - 1]["#text"] || null;
  } catch (err) {
    console.error("Error fetching album cover:", err.message);
    return null;
  }
}

module.exports = { getCoverUrl };
