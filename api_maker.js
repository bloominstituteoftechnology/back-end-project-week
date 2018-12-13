

//== CRUD API ==================================================================

//-- Dependencies --------------------------------
const express = require('express');
const config = require('./config.js');

//-- Export API Maker function -------------------
module.exports = function (dataAccessInstance) {
    let newAPI = new CrudAPI(dataAccessInstance);
    let router = express.Router();
    router.get   ('/'   , newAPI.getAll );
    router.get   ('/:id', newAPI.getById);
    router.post  ('/'   , newAPI.create );
    router.delete('/:id', newAPI.remove );
    router.put   ('/:id', newAPI.update );
    router.use(newAPI.errorHandler);
    return router;
}


//== CRUD Route Handlers =======================================================

class CrudAPI {
    constructor(dataAccessInstance) {
        this.data = dataAccessInstance;
        this.errorHandler = this.errorHandler.bind(this);
        this.getAll  = this.getAll .bind(this);
        this.getById = this.getById.bind(this);
        this.create  = this.create .bind(this);
        this.remove  = this.remove .bind(this);
        this.update  = this.update .bind(this);
    }

    //-- Error Handler -------------------------------
    async errorHandler(error, request, response, next) {
        switch(error.message) {
            case config.ERROR_NOTFOUND: {
                response.status(404).json({'message': error.message});
                break;
            }
            case config.ERROR_MALFORMEDDATA: {
                response.status(422).json({'message': error.message});
                break;
            }
            default: {
                response.status(500).json({'message': config.ERROR_INTERNAL});
            }
        }
        next();
    }

    //-- Get All -------------------------------------
    async getAll(request, response, next) {
        try {
            const entries = await this.data.getAll();
            response.status(200).json({'data': entries});
            next();
        } catch(error) { next(error);}
    }

    //-- Get by Id -----------------------------------
    async getById(request, response, next) {
        try {
            const entryId = request.params.id;
            const entry = await this.data.get(entryId);
            response.status(200).json(entry);
            next();
        } catch(error) { next(error);}
    }

    //-- Post new Entry ------------------------------
    async create(request, response, next) {
        try {
            const entry = await this.data.create(request.body);
            response.status(201).json(entry);
            next();
        } catch(error) { next(error);}
    }

    //-- Delete an Entry by Id -----------------------
    async remove(request, response, next) {
        try {
            const entryId = request.params.id;
            const entry = await this.data.remove(entryId);
            response.status(200).json(entry);
            next();
        } catch(error) { next(error);}
    }

    //-- Update an Entry by Id -----------------------
    async update(request, response, next) {
        try {
            const entryId = request.params.id;
            const entry = await this.data.update(entryId, request.body);
            response.status(200).json(entry);
            next();
        } catch(error) { next(error);}
    }
}
