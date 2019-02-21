const express = require("express")
const router = express.Router();
const postDb = require('../helpers/postsHelpers');

//endpoints

//POST
router.post('/posts', (req, res) => {
    const { title, contents, tags } = req.body;
    const newPost = { title, contents };
    const postTags = tags;

    //return new post after posting
    const findPost = id =>
        postDb.findById(id)
            .then(post => {
                res.status(201)
                    .json(post)
            })

    //posting new post
    if (title && contents) {
        postDb.insert(newPost)
            .then(postId => {
                postDb.insertTags(postId[0], postTags);
                findPost(postId[0]);
            })
            .catch(err => {
                res.status(500)
                    .json({ error: "There was an error while saving the post to the database" })
            })
    }
    else {
        res.status(400)
            .json({ errorMessage: "Please provide title and contents for the post." })
    }
})

//GET all posts
router.get('/posts', (req, res) => {
    postDb.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." })
        })
})
//GET one post
router.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb.findById(id)
        .then(post => {
            if (post) {
                res.json(post);
            }
            else {
                res.status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get post" })
        })
});

//PUT
router.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, contents, tags } = req.body;
    const updatedPost = { title, contents };
    const updatedTags = tags;

    //return updated post after updating
    const findPost = id =>
        postDb.findById(id)
            .then(post => {
                res.status(201)
                    .json(post)
            })

    //delete all old tags before updating
    const deleteOldTags = id => {
        postDb.deleteTags(id)
            .then(count => {
                console.log(count);
            })
    }
    //

    //updating
    if (title && contents) {
        postDb.update(id, updatedPost)
            .then(count => {
                if (count) {
                    // deleteOldTags(id);
                    postDb.deleteTags(id)
                        .then(count => {
                            if (count) {
                                postDb.insertTags(id, updatedTags);
                                // findPost(id)
                                ;

                            }
                        });
                }
                else {
                    res.status(404)
                        .json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(500)
                    .json({ error: "The post information could not be modified." })
            })
    }
    else {
        res.status(400)
            .json({ errorMessage: "Please provide title and contents for the post." })
    }
    
    //cannot get the most updated tags
    await findPost(id);
})

//DELETE
router.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    postDb.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: "Post succesfully deleted." });
            }
            else {
                res.status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500)
                .json({ error: "The post could not be removed" })
        })
})




module.exports = router;