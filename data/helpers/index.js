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
    add: function (note) {
        // if(note.tags.length > 0) {
        //     note.tags.forEach(tag => this.addTags());
        // }

        // return db('notes as n').insert(note).then(([id]) => this.get(id));
    },
    addTags : function (tag) {

    },
    edit: function (id, note) {
        // if(note.tags.length > 0) {
        //     note.tags = note.tags.join(', ');
        // }

        return db('notes as n')
            .where('n.id', id)
            .update(note)
            .then(count => (count > 0 ? this.get(id) : null));
    },
    drop: function (id) {
        return db('notes as n').where('n.id', id).del();
    },
    getCount: function () {
        return db('notes').count('id as count').then(([count]) => count.count);
    }
};
