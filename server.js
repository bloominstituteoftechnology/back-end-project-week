const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const helmet = require("helmet");

const server = express();

const usersRouter = require("./users/usersRouter.js");
const notesRouter = require("./notes/notesRouter.js");

const corsOptions = {
  origin: "https://dalambdanotes.herokuapp.com/",
  credentials: true
};

server.use(bodyParser.json());
server.use(cors(corsOptions));
server.use(helmet());

const path = process.env.MONGO_URI;

server.use(
  session({
    secret: process.env.SECRET,
    store: new MongoStore({
      url: process.env.SESSIONS_DB,
      ttl: 60 * 10
    }),
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day in milliseconds
    name: "DontPWNmeh"
  })
);

mongoose
  .connect(path)
  .then(response => {
    console.log("connected to DB");
  })
  .catch(error => {
    console.log("Something went wrong with DB");
  });

server.use("/api/notes", notesRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => res.send("API Running...!"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Listening on ${PORT} ${process.env.MONGO_URI}`)
);
