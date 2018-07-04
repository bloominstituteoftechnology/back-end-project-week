const router = require("express").Router();
const Notes = require("../Schemas/NoteSchema");

const post = (req, res) => {
    const { title, body, tag, author } = req.body;
    Notes.save({ title, body, tag, author })
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        });
};

router.route("/").post(post);




module.exports = router;