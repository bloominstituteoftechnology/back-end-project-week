express = require("express");
Note = require("../Models/Note");
router = express.Router();

router
  .route("/")
  .get((req, res) => {
    Note.find()
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json({ error: err.message }));
  })

  .post((req, res) => {
    const { title, content, user } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        error: "Please provide a title and/or content for your note."
      });
    }
    Note.create({ title, content, user })
      .then(note => res.status(201).json(note))
      .catch(err => res.status(500).json({ error: err.message }));
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    Note.findById(id)
      .then(note => {
        if (note) {
          return res.json(note);
        }
        res.status(404).json({
          error: `The note with the specified id (${id}) does not exist.`
        });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .put((req, res) => {
    const { id } = req.params;
    const updates = ({ title, content, user } = req.body);

    Note.findByIdAndUpdate(id, updates, { new: true })
      .then(note => {
        if (note) {
          return res.json(note);
        }
        res.status(404).json({
          error: `The note with the specified id (${id}) does not exist.`
        });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
      .then(removed => {
        if (removed) {
          return res.json(removed);
        }
        res.status(404).json({
          error: `The note with the specified id (${id}) does not exist.`
        });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

module.exports = router;
