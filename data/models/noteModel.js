const db = require('../dbConfig.js');

const get = (id) => {
    if (id) {
    return db('notes').where('id', id)
        .then(([note]) => {
            return note;
        })
    }
    // let query = db('notes as n');

    // if (id) {
    //     query = query.where('n.id', id).first();
    // }

    // return query;

    //   return db('notes').where('id', id)
    //   .then(([note]) => {
    //       if (note) return note;
    //       else throw new Error('Invalid: id does not exist');
    //   })

};

const insert = (note) => {

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

    db('notes').insert(note)
        .then(([id]) => {
            return get(id);
        });
};

const update = (id, changes) => {

};

const remove = (id) => {

};

module.exports = {
    insert, get, update, remove
}