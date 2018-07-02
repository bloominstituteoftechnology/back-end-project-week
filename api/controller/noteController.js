const router = require('express').Router();
const Note = require('../model/Note.js');
const jwt = require('jsonwebtoken');

const protectedPath = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ err });
      }
      next();
    })
  } else {
    return res.status(401).json({ message:  `You shall not pass` });
  }
}

router.all('/*', protectedPath);

router.route('/')
    .post((req, res) => {
        const newNote = ({ title, body, email } = req.body);
        Note.create(newNote)
            .then(response => res.status(201).json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    });

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Note.findById(id)
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    })
    .put((req, res) => {
        const updatedNote = ({ title, body } = req.body);
        const { id } = req.params;
        Note.findByIdAndUpdate(id, updatedNote)
            .then(() => {
                Note.findById(id)
                    .then(response => res.status(202).json(response))
                    .catch(err => res.status(500).json({ error: err.message }));
            })
            .catch(err => res.status(500).json({ error: err.message }));
    })
    .delete((req, res) => {
        const { id } = req.params;
        Note.findByIdAndDelete(id)
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    });


module.exports = router;