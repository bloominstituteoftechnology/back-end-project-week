const db = require('../dbConfig');

module.exports = {
    
// ### Getting all the notes
    getNotes: () => {
        const query = db('notes');
        return query.then(notes => {
            return notes.map(note => {
                return {
                    ...note
                }
            })
        })
    },

    // ### retrieve a note by its id
    getNote: (id) => {
        const note = db('notes').where('id', id);

        return note.then(response => {
                const [notes] = response;

                if (notes.length === 0) {
                    return 0;
                } else {
                    return {
                        ...notes[0]
                    }
                }
        });
    },

    // ### Posting a new note
    addNote: (note) => {
        return db('notes')
            .insert(note)
    },

    // ### Updating note
    updateNote: (id, updatedNote) => {
        return db('notes')
                .where('id', id)
                .update(updatedNote)
    },

    // Deleting note
    deleteNote: (id) => {
        return db('notes')
                .where('id', id)
                .delete()
    },
}