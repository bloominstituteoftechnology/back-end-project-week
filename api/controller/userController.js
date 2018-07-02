const router = require('express').Router();
const User = require('../model/User.js');
const Note = require('../model/Note.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

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
        const newUser = ({ email, password } = req.body);
        User.create(newUser)
            .then(response => res.status(201).json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    })

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        User.findById(id)
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    })
    .put((req, res) => {
        if (req.body.password !== '') {
            bcrypt.hash(req.body.password, SALT_ROUNDS)
            .then(hash => {
                req.body.password = hash;
                const updateUser = ({ email, firstName, lastName, password } = req.body);
                const { id } = req.params;
                User.findByIdAndUpdate(id, (updateUser))
                    .then(response => {
                        res.status(202).json(response)})
                    .catch(err => res.status(500).json({ error: err.message }));
                })
            .catch(err => console.log(err));
        } else {
            const updateUser = ({ email, firstName, lastName, password } = req.body);
            const { id } = req.params;
            User.findByIdAndUpdate(id, (updateUser))
                .then(response => res.status(202).json(response))
                .catch(err => res.status(500).json({ error: err.message }));
        }
    })
    .delete((req, res) => {
        const { id } = req.params;
        User.findByIdAndRemove(id)
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    });

router.route('/:id/notes')
    .get((req, res) => {
        const { id } = req.params;
        Note.find({ userId: id })
            .sort('-updated')
            .select('title body')
            .then(response => res.json(response))
            .catch(err => res.status(500).json({ error: err.message }));
    })

module.exports = router;