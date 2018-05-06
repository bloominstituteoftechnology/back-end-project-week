const Note = require('./model')

/* ——— TO DO
 * Validation
 * GET single note
 * PUT note
 * DEL note
 * User refss
 * ——— */

module.exports = {
  post: async (req, res) => {
    const { content, title } = req.body
    const newNote = new Note({ content, title })
    const query = await newNote.save()
    res.status(201).json(query)
  },

  get: async (req, res) => {
    const { id } = req.params
    const query = await Note.find(null).select('-__v -created')
    res.json(query)
  },
}