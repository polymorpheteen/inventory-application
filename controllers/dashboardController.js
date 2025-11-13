const pool = require("../db/pool");

async function getRecentAlbums(req, res) {
  try {
    const result = await pool.query(`
            SELECT albums.album_id, albums.title, albums.cover_url, albums.release_year, artists.name AS artist_name
            FROM albums
            JOIN artists ON albums.artist_id = artists.artist_id
            ORDER BY release_year DESC
            LIMIT 10; 
            `);

    let albums = result.rows;
    albums = albums.sort(() => Math.random() - 0.5);

    res.render("dashboard", { title: "Dashboard", albums });
  } catch (err) {
    console.error("Error fetching albums:", err);
    res.status(500).send("Server Error");
  }
}

module.exports = getRecentAlbums;
