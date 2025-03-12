const express = require(`express`);
const app = express();
const path = require(`node:path`);
const assetPath = path.join(__dirname, "public");
const router = require(`./router/router`);
require(`dotenv`).config();
const session = require(`express-session`);
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const passport = require(`passport`);

app.use(express.static(assetPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(router);

app.listen(
  process.env.localPort,
  console.log(`Server running at port ${process.env.localPort}`)
);
