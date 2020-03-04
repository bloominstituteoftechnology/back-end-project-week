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

    // check for title not string
    if (typeof note.title !== 'string') {
        const e = new TypeError("'title' value must be string");
        throw e;
    }

    // check for content not string
    if (typeof note.content !== 'string') {
        const e = new TypeError("'content' value must be string");
        throw e;
    }

    const ids = await db('notes').insert(note, 'id');
    const n = await get(ids[0]);
    return n;
};

const update = async (id, note) => {

    // check for missing id
    if (typeof id === 'undefined') {
        const e = new Error("note id");
        e.name = "MissingParam";
        throw e;
    }

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

    // check for empty note object
    if (!note.hasOwnProperty('title') && !note.hasOwnProperty('content')) {
        const e = new Error("note object missing 'title' and 'content'");
        e.name = "EmptyObject";
        throw e;
    }

    // check for title not string
    if (note.hasOwnProperty('title') && typeof note.title !== 'string') {
        const e = new TypeError("'title' value must be string");
        throw e;
    }

    // check for content not string
    if (note.hasOwnProperty('content') && typeof note.content !== 'string') {
        const e = new TypeError("'content' value must be string");
        throw e;
    }

    const count = await db('notes').where('id', id).update(note);
    if (count) {
        const n = await get(id);
        return n;
    } else {
        const e = new Error("id does not exist");
        e.name = "InvalidID";
        throw e;
    }
};

const remove = async (id) => {

    // check for missing id
    if (typeof id === 'undefined') {
        const e = new Error("note id");
        e.name = "MissingParam";
        throw e;
    }

    const count = await db('notes').where('id', id).del();
    if (count) {
        return count;
    } else {
        const e = new Error("id does not exist");
        e.name = "InvalidID";
        throw e;
    }
};

module.exports = {
    insert, get, update, remove
}