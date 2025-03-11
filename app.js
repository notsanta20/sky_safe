const express = require(`express`);
const app = express();
const path = require(`node:path`);
const assetPath = path.join(__dirname, "public");
const router = require(`./router/router`);
require(`dotenv`).config();
const session = require(`express-session`);
const sessionStorage = require(`./db/sessionStorage`);
const passport = require(`passport`);

app.use(express.static(assetPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(
  process.env.localPort,
  console.log(`Server running at port ${process.env.localPort}`)
);
