const express = require('express');
const db = require('./db/dbConfig');
const cors = require('cors');

const port = 8000;

const server = express();
server.use(express.json());
server.use(cors());

const reqCheck = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Please provide both a title and content.' })
    }
    next();
}

server.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
})

server.get('/notes', async (req, res) => {
    try {
        const notesList = await db('notes')
        return res.status(200).json(notesList);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "There is an error while retrieving Notes" });
    }
});
server.get('/notes/:id', async (req, res) => {
    const id = req.params.id;
    db('notes').where({ id }).then(n => {
        if (n[0]) {
            res.status(200).json(n)
        } else {
            res.status(404).json({ message: 'The note with specified ID does not exist' })
        }
    })
        .catch(err => res.status(500).json(err))
});

server.delete('/notes/:id', async (req, res) => {
    const { id } = req.params
    db('notes').where({ id }).del().then(p => {
        // const id = p[0]
        if (!p) {
            res.status(404).json({ error: `Note with this id does not exist` })
        }
        res.status(200).json({ message: 'The note has been deleted' });
    })
        .catch(error => {
            return res.status(500).json({ message: "Cannot delete the note" });
        })
})
//     try {
//         const noteId = await db.remove(req.params.id);
//         if (!noteId) {
//             return res.status(404).json({ error: `Note with this id does not exist` })
//         }
//         return res.status(200).json(noteId);
//     } catch (error) {
//         return res.status(500).json({ message: "Cannot delete the note" });
//     }
// });

server.post('/notes', reqCheck, async (req, res) => {
    try {
        const newNote = await db('notes').insert(req.body);
        res.status(201).json(newNote)

    } catch (err) {
        return res.status(500).json({ error: 'There was an error while saving the note to the database.' })
    }
})
server.put('/notes/:id', reqCheck, async (req, res) => {
    const { id } = req.params;
    const titleContent = req.body;

    db('notes')
        .where({ id })
        .update(titleContent)
        .then(p => {
            if (p) {
                res.status(200).json({ message: 'The note updated.' })
            } else {
                res.status(404).json({ error: 'The note with specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
})

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${port}`);
});
