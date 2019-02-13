const express = require('express')
// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const server = express();
const PORT = 4000;

//parsing JSON
server.use(express.json());

//allow access control
const cors = require('cors')
server.use(cors());

//endpoints

//POST
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
    //return new post after posting
    const findPost = idInfo =>
        db.findById(idInfo.id)
            .then(post => {
                res.status(201)
                    .json(post)
            })
    //posting new post
    if (title && contents) {
        db.insert(newPost)
            .then(idInfo => {
                findPost(idInfo)
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
server.get('/api/posts', (req, res) => {
    db.find()
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
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(post => {
            if (post.length > 0) {
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
server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const updatedPost = { title, contents }
    //return updated post after updating
    const findPost = id =>
        db.findById(id)
            .then(post => {
                res.status(200)
                    .json(post)
            })
    //updating
    if (title && contents) {
        db.update(id, updatedPost)
            .then(count => {
                if (count) { findPost(id) }
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
})

//DELETE
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            if (count) {
                res.json({ message: "Post succesfully deleted."});
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

//listening
server.listen(PORT, () => {
    console.log(`server is now up and running on ${PORT}`)
})