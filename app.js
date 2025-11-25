require("dotenv").config();
const express = require("express");
const path = require("node:path");
const app = express();

const albumRouter = require("./routes/albumRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const genreRouter = require("./routes/genreRouter");
const searchRouter = require("./routes/searchRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", dashboardRouter);
app.use("/album", albumRouter);
app.use("/genres", genreRouter);
app.use("/search", searchRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`The server is listening on http://localhost:${PORT}`);
});
