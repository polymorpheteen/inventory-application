const pool = require("../db/pool");
const { updateAlbumCover } = require("../services/updateCover");

async function getAlbum(req, res) {
  const { albumId } = req.params;

  try {
    const trackResult = await pool.query(
      `SELECT title, duration, track_number 
      FROM tracks 
      WHERE album_id = $1
      ORDER BY track_number`,
      [albumId]
    );

    const albumResult = await pool.query(
      `SELECT 
      albums.*,
      artists.name AS artist_name
      FROM albums
      JOIN artists ON albums.artist_id = artists.artist_id 
      WHERE album_id = $1`,
      [albumId]
    );

    if (albumResult.rows.length === 0) {
      return res.status(404).send("Album not found");
    }

    const album = albumResult.rows[0];

    res.render("album-details", {
      title: album.title,
      tracks: trackResult.rows,
      album,
    });
  } catch (err) {
    console.error("Error fetching album tracks:", err);
    res.status(500).send("Server error");
  }
}

async function showCreateAlbumForm(req, res) {
  try {
    const artists = await pool.query(
      "SELECT artist_id, name FROM artists ORDER BY name"
    );

    const genres = await pool.query("SELECT * FROM genres ORDER BY name");

    res.render("create-album", {
      title: "Add New Album",
      artists: artists.rows,
      genres: genres.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function createAlbum(req, res) {
  const { title, artist_id, genre_id, release_year, passphrase } = req.body;

  const SECRET_PASSPHRASE = process.env.ALBUM_PASSPHRASE;

  if (passphrase !== SECRET_PASSPHRASE) {
    return res.status(403).send("Invalid passphrase. Album not created.");
  }

  try {
    const check = await pool.query(
      "SELECT * FROM albums WHERE title = $1 AND artist_id = $2",
      [title, artist_id]
    );

    if (check.rows.length > 0) {
      return res.status(400).send("This album already exists for this artist.");
    }

    const result = await pool.query(
      `INSERT INTO albums (title, artist_id, genre_id, release_year)
      VALUES ($1, $2, $3, $4)
      RETURNING album_id`,
      [title, artist_id, genre_id, release_year]
    );

    const newAlbumId = result.rows[0].album_id;

    const artistResult = await pool.query(
      "SELECT name FROM artists WHERE artist_id = $1",
      [artist_id]
    );

    const artistName = artistResult.rows[0].name;

    await updateAlbumCover(newAlbumId, artistName, title);

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = { getAlbum, showCreateAlbumForm, createAlbum };
