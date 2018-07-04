const router = require("express").Router();
const Users = require("../Schemas/NoteSchema");

const post = (req, res) => {
    const { firstName, lastName, username, cohort, notesWritten } = req.body;
    Users.create({ firstName, lastName, username, cohort, notesWritten })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        });
};
// "https://lambnotes.herokuapp.com/api/users/"
router.route("/").post(post);




module.exports = router;