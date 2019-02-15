const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");
const helper = require("./database/helpers");
const bcrypt = require("bcryptjs");

server.use(express.json());
server.use(cors());

const secret = "secretsecretsecret";

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1hr",
    jwtid: "12345"
  };
  return jwt.sign(payload, secret, options);
}

server.get("/", (req, res) => {
  helper
    .getAllNotes()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Projects could not be retrieved at this time." });
    });
});

server.post("/create", (req, res) => {
  const note = req.body;
  helper
    .insertNote(note)
    .into("notes")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.post("/signup", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  helper
    .insertUser(user)
    .then(ids => {
      const id = ids[0];
      db.findUsers(id)
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => {
          res.status(404).send(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

function protected(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        //token will be invalid
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.username = decodedToken.username;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "no token yo!" });
  }
}

server.get("/note/:id", (req, res) => {
  const { id } = req.params;
  helper
    .findNote(id)
    .where("id", id)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to find note" });
    });
});

server.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const note = req.body;
  helper
    .updateNote(id, note)
    .then(id => res.json({ message: "your note edit was successful" }))
    .catch(err => res.send(err));
});

server.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    helper.deleteNote(id)
    .then(count => {
      res.json({message: `Note deleted`})
    })
    .catch(err => res.send('Could not delete this note'))
  });

module.exports = server;
