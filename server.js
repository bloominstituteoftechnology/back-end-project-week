const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3333;
const db = require("./data/db.js");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

const { authenticate } = require("./utils/middlewares");

const notesRouter = require("./controllers/NoteController");
const userRouter = require("./controllers/UserController");

db
  .connect()
  .then(() => console.log("\n... API Connected to Database ...\n"))
  .catch(err => console.log("\n*** ERROR Connecting to Database ***\n", err));

server.get("/", (req, res) => {
  res.json({ message: "all good homie" });
});

server.use("/api/notes", authenticate, notesRouter);

server.use("/api/user", userRouter);

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server running on port ${port}`);
});
