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



server.listen(port, () => { console.log(`Server is running on port ${port}`)});
