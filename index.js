const express = require("express");
const db = require("./data/db");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("up and running...");
});

//* POST Request db insert()
server.post("/create", (req, res) => {
  const user = req.body;

  if (!user.title && !user.textBody) {
    return res.status(400).json({
      errorMessage: "Please provide the text for the post."
    });
  }

  db("notes")
    .insert({
      title: req.body.title,
      textBody: req.body.textBody
    })
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...user });
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
