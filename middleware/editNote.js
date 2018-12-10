const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig');

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count) {
        res
          .status(200)
          .json({
            message: `Note number ${id} updated`
          });
      } else {
        res
          .status(404)
          .json({
            message: "Cannot edit a note that doesn't even exist!"
          })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: 'Server error! Could not update that note...',
          error
        })
    });
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count) {
        res
          .status(200)
          .json({ message: `Note number ${req.params.id} deleted`})
      } else {
        res
          .status(404)
          .json({
            message: `We couldn't delete note number ${req.params.id}, make sure you have the right number`
          })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: `Sorry, we had some trouble deleting note number ${req.params.id}!`,
          err
        })
    })
})

module.exports = router;