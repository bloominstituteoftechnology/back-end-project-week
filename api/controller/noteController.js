const router = require('express').Router();
const Note = require('../model/Note.js');
const jwt = require('jsonwebtoken');

const protectedPath = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ err });
      }
      req.tokenId = decoded.id;
      next();
    })
  } else {
    return res.status(401).json({ message:  `Not authorized.` });
  }
}

router.all('/*', protectedPath);

router.route('/')
    .post((req, res) => {
        const { tokenId } = req;
        let { userId } = req.body;
        if (tokenId === userId) {
            const newNote = ({ title, body, userId } = req.body);
            Note.create(newNote)
                .then(response => res.status(201).json(response))
                .catch(err => res.status(500).json({ error: err.message }));
        } else {
            return res.status(401).json({ message: `Not authorized.` });
        }
    });

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        const { tokenId } = req;
        Note.findById(id)
            .then(response => {
                if (response === null) return res.status(404).json({ message: `Note does not exist.`});
                const userId = response.userId.toString();
                if (userId === tokenId) {
                    res.json(response);
                } else {
                    return res.status(401).json({ message: `Not authorized.` });
                }
            })
            .catch(err => res.status(500).json({ error: err.message }));
    })
    .put((req, res) => {
        const updatedNote = ({ title, body } = req.body);
        const { id } = req.params;
        const { tokenId } = req;
        Note.findById(id)
            .then(response => {
                if (response === null) return res.status(404).json({ message: `Note does not exist.`});
                const userId = response.userId.toString();
                if (userId === tokenId) {
                    Note.findByIdAndUpdate(id, updatedNote)
                        .then(() => res.status(202).json({ message: `Updated!` }))
                        .catch(err => res.status(500).json({ error: err.message }));
                } else {
                    return res.status(401).json({ message: `Not authorized.` });
                }
            })
            .catch(err => res.status(500).json({ error: err.message }));
    })
    .delete((req, res) => {
        const { id } = req.params;
        const { tokenId } = req;
        Note.findById(id)
            .then(response => {
                if (response === null) return res.status(404).json({ message: `Note does not exist.`});
                const userId = response.userId.toString();
                if (userId === tokenId) {
                    Note.findByIdAndDelete(id)
                        .then(response => res.json(response))
                        .catch(err => res.status(500).json({ error: err.message }));
                } else {
                    return res.status(401).json({ message: `Not authorized.` });
                }
            })
            .catch(err => res.status(500).json({ error: err.message }));
    });

module.exports = router;