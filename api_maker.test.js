

//== API Maker Test ============================================================

//-- Dependencies --------------------------------
const request = require('supertest');
const config     = require('./config.js'     );
const apiMaker   = require('./api_maker.js'  );


//== CRUD Tests ================================================================

describe('Test API Maker', () => {
    let testAPI = apiMaker(config.TABLE_NOTES);

    //-- Get All -------------------------------------
    describe.skip('Test Get All Endpoint', function () {
        // Responds with status 200
        // Responds with JSON
        // Responds with an array
        // Responds with all entries
    });

    //-- Get by ID -----------------------------------
    describe.skip('Test Get by ID Endpoint', function () {
        // Responds with status 200
        // Responds with JSON
        // Responds with Entry
        // Handles unknown IDs (404)
    });
    
    //-- Create --------------------------------------
    describe.skip('Test Create Endpoint', function () {
        // Responds with status 201
        // Responds with JSON
        // Responds with Entry
        // Handles malformed data (422)
    });
    
    //-- Delete --------------------------------------
    describe.skip('Test Delete Endpoint', function () {
        // Responds with status 200
        // Responds with JSON
        // Responds with Entry
        // Handles unknown IDs (404)
        // Actually Deletes Entry
    });
    
    //-- Update --------------------------------------
    describe.skip('Test Update Endpoint', function () {
        // Responds with status 200
        // Responds with JSON
        // Responds with Entry
        // Handles unknown IDs (404)
        // Actually Updates Entry
    });
});
