const db = require('../db');

module.exports = {
    get: function (id) {
        let query = db(`notes as n`);
        
        if (id) {
            query.where('n.id', id);
            const promises = [query, this.getTags(id)];

            return Promise.all(promises).then(function(results) {
                let [notes, tags] = results;
                let note = notes[0];
                note.tags = tags.map(t => t.tag);
      
                return note;
            });
        }

        return query;
    },
    getTags: function (id) {
        return db('tags as t')
            .join('noteTags as nt', 't.id', 'nt.tagId')
            .select('t.tag')
            .where('nt.noteId', id);
    },
    getNoteTags: function (id) {
        return db('noteTags as nt')
            .join('tags as t', 'nt.tagId', 't.id')
            .select()
            .where('nt.noteId', id);
    },
    add: function (record) {
        let note = {
            title: record.title,
            content: record.content
        };

        return db('notes as n').insert(note).then(([id]) => {
            if(record.tags.length > 0) {
                record.tags.forEach(tag => {
                    this.addTags(id, tag);
                });
            }
            return this.get(id);
        });
    },
    addTags: function (noteId, tag) {
        return db('tags as t').insert({tag}).then(([id]) => this.addNoteTags(noteId, id));
    },
    addNoteTags: function (noteId, tagId) {
        return db('noteTags as nt').insert({noteId, tagId}).then(([id]) => this.getNoteTags(id));
    },
    edit: function (id, note) {
        // if(note.tags.length > 0) {
        //     note.tags = note.tags.join(', ');
        // }
        let noteChanges = {
            title: note.title,
            content: note.content
        };

        return db('notes as n')
            .where('n.id', id)
            .update(noteChanges)
            .then(count => (count > 0 ? this.get(id) : null));
    },
    editTags: function () {

    },
    editNoteTags: function () {

    },
    drop: function (id) {
        return db('notes as n').where('n.id', id).del();
    },
    getCount: function () {
        return db('notes').count('id as count').then(([count]) => count.count);
    }
};
