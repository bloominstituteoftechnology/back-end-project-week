const db = require('../dbConfig.js');
//const mappers = require('./mappers');

module.exports = {


    get: function () {
        return db('lists')
    },

    get: function (id) {
        let query = db('lists');

        if (id) {
            query.where('lists.id', id).first();
            return query;
            // const promises = [query, this.getProjectActions(id)]; // [ projects, actions ]

            /*  return Promise.all(promises).then(function(results) {
               let [project, actions] = results;
               project.actions = actions;
       
               return mappers.projectToBody(project);
             }); */

        }
        return db('lists')
        /* return query.then(projects => {
          return projects.map(project => mappers.projectToBody(project));
        }); */
    },

    /*  getProjectActions: function(projectId) {
       return db('actions')
         .where('project_id', projectId)
         .then(actions => actions.map(action => mappers.actionToBody(action)));
     }, */

    insert: function (list) {
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
