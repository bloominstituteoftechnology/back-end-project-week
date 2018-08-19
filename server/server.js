const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const database = "back-end-server";

const notesController = require("./routes/notesController");
const userController = require("./routes/userController");

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost/${database}`)
  .then(console.log("\n=== API connected to back-end-server database ===\n"))
  .catch(err => console.log(err, "error connecting to database"));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

server.use(express.json());
server.use(cors(corsOptions));

server.get("/", (req, res) => {
  res.send({ api: "sanity check" });
});

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = "Derrick is really Kevin";

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log("decoding error: ", err);
        return res.status(402).json({ message: "error decoding token", err });
      }
      next();
    });
  } else {
    res.send("you have no token");
  }
};

server.use("/api/notes", restricted, notesController);
server.use("/api/user", userController);

const port = process.env.POST || 5555;
server.listen(port, () => {
  console.log(`\nServer is listening on port ${port}`);
});
