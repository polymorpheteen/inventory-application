const pool = require("../db/pool");

async function getRecentAlbums(req, res) {
  try {
    const result = await pool.query(`
      SELECT albums.album_id, albums.title, albums.cover_url, albums.release_year,
             artists.name AS artist_name,
             genres.name AS genre_name
      FROM albums
      JOIN artists ON albums.artist_id = artists.artist_id
      JOIN genres ON albums.genre_id = genres.genre_id
      ORDER BY release_year DESC
      LIMIT 10;
    `);

    const albums = result.rows;

    const albumsByGenre = {};
    albums.forEach((album) => {
      if (!albumsByGenre[album.genre_name]) {
        albumsByGenre[album.genre_name] = [];
      }
      albumsByGenre[album.genre_name].push(album);
    });

    res.render("dashboard", { title: "Dashboard", albums, albumsByGenre });
  } catch (err) {
    console.error("Error fetching albums:", err);
    res.status(500).send("Server Error");
  }
}

module.exports = getRecentAlbums;
