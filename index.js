const express = require("express");
const cors = require("cors");
const knex = require("knex");

//==============Data Table===============//
const dataConfig = require("./knexfile");
const db = knex(dataConfig.development);
//==============Data Table===============//

const server = express();

server.use(express.json());
server.use(cors());

//=================GET ENDPOINT===============//
server.get("/note/get/all", (req, res) => {
  db("notes")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      console.log("Error with GET ALL: ", err);
      res.status(500).json({ Error: "Notes cannot be retrieved" });
    });
});
//=================GET ENDPOINT===============//

//=================GET ENDPOINT===============//
server.get("/note/get/:id", (req, res) => {
  const id = req.params.id;
  db("notes")
    .select()
    .where({ id })
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      console.log("Error with GET ID: ", err);
      res.status(500).json({ Error: "Note with ID cannot be retrieved" });
    });
});
//=================GET ENDPOINT===============//

//=================POST ENDPOINT===============//
server.post("/note/create", (req, res) => {
  const newNote = req.body;

  db.insert(newNote)
    .into("notes")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log("Error with POST CREATE: ", err);
      res.status(500).json({ Error: "Pass in a title and content" });
    });
});
//=================POST ENDPOINT===============//

//=================PUT ENDPOINT===============//
server.put("/note/edit/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("notes")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count === 0) {
        res.status(404).json({ Error: "Notes title and content required" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      console.log("Error with EDIT ID: ", err);
      res.status(500).json({ Error: "Pass in a title and content" });
    });
});
//=================PUT ENDPOINT===============//

//=================DELETE ENDPOINT===============//
server.delete("/note/delete/:id", (req, res) => {
  const { id } = req.params;

  db("notes")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log("Error with DELETE ID: ", err);
      res.status(500).json({ Error: "Cannot Delete Note with Id" });
    });
});
//=================DELETE ENDPOINT===============//

server.listen(5000, () =>
  console.log("\n==== Web API Running On Port:5000====\n")
);
