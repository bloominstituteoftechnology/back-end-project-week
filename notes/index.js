const express = require('express');
const router = express.Router();
const db = require('../data/helpers/index');

// const notes = [{
//         id: 1,
//         title: 'The Godfather',
//         created_at: '2018-08-21 17:07:12'
//     },
//     {
//         id: 2,
//         title: 'Star Wars',
//         content: 'director: George Lucas, metascore: 92',
//         created_at: '2018-08-21 17:07:12'
//     },
//     {
//         id: 3,
//         title: 'The Lord of the Rings: The Fellowship of the Ring',
//         content: 'director: Peter Jackson, metascore: 92',
//         created_at: '2018-08-21 17:07:12'
//     },
//     {
//         id: 4,
//         title: 'Terminator 2: Judgement Day',
//         content: 'director: James Cameron, metascore: 94',
//         created_at: '2018-08-21 17:07:12'
//     },
//     {
//         id: 5,
//         title: 'Dumb and Dumber',
//         content: 'director: The Farely Brothers, metascore: 76',
//         created_at: '2018-08-21 17:07:12'
//     },
//     {
//         id: 6,
//         title: 'Tombstone',
//         content: 'director: George P. Cosmatos, metascore: 89',
//         created_at: '2018-08-21 17:07:12'
//     }
// ];

// const tags = [
//     {tag: 'Marlon Brando'}, // 1
//     {tag: 'Al Pacino'}, // 2
//     {tag: 'Robert Duvall'}, // 3
//     {tag: 'Mark Hamill'}, // 4
//     {tag: 'Harrison Ford'}, // 5
//     {tag: 'Carrie Fisher'}, // 6
//     {tag: 'Elijah Wood'}, // 7
//     {tag: 'Ian McKellen'}, // 8
//     {tag: 'Orlando Bloom'}, // 9
//     {tag: 'Arnold Schwarzenegger'}, // 10
//     {tag: 'Edward Furlong'}, // 11
//     {tag: 'Linda Hamilton'}, // 12
//     {tag: 'Jim Carrey'}, // 13
//     {tag: 'Jeff Daniels'}, // 14
//     {tag: 'Lauren Holly'}, // 15
//     {tag: 'Kurt Russell'}, // 16
//     {tag: 'Bill Paxton'}, // 17
//     {tag: 'Sam Elliot'} // 18
// ];

// const noteTags = [
//     {noteId: 1, tagId: 1},
//     {noteId: 1, tagId: 2},
//     {noteId: 1, tagId: 3},
//     {noteId: 2, tagId: 4},
//     {noteId: 2, tagId: 5},
//     {noteId: 2, tagId: 6},
//     {noteId: 3, tagId: 7},
//     {noteId: 3, tagId: 8},
//     {noteId: 3, tagId: 9},
//     {noteId: 4, tagId: 10},
//     {noteId: 4, tagId: 11},
//     {noteId: 4, tagId: 12},
//     {noteId: 5, tagId: 13},
//     {noteId: 5, tagId: 14},
//     {noteId: 5, tagId: 15},
//     {noteId: 6, tagId: 16},
//     {noteId: 6, tagId: 17},
//     {noteId: 6, tagId: 18}
// ];

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
