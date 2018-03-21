const express = require("express");
const db = require("./postController.js");

const postRouter = express.Router();

postRouter.get("/", (req, res) => {
	db
		.getAll()
		.then(posts => {
			res.status(200).send(posts);
		})
		.catch(err => {
			res.status(500).send({ msg: "Error retrieving posts." });
		});
});

postRouter.post("/", (req, res) => {
	const newPost = req.body;

	if (!req.body.text || !req.body.user_id) {
		res.status(400).send({ msg: "Please include both Post text and User ID." });
	} else {
		db
			.addPost(newPost)
			.then(post => {
				res.status(200).send(post);
			})
			.catch(err => {
				console.log(err);
				// res.status(500).send({ msg: "Error posting new post." });
			});
	}
});

postRouter.get("/:id", (req, res) => {
	const { id } = req.params;

	db
		.getById(id)
		.then(post => {
			if (post.length > 0) {
				res.status(200).send(post);
			} else {
				res.status(404).send({ msg: `Post with ID: ${id} not found.` });
			}
		})
		.catch(err => {
			res.status(500).send({ msg: "Error retrieving post." });
    });
});

postRouter.put("/:id", (req, res) => {
	const { id } = req.params;
	const updatedPost = req.body;

	if (!updatedPost.text) {
		res.status(400).send({ msg: "Please include Post text to be updated." });
	} else {
		db
			.updatePost(id, updatedPost)
			.then(count => {
				if (count === 0) {
					res.status(404).send({ msg: `Post ID: ${id} does not exist.` });
				} else {
					res.status(200).send({ msg: "Post successfully updated." });
				}
			})
			.catch(err => {
				res.status(500).send({ msg: "Error updating post." });
			});
	}
});

postRouter.delete("/:id", (req, res) => {
	const { id } = req.params;

	db
		.nuke(id)
		.then(count => {
			if (count === 0) {
				res.status(404).send({ msg: `Post ID: ${id} does not exist.` });
			} else {
				res.status(200).send({ msg: "Post successfully nuked." });
			}
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

postRouter.get('/:id/tags', (req, res) => {
  const { id } = req.params;

  db
    .getTagsByPost(id)
    .then(tags => {
      if (tags.length > 0) {
        res.status(200).send(tags)
      } else {
        res.status(404).send({ msg: `No tags available for post ${id}.` });
      }
    }).catch(err => {
      res.status(500).send({ msg: 'Error retrieving tags for the specified post.' });
    })
});

module.exports = postRouter;
