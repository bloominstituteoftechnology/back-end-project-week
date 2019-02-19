const knex = require('knex');
const db_config = require('../knexfile');
const db = knex(db_config.development);


module.exports = {

    getNotes: () => {
        return db('notes as n')
        .select('n.id', 'n.title', 'n.textBody', 't.tags')
        .innerJoin('notes_tags as nt', 'n.id', 'nt.notes_id')
        .innerJoin('tags as t', 't.id', 'nt.tags_id')
    },

    getTags: () => {
        return db('tags')
    },

    getNotesTags: () => {
        return db('notes_tags')
    },

    getNotesById: (id) => {
        return db('notes').where('id', id)
        .first();
    },

    getTagById: (id) => {
        return db('tags').where('id', id)
        .first();
    },

    insertNote: async function (note) {
        console.log(note)
        return db('notes').insert(note)
    },
    
    insertTag: function (tags) {
        console.log(typeof tags)
        return db('tags').insert({tags})
       
    },

    insertNoteTag: function (note, tags) {
        console.log('note here', note)
        const promises = [this.insertNote(note), this.insertTag(tags)]  //this.insertTag(tags)

        return Promise.all(promises).then(async (results) => {
            let [notes_id, tagsId] = results
            console.log('noteId', notes_id)
            console.log('tagId', tagsId)
            await db('notes_tags').insert({ tags_id: tagsId[0], notes_id: notes_id[0] })
          

            return this.getNotesById(notes_id[0])
        })
    }

    //see Kyle's notes 
}
