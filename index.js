const cl = console.log;
const express = require("express");
// const cors = require('cors')
const cors = require("./middleware/cors");
const bcrypt = require("bcryptjs");

const db = require("./middleware/helpers");
const auth = require("./middleware/authenticate");
const PORT = process.env.PORT || 4700;
const server = express();
let activeUser = 0;

server.use(express.json(), cors);

server.get("/users", (req, res) => {
  const header = req.headers.authorization;
  activeUser = auth.getUserID(header);
  res.json({ user: activeUser });
});

server.post("/register", (req, res) => {
  const creds = req.body;
  creds.password = bcrypt.hashSync(creds.password, 12);
  db.addUser(creds)
    .then(ids => {
      const id = ids[0];
      db.findUserByID(id)
        .then(user => {
          activeUser = user.id;
          const token = auth.generateToken(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post("/signin", (req, res) => {
  const creds = req.body;
  db.login(creds)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = auth.generateToken(user);
        activeUser = user.id;
        res.json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).send("Shove off, faker!");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.get("/notes", auth.protected, (req, res) => {
  db.getNotes(activeUser)
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.getNotes(activeUser, id)
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post("/notes/create", (req, res) => {
  const note = req.body;
  note.user_id = activeUser;
  db.addNote(note)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.delete("/notes/delete/:id", (req, res) => {
  const { id } = req.params;
  db.deleteNote(id)
    .then(count => {
      res.json(count);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.put("/notes/edit/:id", (req, res) => {
  const { id } = req.params;
  const note = req.body;
  note.user_id = activeUser;
  db.editNote(id, note)
    .then(count => {
      if (count) {
        db.getNotes(id)
          .then(note => {
            res.json(note);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      } else {
        res.status(404).send("the selected note was not updated");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
