const express = require('express');
const router = express.Router();
const db = require('../server/helpers/postHelpers');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.getPostByID(id)
    .then(post => {
      res.json({ data: post })
    }).catch(err => res.json({ message: err }))
});

router.get('/notes/:username', (req, res) => {
  const { username } = req.params;
  console.log(username);
  db.getPostsByUserName(username)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => res.json({ message: err }))
});


router.post('/newpost', (req, res) => {
  const post = req.body;
  db.insertPost(post)
    .then(id => res.json({ message: `Your post was created with an ID of ${id}` }))
    .catch(err => res.send(err));
});

router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  db.updatePost(id, post)
    .then(id => res.json({ message: 'your post update was successful' }))
    .catch(err => res.send(err))
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.deletePost(id)
    .then(count => {
      res.json({ message: `${count} number of records deleted` })
    })
    .catch(err => res.send('Could not delete this post'))
});

module.exports = router;