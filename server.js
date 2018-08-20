const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./database/db');
const helmet = require('helmet');
const cors = require('cors');

const port = 8000;
const server = express();

server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


server.get('/', (req, res) => {

  res.send('Authentication: <h1>Backend Project Week</h1> <h3>Sam Khaled</h3>');
});

server.get('/users', (req, res) => {
	knex('users')
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(500).json(error);
		})
});
 server.get('/users/:id', (req, res) => {
	const { id } = req.params;
 	knex('users').where({ id })
		.then(user => {
			if (user.length > 0) {
				res.status(200).json(user);
			} else {
				res.status(404).json({message: 'User does not exist'});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

server.get('/users/:id/posts', (req, res) => {
	const { id } = req.params;
 	knex('posts').where('userId', id)
		.then(posts => {
			if (posts.length > 0) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({message: 'User does not exist'});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

server.get('/posts', (req, res) => {
	knex('posts')
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

server.get('/tags', (req, res) => {
	knex('tags')
		.then(tags => {
			res.status(200).json(tags);
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

server.get('/tags/:id', (req, res) => {
	const { id } = req.params;
 	knex('tags').where({ id })
		.then(tag => {
			res.status(200).json(tag);
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

// add a [GET] /posts/:id/tags endpoint will returns all tags for the post with the specified id.
server.get('/posts/:id/tags', (req, res) => {
	const { id } = req.params;
	knex('posts_tags').where({postId: id})
		.join('tags', 'posts_tags.tagId', '=', 'tags.id')
		.select('postId', 'tag')
		.then(tags => {
			res.status(200).json(tags);
		})
		.catch(error => {
			res.status(500).json(error);
		})
})
// [GET] /posts/:id/tags endpoint that returns all tags for the post with the specified id.
server.get('/posts_tags', (req, res) => {
	knex('posts_tags')
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

// [GET] /posts/:id endpoint include the user name(not the id) and the tags associated with the post.
server.get('/posts/:id', (req, res) => {
	const { id } = req.params;
 	knex('posts_tags').where({ postId: id })
		.join('tags', 'tags.id', '=', 'posts_tags.tagId')
		.join('posts', 'posts.id', '=', 'posts_tags.postId')
		.join('users', 'users.id', '=', 'posts.userId')
		.select('name', 'tag')
			.then(data => {
				res.status(200).json(data);
			})
			.catch(error => {
				res.status(500).json(error);
			})
});

server.post('/users', (req, res) => {
	const { name } = req.body;
	if (!name) {
		res.status(404).json({ message: 'Must provide user\'s name.'});
	} else {
		knex('users')
			.insert({ name })
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
});

server.post('/posts', (req, res) => {
	const { userId, text } = req.body;
	if (!userId || !text) {
		res.status(404).json({message: 'Provide both userId and text.'});
	} else {
		knex('posts').insert(req.body)
			.then(() => {
				res.status(201).json({message: 'Successfully added a new post.'})
			})
			.catch(error => {
				res.status(500).json(error);
			});
	}
});

server.post('/tags', (req, res) => {
	const { tag } = req.body;
 	if (!tag) {
		res.status(404).json({message: 'Please provide tag.'});
	} else {
		knex('tags').insert(req.body)
			.then(() => {
				res.status(201).json({message: 'Successfully added a new tag.'});
			})
			.catch(error => {
				res.status(500).json(error);
			})
	}
});

server.put('/users/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;
 	knex('users').where({ id }).update(user)
		.then(user => {
			if (!user) {
				res.status(404).json({message: 'User does not exist'});
			} else {
				res.status(200).json({message: 'User updated successfully'});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

server.put('/posts/:id', (req, res) => {
	const { id } = req.params;
	const newPost = req.body;
	if (!id) {
		res.status(404).json({message: 'Please provide an id.'});
	} else if (!newPost) {
		res.status(404).json({message: 'Please provide updated information.'});
	} else {
		knex('posts').where({ id }).update(newPost)
			.then(() => {
				res.status(201).json({message: 'Successfully updated post.'})
			})
			.catch(error => {
				res.status(500).json(error);
			})
	}
});

server.put('/tags/:id', (req, res) => {
	const { id } = req.params;
	const updatedTag = req.body;
 	if (!updatedTag) {
		res.status(404).json({message: 'Please provide a tag.'});
	} else {
		knex('tags').where({ id }).update(updatedTag)
			.then(() => {
				res.status(201).json({message: 'Tag successfully updated'});
			})
			.catch(error => {
				res.status(500).json(error);
			})
	}
});
server.delete('/users/:id', (req, res) => {
	const { id } = req.params;
 	knex('users').where({ id }).del()
		.then(() => {
			res.status(200).json({message: 'User deleted successfully'});
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

server.delete('/posts/:id', (req, res) => {
	const { id } = req.params;
	knex('posts').where({ id }).del()
		.then(() => {
			res.status(201).json({message: 'Successfully deleted post.'});
		})
		.catch(error => {
			res.status(500).json(error);
		})
})

server.delete('/tags/:id', (req, res) => {
	const { id } = req.params;
 	knex('tags').where({ id }).del()
		.then(() => {
			res.status(201).json({message: 'Tag successfully deleted.'});
		})
		.catch(error => {
			res.status(500).json(error);
		})
});



// server.listen(port, () => console.log(`\n Server is running on http://localhost:${port} === \n`));
server.listen(port, function() {
	console.log(`\n Server is running on http://localhost:${port} === \n`);
});