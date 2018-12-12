

//== Project Constants =========================================================

const PORT = process.env.PORT || 5000;
module.exports = {
    // Server Configuration
    SERVER_PORT: PORT,
    SERVER_MESSAGE: `Server started on port ${PORT}`,
    // Database
    DATABASE_ENVIRONMENT: process.env.DB_ENVIRONMENT || 'developement',
    TABLE_NOTES: 'notes',
    FIELD_ID   : 'id'   ,
    FIELD_TITLE: 'title',
    FIELD_BODY : 'body' ,
    LIMIT_TITLE: 128 ,
    LIMIT_BODY : 1024,
    // Errors
    ERROR_INTERNAL     : 'Internal Error',
    ERROR_MALFORMEDDATA: 'Malformed Data: The data provided was in the wrong format',
    ERROR_NOTFOUND     : 'Not Found: Could not find the requested resource',
    // Mime Types
    MIME_APPLICATION_JSON: 'application/json',
};
