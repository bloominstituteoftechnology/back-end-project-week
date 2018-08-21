const express = require('express');
const db = require('../data/db');

const router = express();
router.use(express.json());

router.get('/', (req, res) => {
  db('notes')
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id })
    .first()
    .then(note => {
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', async (req, res) => {
  const note = req.body;

  if (!req.body.title || !req.body.body) {
    return res
      .status(422)
      .json({ error: 'All notes must have a title and body' });
  }

  try {
    const ids = await db('notes').insert(note);
    const notes = await db('notes');
    res.status(201).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  const note = req.body;
  const { id } = req.params;

  if (!note.title || !note.body) {
    return res
      .status(406)
      .json({ error: 'All notes must have a title and a body' });
  }

  db('notes')
    .where({ id })
    .update()
    .then(count => {
      if (count > 0) {
        return res.status(200).json({ success: true });
      } else
        return res
          .status(500)
          .json({ error: 'Something went wrong updating the note' });
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        return res.status(200).json({ success: true });
      } else return res.status(404).json({ error: 'Item not found' });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
