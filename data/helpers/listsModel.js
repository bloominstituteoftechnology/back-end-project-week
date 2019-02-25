const db = require('../dbConfig.js');

module.exports = {


    get: function () {
        return db('lists')
    },

    get: function (id) {
        let query = db('lists');
        if (id) {
            query.where('lists.id', id).first();
            return query;
        }
        return db('lists')
    },

    insert: async function (list) {
        return db('lists')
            .insert(list)
            .then(([id]) => this.get(id));
    },

    update: function (id, changes) {
        return db('lists')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: function (id) {
        return db('lists')
            .where('id', id)
            .del();
    },
};

/************************************************************ */

// get list with the listId
// Promise
/*  get: async function (id) {
    let notesPromise = undefined;
    const listsPromise = new Promise((resolve, reject) => {   
        let query = db('lists') ;
        console.log("made it here")
       // alert("made it here first");
        if (id) {
            query.where('lists.id', id).first();
           // return query; 
        resolve(query);    
       
        reject(query); 
        } else {
            return db('lists')

        }   
    }); 
   // alert("made it here");
    console.log("made it here2")
// so i got the list
    if (lists.list) {   
        console.log("made it here3")
        listsPromise.then(success => {    
            notesPromise = new Promise((resolve, reject) => {     
                console.log("success[0]", success[0]);
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
 },  */

      //********************************************* */
   /*    getListNotes: function(listId) {
        return db('notes')
          .where('project_id', projectId)
          .then(actions => actions.map(action => mappers.actionToBody(action)));
      }, */