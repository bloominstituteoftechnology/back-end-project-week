const db = require('../dbConfig.js')
// const mappers = require('./mappers');

module.exports = {
  get: function (id, opts) {
    console.log(opts);
    let query = db('notes as n')
      .select('n.id', 'n.textBody', 'n.title', db.raw('GROUP_CONCAT(t.title) as tags'))
      .innerJoin('noteTags as nt', 'n.id', 'nt.note_id')
      .innerJoin('tags as t', 't.id', 'nt.tag_id')
      .groupBy('n.id')

    if (id) {
      return query
          .where('n.id', id)
          .first()
          .then(note => {
            if (note) {
              return {...note, tags: note.tags.split(',')}
            } else {
              return []
            }
          })
    }

    return query
        .offset(opts.page * opts.pageSize)
        .limit(opts.pageSize)
        .then(notes => {
          return notes.map(n => ({ ...n, tags: n.tags.split(',') }))
        })
  },
  getTags: function (noteId) {
    return db('tags')
      .where('note_id', noteId)
      .then(tags => tags.map(t => t.title))
  },
  insertNote: async function (note) {
    return db('notes').insert(note).then(note => note[0])
  },
  insertTag: async function (tags) {
    let tagIds = []

    for (let tag of tags) {
      const tagId = await db('tags as t')
        .select()
        .where('t.title', tag)
        .first()
        .then(existingTag => {
          if (!existingTag) {
            return db('tags').insert({ title: tag })
          } else {
            return [existingTag.id]
          }
        })

      tagIds.push(tagId[0])
    }

    return tagIds
  },
  insertNoteTag: function (note, tags) {
    const promises = [this.insertNote(note), this.insertTag(tags)]

    return Promise.all(promises).then(async (results) => {
      let [note_id, tagIds] = results

      for (let tag_id of tagIds) {
        await db('noteTags').insert({ tag_id, note_id })
      }

      return this.get(note_id)
    })
  },
  update: async function (id, changes) {
    if (changes.tags) {
      for (let tag in tags) {
        await this.removeTags(id)
        await this.insertTag({ title: tag, note_id: id })
      }
    }

    return db('notes')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null))
  },
  removeTags: function (id) {
    return db('tags')
      .where('note_id', id)
      .del()
  },
  remove: async function (id) {
    await this.removeTags(id)

    return db('notes')
      .where('id', id)
      .del()
  }
}
