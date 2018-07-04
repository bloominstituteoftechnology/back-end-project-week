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
// "https://lambnotes.herokuapp.com/api/notes/"
router.route("/").post(post);




module.exports = router;