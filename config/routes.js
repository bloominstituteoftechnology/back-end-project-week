const db = require("../database/dbConfig");

module.exports = server => {
  server.get("/", root);
  server.get("/api/notes", get_notes);
  server.post("/api/notes", post_notes);
  server.get("/api/notes/:id", get_note_id);
  server.put("/api/notes/:id", put_note_id);
  server.delete("/api/notes/:id", del_note_id);
};

const root = (req, res) => {
  res.status(200).json("Up and running");
};

const get_notes = (req, res) => {
  db("notes")
    .then(note => {
      res.status(200).json(note);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
};

const post_notes = (req, res) => {
  const note = req.body;
  if (!note.title || !note.text_body) {
    res
      .status(400)
      .json(
        "You must send a title and text_body to create a note in the database"
      );
  } else {
    db.insert(note)
      .into("notes")
      .then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...note });
      })
      .catch(error => res.status(500).json(error.message));
  }
};

const get_note_id = (req, res) => {
  const id = req.params.id;
  db("notes")
    .where("id", Number(id))
    .then(note => res.status(200).json(note))
    .catch(error => res.status(500).json(error.message));
};

const put_note_id = (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db("notes")
    .where("id", id)
    .update(changes)
    .then(ids => {
      const id = ids[0];
      res.status(200).json({ id, ...changes });
    })
    .catch(error => res.status(500).json(error));
};

const del_note_id = (req, res) => {
  const id = req.params.id;
  db("notes")
    .where("id", id)
    .del()
    .then(ids => {
      const id = ids[0];
      res.status(200).json("POST DELETED SUCCESSFULLY");
    })
    .catch(error => res.status(500).json(error));
};
