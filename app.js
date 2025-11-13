require("dotenv").config();
const express = require("express");
const path = require("node:path");
const app = express();

const albumRouter = require("./routes/albumRouter");
const dashboardRouter = require("./routes/dashboardRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use("/", dashboardRouter);
app.use("/album", albumRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`The server is listening on http://localhost:${PORT}`);
});
