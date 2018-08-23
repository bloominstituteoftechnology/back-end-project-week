const Tag = require('../models').Tag

module.exports = {
  postTag: (req, res, next) => {
    const { value, noteId } = req.body
    const newTag = { value, noteId }
    Tag.create(newTag)
      .then(savedTag => {
        Tag.findAll({ where: { noteId: noteId } })
          .then(tags => {
            res.status(201).json(tags)
          })
          .catch(err => console.log(err))
      })
      .catch(next)
  }
}
