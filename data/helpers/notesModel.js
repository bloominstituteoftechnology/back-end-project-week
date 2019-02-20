const db = require('../dbConfig.js');

module.exports = {


    get: async function () {
        return db('notes')
    },

    get: async function (id) {
        let query =  db('notes');
        if (id) {
            query.where('notes.id', id).first();
            return query;
        }
        return db('notes')
    },

   
   
    insert: function (note) {
        return db('notes')
            .insert(note)
            .then(([id]) => this.get(id));
    },

    update: function (id, changes) {
        return db('notes')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: function (id) {
        return db('notes')
            .where('id', id)
            .del();
    }

};
   /*  async function get(list) {
        let notesPromise = undefined;
        const listsPromise = new Promise((resolve, reject) => {   
            const query = db('lists') 
            console.log("query", query); 
            resolve(query);    
            reject(query);    
        });
         
        if (lists.list) {   
            listsPromise.then(success => {    
                notesPromise = new Promise((resolve, reject) => {     
                    const listsId = success[0];    
                    console.log("listsId", listsId);
                    const noteId = db('notes').get;    
                    resolve(noteId);   
                    reject(noteId);    
                });     
            })     
            return {noteId: await notePromise, listsId: await listsPromise};    
        }          
        else {    
            return await listsPromise    
        }    
     } */

