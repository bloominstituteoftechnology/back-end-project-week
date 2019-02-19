const express = require("express")
const router = express.Router();
const db = require('../helpers/tagsHelpers');

//endpoints

//POST
router.post('/tags', (req, res) => {
    const { tag } = req.body;
    const newTag = { tag, postId };
    //return new tag after posting
    const findTag = idInfo =>
        db.findById(idInfo.id)
            .then(post => {
                res.status(201)
                    .json(post)
            })
    //posting new tag
    if (tag) {
        db.insert(newTag)
            .then(idInfo => {
                findTag(idInfo)
            })
            .catch(err => {
                res.status(500)
                    .json({ error: "There was an error while saving the post to the database" })
            })
    }
    else {
        res.status(400)
            .json({ errorMessage: "Please provide tag." })
    }
})

//GET all tags
router.get('/tags', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The tags information could not be retrieved." })
        })
})
//GET one tag
router.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post.length > 0) {
                res.json(post);
            }
            else {
                res.status(404)
                    .json({ message: "The tag with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get tag" })
        })
});

//DELETE
router.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: "Tag succesfully deleted." });
            }
            else {
                res.status(404)
                    .json({ message: "The tag with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ error: "The tag could not be removed" })
        })
})




module.exports = router;