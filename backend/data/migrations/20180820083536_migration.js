exports.up = function (knex, Promise) {
    return createUsersTable(knex)
        .then(createNotesTable)
        .then(createTagsTable)
        .then(createTagsToNotesTable)
        .catch(error => {
            console.log("error while creating table", error)
            reject(error)
        })
};

exports.down = function (knex, Promise) {
    console.log(" tables dropping ")
    return knex.schema
        .dropTableIfExists('tagsToNote')
        .then(() => (knex.schema.dropTableIfExists('tags')))
        .then(() => (knex.schema.dropTableIfExists('notes')))
        .then(() => (knex.schema.dropTableIfExists('users')))
        .catch(error => {
            console.log("error while dropping table", error)
            reject(error)
        })
};

function createUsersTable(knex) {
    console.log('creating users table');

    return new Promise(function (resolve, reject) {
        knex.schema
            .createTable('users', tbl => {
                tbl.increments()
                tbl
                    .string('name')
                    .notNullable()
                tbl
                    .string('username')
                    .notNullable()
                    .unique()
                tbl
                    .string('password')
                    .notNullable()

                console.log('users table has been created');
                resolve(knex)
            })
            .catch(error => reject(error));
    })
}

function createNotesTable(knex) {
    console.log('creating notes table');

    return new Promise(function (resolve, reject) {
        knex.schema
            .createTable('notes', tbl => {
                tbl.increments()
                tbl
                    .string('text')
                    .notNullable()
                tbl
                    .integer('user_id')
                    .references('id')
                    .inTable('users')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')

                console.log('notes table has been created');
                resolve(knex)
            })
            .catch(error => reject(error));
    })
}

function createTagsTable(knex) {
    console.log('creating tags table');

    return new Promise(function (resolve, reject) {
        knex.schema
            .createTable('tags', tbl => {
                tbl.increments()
                tbl
                    .string('text')
                    .notNullable()

                console.log('tags table has been created');
                resolve(knex)
            })
            .catch(error => reject(error));
    })
}

function createTagsToNotesTable(knex) {
    console.log('creating TagsToNote table');

    return new Promise(function (resolve, reject) {
        knex.schema
            .createTable('tagsToNote', tbl => {
                tbl.increments()
                tbl
                    .integer('note_id')
                    .references('id')
                    .inTable('notes')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
                tbl
                    .integer('tag_id')
                    .references('id')
                    .inTable('tags')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')

                console.log('TagsToNote table has been created');
                resolve(knex)
            })
            .catch(error => reject(error));
    })
}