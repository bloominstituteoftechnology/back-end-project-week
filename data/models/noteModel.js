const db = require('../dbConfig.js');

const get = async (id) => {
    if (id) {
        const note = await db('notes').where('id', id);
        if (note.length) {
            return note[0];
        } else {
            const e = new Error("id does not exist");
            e.name = "InvalidID";
            throw e;
        }
    }
    
    const notes = await db('notes');
    return notes;
};

const insert = async (note) => {

    // check for missing note object
    if (typeof note === 'undefined') {
        const e = new Error("note object");
        e.name = "MissingParam";
        throw e;
    }
    // check if note is object
    if (typeof note !== 'object') {
        const e = new TypeError("note is not an object");
        throw e;
    }

    // check for missing title key
    if (!note.hasOwnProperty('title')) {
        const e = new Error("title");
        e.name = "MissingKey";
        throw e;
    }

    // check for missing content key
    if (!note.hasOwnProperty('content')) {
        const e = new Error("content");
        e.name = "MissingKey";
        throw e;
    }

    // check for missing title key
    if (typeof note.title !== 'string') {
        const e = new TypeError("'title' value must be string");
        throw e;
    }

    // check for missing content key
    if (typeof note.content !== 'string') {
        const e = new TypeError("'content' value must be string");
        throw e;
    }

    const ids = await db('notes').insert(note);
    const n = await get(ids[0]);
    return n;
};

const update = (id, changes) => {

};

const remove = (id) => {

};

module.exports = {
    insert, get, update, remove
}