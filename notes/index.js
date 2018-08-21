const express = require('express');
const router = express.Router();
const db = require('../data/helpers/index');

const notes = [{
    id: 0,
    title: 'The Godfather',
    content: 'director: Francis Ford Coppola, metascore: 100',
    stars: ['Marlon Brando', 'Al Pacino', 'Robert Duvall']
  },
  {
    id: 1,
    title: 'Star Wars',
    director: 'George Lucas',
    metascore: 92,
    stars: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher']
  },
  {
    id: 2,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    director: 'Peter Jackson',
    metascore: 92,
    stars: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom']
  },
  {
    id: 3,
    title: 'Terminator 2: Judgement Day',
    director: 'James Cameron',
    metascore: 94,
    stars: ['Arnold Schwarzenegger', 'Edward Furlong', 'Linda Hamilton']
  },
  {
    id: 4,
    title: 'Dumb and Dumber',
    director: 'The Farely Brothers',
    metascore: 76,
    stars: ['Jim Carrey', 'Jeff Daniels', 'Lauren Holly']
  },
  {
    id: 5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot']
  }
];

router.get('/', async (req, res) => {
    try {
        const notes = await db.get();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json(err)
    }
}).get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await db.get(id);
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json(err);
    }
}).post('/', async (req, res) => {
    try {
        const newNote = { ...req.body };
        const note = await db.add(newNote);
        res.status(200).json(newNote);
    } catch (err) {
        res.status(500).json(err);
    }
}).put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const changes = { ...req.body };
        const note = await db.edit(id, changes);
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json(err);
    }
}).delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const droppedNote = await db.get(id);
        const note = await db.drop(id);
        res.status(200).json(droppedNote);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
