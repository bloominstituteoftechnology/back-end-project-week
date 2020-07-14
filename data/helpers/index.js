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
        if(id) {
            return db('tags as t')
                .join('noteTags as nt', 't.id', 'nt.tagId')
                .select('t.tag')
                .where('nt.noteId', id);
        }

        return db('tags');
    },
    getNoteTags: function (id) {
        if(id) {
            return db('noteTags as nt')
                .join('tags as t', 'nt.tagId', 't.id')
                .select()
                .where('nt.noteId', id);
        }

        return db('noteTags');
    },
    add: function (note, tags) {
        return db('notes').insert(note).then(([id]) => {
            if(tags.tags.length > 0) {
                tags.tags.forEach(tag => this.addTags(id, tag));
            }
                
            return this.get(id)
        });
    },
    addTags: function (noteId, tag) {
        // return db('tags').where({tag}).then(([id]) => console.log(id));
        
        return db('tags as t').insert({tag}).then(([id]) => this.addNoteTags(noteId, id));
    },
    addNoteTags: function (noteId, tagId) {
        return db('noteTags as nt').insert({noteId, tagId}).then(([id]) => this.getNoteTags(id));
    },
    edit: function (id, note) {
        let noteChanges = { title: note.title, content: note.content };
        let beforeChanges = this.get(id);
        return beforeChanges;

        // return db('notes as n')
        //     .where('n.id', id)
        //     .update(noteChanges)
        //     .then(count => {
        //         if(count > 0) {
        //             this.editTags(id, note.tags);
        //         } else {
        //             return null;
        //         }
        //     });
    },
    editTags: function (noteId, tags) {
        // return db('tags as t').update({tag}).then(([id]) => this.editNoteTags(noteId, id));
    },
    editNoteTags: function (noteId, tagId) {
        // return db('noteTags as nt').update({noteId, tagId}).then(([id]) => this.getNoteTags(id));
    },
    drop: function (id) {
        return db('notes as n').where('n.id', id).del();
    },
    getCount: function () {
        return db('notes').count('id as count').then(([count]) => count.count);
    }
};
