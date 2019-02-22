var loremIpsum = require('lorem-ipsum')

exports.seed = function (knex, Promise) {
  return knex('notes').truncate()
    .then(() => knex('tags').truncate())
    .then(() => knex('noteTags').truncate())
    .then(async () => {
      console.log('Seeding, please wait...');

      for (let i = 0; i < 499; i++) {
        const
          [noteId] = await knex('notes').insert({ title: `Test Note ${i + 1}`, textBody: loremIpsum() }),
          [tagId] = await knex('tags').insert({ title: `tag${i + 1}` })

        await knex('noteTags').insert({ note_id: noteId, tag_id: tagId })

        if (i >= 498) console.log('Seeding complete')
      }
    })
}