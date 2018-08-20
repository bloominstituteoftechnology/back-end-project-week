const express = require('express');
const server = express();

const db = require("./data/db")

server.use(express.json());

const port = 8000;

//Get all notes
server.get('/api/notes', (req, res) => {
  db.select().from('notes')
  .then(response => {
    res.json({"Message": response});
  })
  .catch(error => {
   res.status(500).send({ error: "Server Error" })
  })
});

//Get note by id
server.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  db.select().from('notes').where('id', id)
    .then(response => {
      res.json({"Message": response});
    })
    .catch(response => {
      res.status(500).send({ error: "Server Error" });
    })
  });

//Create new note
server.post("/api/notes", (req, res) => {
  const { title, content } = req.body;
  db.insert({"title": title,
              "content" : content})
              .into('notes')
    .then(response => (res.json(response)))
    .catch(error => {
     res.status(500).send({ error: "Server Error" })
   })
});
server.listen(port, () => { console.log(`Server is running on port ${port}`)});
