

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
        return await database(this.table).truncate();
    }

    //-- Get by ID -----------------------------------
    async get(id) {
        const entry = await database
            .select()
            .from(this.table)
            .where({[config.FIELD_ID]: id})
            .first();
        if(!entry) {
            throw new Error(config.ERROR_NOTFOUND);
        }
        return entry;
    }

    //-- Get All -------------------------------------
    async getAll() {
        return await database 
            .select()
            .from(this.table);
    }

    //-- Create and Store a new Entry ----------------
    async create(entryData) {
        // Test validity of data
        if(!entryData[config.FIELD_TITLE] || !entryData[config.FIELD_BODY]){
            throw new Error(config.ERROR_MALFORMEDDATA);
        }
        let entryId =  (await database
            .insert(entryData)
            .into(this.table)
        )[0];
        return this.get(entryId);
    }

    //-- Remove by ID --------------------------------
    async remove(id) {
        const entry = await this.get(id);
        await database
            .del()
            .from(this.table)
            .where({[config.FIELD_ID]: id});
        return entry;
    }

    //-- Update --------------------------------------
    async update(id, data) {
        const updateData = {
            [config.FIELD_TITLE]: data[config.FIELD_TITLE],
            [config.FIELD_BODY ]: data[config.FIELD_BODY ],
        }
        await database(this.table)
            .where({[config.FIELD_ID]: id})
            .update(updateData);
        return this.get(id);
    }
}
