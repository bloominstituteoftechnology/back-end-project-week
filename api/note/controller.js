const Note = require('./model')
const User = require('../user/model')

/* ——— TO DO
 * Validation
 * GET single note
 * PUT note
 * DEL note
 * User refs
 * ——— */

module.exports = {
  post: async (req, res) => {
    const { body: { content, title }, user: { _id: author } } = req
    const user = await User.findById(author)
    // Validation
    console.log('👉 validate', user)
    const newNote = new Note({ author, content, title })
    const note = await newNote.save()
    await user.notes.push(note)
    await user.save()
    console.log('👉 after save', user)
    res.status(201).json(note)
  },

  get: async (req, res) => {
    const { _id } = req.params
    const query = await Note.find(null).select('-__v -created')
    res.json(query)
  },
}