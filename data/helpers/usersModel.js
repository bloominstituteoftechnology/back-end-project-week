const db = require('../dbConfig.js');
//const mappers = require('./mappers');

module.exports = {


    get: function () {
        return db('users')
    },

    get: function (id) {
        let query = db('users');

        if (id) {
            query.where('users.id', id).first();
            return query;
            // const promises = [query, this.getProjectActions(id)]; // [ projects, actions ]

            /*  return Promise.all(promises).then(function(results) {
               let [project, actions] = results;
               project.actions = actions;
       
               return mappers.projectToBody(project);
             }); */

        }
        return db('users')
        /* return query.then(projects => {
          return projects.map(project => mappers.projectToBody(project));
        }); */
    },

    /*  getProjectActions: function(projectId) {
       return db('actions')
         .where('project_id', projectId)
         .then(actions => actions.map(action => mappers.actionToBody(action)));
     }, */

    insert: function (user) {
        return db('users')
            .insert(user)
            .then(([id]) => this.get(id));
    },

    update: function (id, changes) {
        return db('users')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: function (id) {
        return db('users')
            .where('id', id)
            .del();
    },
};
