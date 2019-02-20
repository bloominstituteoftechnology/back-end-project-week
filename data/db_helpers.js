const knex = require('knex');
const db_config = require('../knexfile');
const db = knex(db_config.development);


module.exports = {

    // getNotesTags: () => {
    //     return db('notes as n')
    //     .select('n.id', 'n.title', 'n.textBody', 't.tag')
    //     .innerJoin('notes_tags as nt', 'n.id', 'nt.notes_id')
    //     .innerJoin('tags as t', 't.id', 'nt.tags_id')
    // },

    getNotes: () => {
        return db('notes')
    },


    getNotesById: (id) => {
        return db('notes').where('id', id)
        .first();
    },


    insertNote: async function (note) {
        console.log('note --->', note)
        return db('notes').insert(note)
    },
    

    // insertTag: function (tag) {
    //     console.log("typeof for tags", typeof tag)
    //     return db('tags').insert(tag)
    //     //return db('tags').insert({tags: JSON.stringify(tags)})
    // },

    // insertNoteTag: function (note, tag) {
    //     console.log('note here', note)
    //     console.log('tags here', tag)
    //     const promises = [this.insertNote(note), this.insertTag(tag)]  //this.insertTag(tags)

    //     return Promise.all(promises).then(async (results) => {
    //         let [notes_id, tags_id] = results
    //         console.log('noteId', notes_id)
    //         console.log('tagId', tags_id)
    //         await db('notes_tags').insert({ tags_id: tags_id[0], notes_id: notes_id[0] })
    
    //         console.log('tags_id-->', tags_id[0])
    //         return this.getNotesById(notes_id[0])
    //     })
    // },

    

    //see Kyle's notes 
}
