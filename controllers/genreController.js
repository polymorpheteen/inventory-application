const pool = require("../db/pool");

async function getGenre(req, res) {
  try {
    const result = await pool.query("SELECT * FROM genres ORDER BY name");
    res.render("browse", {
      title: "Browse Genres",
      genres: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function getGenreAlbums(req, res) {
  const genreId = req.params.id;

  const genreResult = await pool.query(
    "SELECT * FROM genres WHERE genre_id = $1",
    [genreId]
  );

  if (genreResult.rows.length === 0) {
    return res.status(404).send("Genre not found");
  }

  const genre = genreResult.rows[0];

  const albumsResult = await pool.query(
    `
    SELECT
    albums.album_id,
    albums.title,
    albums.cover_url,
    albums.release_year,
    artists.name AS artist_name
    FROM albums
    JOIN artists ON albums.artist_id = artists.artist_id
    WHERE albums.genre_id = $1
    ORDER BY albums.title;
    `,
    [genreId]
  );

  const albums = albumsResult.rows;

  res.render("genre-details", {
    title: genre.name,
    genre: genre,
    albums: albums,
  });
}

module.exports = { getGenre, getGenreAlbums };
