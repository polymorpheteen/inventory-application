const pool = require("../db/pool");

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
      `SELECT * FROM albums WHERE album_id = $1`,
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

module.exports = { getAlbum };
