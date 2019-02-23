const express = require("express");

const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const notesRouter = require("../api/routes/notesRouter");
const tagsRouter = require("../api/routes/tagsRouter");
// const authRouter = require("../api/routes/authRouter");

server.use(helmet());
server.use(morgan("dev"));
server.use(cors("*"));
server.use(express.json());

server.use("/notes", notesRouter);
server.use("/tags", tagsRouter);
// server.use("/auth", authRouter);
server.get("/", (req, res) => {
  res.json({message: "welcome to Angelina La Salle's back end project week API"})
})

module.exports = server;