const express = require("express");
const router = express.Router();

// const { login } = require('./login.js');
const Note = require('./noteModel');


router.use(bodyParser.json());
router.use(cors());

const url = process.env.MONGOLAB_URI;


mongoose.connect('', {}, err => {
    if(err) return console.log(err);
    console.log('Mango Up Bruh');
})

router.get('/', (req, res) => {
    res.status(200).json({api: 'notes'})
})

// Notes Routes



router.get('/api/notes', (req, res) => {
    Note
    .find({})
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(error => {
        res.status(500).json({ error: 'No notes!' })
    })
})

router.post('/api/notes/new', (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    newNote
    .save()
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(422).json({ err: 'Error when creating the note' });
    });
})

router.put('/api/notes/:_id', (req, res) => {
    // const { _id, title, content } = req.body;
    // const id = { _id };
    // if(!id) {
    //     return res.status(422).json({error: 'Must provide a valid ID.'});
    // }
    // Note.findById(id, (err, note) => {
    //     if(err || note === null) {
    //         res.status(422).json({error: 'Cannot find a note with that ID.'});
    //         return;
    //     }
    //     note.title = title
    //     note.content = content
    //     .save((saveErr, savedNote) => {
    //         if(err || note === null) {
    //             res.status(500);
    //             res.json({ error:'Something really bad happened.'})
    //             return;
    //         }
    //         res.json(note);
    //     });
    // });

    Note.findByIdAndUpdate(req.params._id, req.body)
    .then
});


router.delete('/api/note/:_id', (req, res) => {
    const { id } = req.params;
  noteModel
    .findById(id)
    .then(response => {
      action = { ...response[0] };
      actionModel
        .remove(id)
        .then(response => {
          res.status(200).json(action);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = router;