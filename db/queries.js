const pool = require("./pool");

async function updateCoverUrl(albumId, coverUrl) {
  const res = await pool.query(
    `UPDATE albums SET cover_url = $1 WHERE album_id = $2 RETURNING *`,
    [coverUrl, albumId]
  );
  return res.rows[0];
}

module.exports = { updateCoverUrl };
