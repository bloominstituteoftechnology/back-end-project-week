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
//************************************************************ */
   
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
// continue when you have the data
// parse lists.list 

// will have an array [2,3,4] which are the noteId's

// retrieve the notes 1 by 1 and save them to a new object
// Promise for each note retrieval

// continue through next loop when i have the data.

// map the new object to diplay the notes









/* get: function(id) {
        let query = db('lists as l');
    
        if (id) {
          query.where('l.id', id).first();
    
          const promises = [query, this.getListNotes(id)]; // [ projects, actions ]
    
          return Promise.all(promises).then(function(results) {
            let [list, notes] = results;
            list.notes = notes;
    
            return mappers.projectToBody(project);
          });
        }
    
        return query.then(lists => {
          return lists.map(project => mappers.projectToBody(project));
        });
      }, */
      //********************************************* */
   /*    getListNotes: function(listId) {
        return db('notes')
          .where('project_id', projectId)
          .then(actions => actions.map(action => mappers.actionToBody(action)));
      }, */
    
    //*********************************************************************** */
  /*   getAll: async function (list) {
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
        }  else {    
            return await listsPromise    
        }    
    },
     */
    
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
