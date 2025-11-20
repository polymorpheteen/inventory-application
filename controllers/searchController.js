const pool = require("../db/pool");

function getSearch(req, res) {
  res.render("search", { title: "Search", results: [], query: "" });
}

async function getSearchQuery(req, res) {
  const query = req.query.q;

  if (!query) {
    return res.render("search", { title: "Search", results: [], query: "" });
  }

  try {
    const result = await pool.query(
      `
            SELECT 
                albums.album_id,
                albums.title AS album_title,
                artists.name AS artist_name,
                albums.cover_url
            FROM albums
            JOIN artists ON albums.artist_id = artists.artist_id
            WHERE albums.title ILIKE $1 OR artists.name ILIKE $1
            `,
      [`%${query}%`]
    );

    res.render("search", {
      title: "Search results",
      query,
      results: result.rows,
    });
  } catch (err) {
    console.error("Search error", err);
    res.status(500).send("Server Error");
  }
}

module.exports = { getSearch, getSearchQuery };
