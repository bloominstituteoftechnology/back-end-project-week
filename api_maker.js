

//== CRUD API ==================================================================

//-- Dependencies --------------------------------
const express = require('express');
const dataAccess = require('./data_access.js');

//-- Export API Maker function -------------------
module.exports = function (tableName) {
    let newAPI = new CrudAPI(tableName);
    let router = express.Router();
    router.get   ('/'   , newAPI.getAll );
    router.get   ('/:id', newAPI.getById);
    router.post  ('/'   , newAPI.create );
    router.delete('/:id', newAPI.remove );
    router.post  ('/:id', newAPI.update );
    router.use(newAPI.errorHandler);
    return router;
}


//== CRUD Route Handlers =======================================================

class CrudAPI {
    constructor(tableName) {
        this.table = tableName;
        this.data = dataAccess(tableName);
        this.errorHandler = this.errorHandler.bind(this);
        this.getAll  = this.getAll .bind(this);
        this.getById = this.getById.bind(this);
        this.create  = this.create .bind(this);
        this.remove  = this.remove .bind(this);
        this.update  = this.update .bind(this);
    }

    //-- Error Handler -------------------------------
    async errorHandler(request, response, next) {

    }

    //-- Get All -------------------------------------
    async getAll(request, response, next) {
        
    }

    //-- Get by Id -----------------------------------
    async getById(request, response, next) {

    }

    //-- Post new Entry ------------------------------
    async create(request, response, next) {

    }

    //-- Delete an Entry by Id -----------------------
    async remove(request, response, next) {

    }

    //-- Update an Entry by Id -----------------------
    async update(request, response, next) {

    }
}
