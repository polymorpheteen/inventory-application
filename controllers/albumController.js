const pool = require("../db/pool");

async function getAlbum(req, res) {
  const { albumId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM albums WHERE album_id = $1",
      [albumId]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Album not found");

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = { getAlbum };
