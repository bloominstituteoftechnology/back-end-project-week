const cl = console.log;
const express = require("express");
// const cors = require('cors')
const cors = require('./middleware/cors')


const db = require("./middleware/helpers");
const PORT = process.env.PORT || 4700;
const server = express();

server.use(express.json(), cors);

server.get('/', (req, res) => {
  res.json("blah")
})

server.post('/signin', (req, res) => {
  const creds = req.body
  db.login(creds).then(user => {
    // if (user && bcrypt.compareSync(creds.password, user.password)) {
    //   const token = generateToken(user);
    //   res.json({ message: `Welcome ${user.username}`, token });
    // } else {
    //   res.status(401).send("Shove off, faker!")
    // }
    if (user && creds.password === user.password) {
        res.json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).send("Shove off, faker!")
      }
  }).catch(err => {
    res.status(500).send(err)
  })
})

server.get("/notes", (req, res) => {
  db.getNotes()
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.getNotes(id)
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post("/notes/create", (req, res) => {
  const note = req.body;
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

server.put('/notes/edit/:id', (req, res) => {
  const {id} = req.params;
  const note = req.body;
  cl(1)
  db.editNote(id, note).then(count => {
    cl(2)
    if (count) {
      db.getNotes(id).then(note => {
        cl(3)
        res.json(note)
      }).catch(err => {
        res.status(500).send(err)
      })
    } else {
      res.status(404).send("the selected note was not updated")
    }
  }).catch(err => {
    res.status(500).send(err)
  })
})

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
