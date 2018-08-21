const Note = require('../models').Note
const Tag = require('../models').Tag

module.exports = {
  getNotes: (req, res, next) => {
    Note.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Tag,
          as: 'tags',
          attributes: ['value']
        }
      ]
    })
      .then(notes => {
        res.status(200).json({ notes: notes, username: req.user.username })
      })
      .catch(next)
  },

  postNote: (req, res, next) => {
    const { id } = req.user
    const { title, content, tags } = req.body
    const newNote = { title, content, userId: id }
    Note.create(newNote)
      .then(note => {
        tags.map(tag => Tag.create({ value: tag, noteId: note.id }))
        Note.findAll({
          where: { userId: id },
          include: [
            {
              model: Tag,
              as: 'tags',
              attributes: ['value']
            }
          ]
        }).then(notes => res.status(201).send(notes))
      })
      .catch(next)
  },

  deleteNote: (req, res, next) => {
    Note.findById(req.params.id)
      .then(note => {
        note.destroy()
        Note.findAll({
          where: { userId: req.user.id },
          include: [
            {
              model: Tag,
              as: 'tags',
              attributes: ['value']
            }
          ]
        }).then(notes => {
          res.status(201).json(notes)
        })
      })
      .catch(next)
  },

  updateNote: (req, res, next) => {
    const { title, content, tags } = req.body
    console.log('IN PUT /api/notes', title, content, tags)
    Note.findById(req.params.id)
      .then(note => {
        console.log('Found note to update', note)

        note
          .update({
            title: title || note.title,
            content: content || note.content
          })
          .then(updateNote => {
            console.log('updateNote', updateNote)
            Note.findAll({
              where: { userId: req.user.id },
              include: [
                {
                  model: Tag,
                  as: 'tags',
                  attributes: ['value']
                }
              ]
            }).then(notes => {
              res.status(201).json(notes)
            })
          })
      })
      .catch(next)
  }
}
