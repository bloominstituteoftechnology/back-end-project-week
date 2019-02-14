const db = require('../dbConfig.js');
// const mappers = require('./mappers');

module.exports = {
    get: function (id) {
        let query = db('notes as n');

        if (id) {
            query.where('n.id', id).first();

            const promises = [query, this.getTags(id)];

            return Promise.all(promises).then(function (results) {
                let [note, tags] = results;
                note.tags = tags;

                return note;
            });
        }

        return query.then(notes => {
            return notes;
        });
    },
    getTags: function (noteId) {
        return db('tags')
            .where('note_id', noteId)
            .then(tags => tags.map(t => t.title));
    },
    insert: async function (note) {
        await this.insertTag(note.tags);

        delete note.tags;

        return db('notes')
            .insert(note)
            .then(([id]) => this.get(id));
    },
    insertTag: function (noteId, tags) {
        return db('tags')
            .insert(tags.map(t => ({ title: t, note_id: noteId })))
            .then(([id]) => this.get(id));
    },
    update: async function (id, changes) {
        if (changes.tags) {
            for (let tag in tags) {
                await this.removeTags(id);
                await this.insertTag({ title: tag, note_id: id });
            }
        }

        return db('notes')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },
    removeTags: function (id) {
        return db('tags')
            .where('note_id', id)
            .del();
    },
    remove: async function (id) {
        await this.removeTags(id);

        return db('notes')
            .where('id', id)
            .del();
    }
};
