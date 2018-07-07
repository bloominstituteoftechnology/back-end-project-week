const router = require("express").Router();
const Notes = require("../Schemas/NoteSchema");

const post = (req, res) => {
    const { title, body, tag, author } = req.body;
    Notes.create({ title, body, tag, author })
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        });
};

const get = (req, res) => {
    Notes.find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
}
// "https://lambnotes.herokuapp.com/api/notes/"
router.route("/")
    .post(post)
    .get(get);





module.exports = router;