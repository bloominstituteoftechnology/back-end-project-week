

/*== Data Access ===============================================================

    Exports a function that when invoked returns a DataAccessor object.
    Parameters:
        tableName (string) - The name of a database table

*/

//-- Dependencies --------------------------------
const config = require('./config.js');
const database = require('./database');

//-- Configure and Export Data Accessor ----------
module.exports = function (tableName) {
    return new DataAccessor(tableName);
}


//== Data Accessor =============================================================

class DataAccessor {
    constructor(tableName) {
        this.table = tableName;
    }

    //-- Clear: Remove all Notes ---------------------
    async clear() {
    }

    //-- Get by ID -----------------------------------
    async get(id) {
    }

    //-- Get All -------------------------------------
    async getAll() {
    }

    //-- Create and Store a new Entry ----------------
    async create(entryData) {
    }

    //-- Remove by ID --------------------------------
    async remove(id) {
    }
}
