const router = require("express").Router();
const Auths = require("../Schemas/AuthenticationSchema");

const post = (req, res) => {
    const { username, password } = req.body;
    Auths.create({ username, password })
        .then(auth => {
            res.status(201).json(auth);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        });
};
// "https://lambnotes.herokuapp.com/api/auth/"
router.route("/").post(post);




module.exports = router;