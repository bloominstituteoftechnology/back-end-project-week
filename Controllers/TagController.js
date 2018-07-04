const router = require("express").Router();
const Tags = require("../Schemas/TagSchema");

const post = (req, res) => {
    const { tag_body } = req.body;
    Tags.create({ tag_body })
        .then(tag => {
            res.status(201).json(tag);
        })
        .catch(err => {
            res.status(500).json({Error: err.message});
        });
};
// "https://lambnotes.herokuapp.com/api/tags/"
router.route("/").post(post);




module.exports = router;