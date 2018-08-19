const router = require("express").Router();
const Notes = require("../schema/noteSchema");

const get = (req, res) => {
  Notes.find()
    .then(notes => {
      res.status(200).json({ notes });
    })
    .catch(err => {
      res.status(500).json({ Error: err.message });
    });
};
const post = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json("Both title and content required");
  }
  Notes.create({ title, content }).then(note => {
    if (!note) {
      res.status(404).json("Note not created");
    } else {
      res.status(201).json({ note });
    }
  });
};
const getId = (req, res) => {
  Notes.findById(req.params.id)
    .then(note => res.json({ note }))
    .catch(err => res.status(500).json(err.message));
};

const deleteId = (req, res) => {
  Notes.findByIdAndRemove(req.params.id)
    .then(note => {
      res.status(200).json({
        Success: `${req.params.id} successfully removed from database`
      });
    })
    .catch(err => {
      res.status(500).json({ Error: err.message });
    });
};

const updateId = (req, res) => {
  const { title, content } = req.body;

  Notes.findByIdAndUpdate(req.params.id, { title, content })
    .then(note => res.status(200).json(req.body))
    .catch(err => res.status(500).json({ Error: err.message }));
};

router
  .route("/")
  .get(get) //api/notes
  .post(post);

router
  .route("/:id")
  .get(getId)
  .delete(deleteId)
  .put(updateId);

module.exports = router;
