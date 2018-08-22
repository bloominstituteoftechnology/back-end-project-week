const db = require('../db');
const tagDb = require('../helpers/tagDb');

module.exports = {
    get: function (id) {
        let query = db(`notes as n`);
        
        if (id) {
            query.where('n.id', id);

            // const promises = [query, this.getTags(id)];

            // return Promise.all(promises).then(function (results) {
            //     let [notes, tags] = results;
            //     let note = notes[0];
            //     note.tags = tags.map(t => t.tag);

            //     return note;
            // });
        }


        return query;
    },
    // getTags: function (id) {
    //     return db('tags as t')
    //         .join('note_tags as nt', 't.id', 'nt.tagId')
    //         .select('t.tag')
    //         .where('nt.noteId', id);
    // },
    add: function (record) {
        if(record.tags.length > 0) {
            record.tags = record.tags.join(', ');
            // console.log(record);
        }

        return db('notes as n').insert(record).then(([id]) => this.get(id));
    },
    edit: function (id, noteBody, tagBody) {
        return db('notes as n')
            .where('n.id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },
    drop: function (id) {
        return db('notes as n').where('n.id', id).del();
    }
};
