

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
        
    });

    //-- Get by ID -----------------------------------
    describe.skip('Test Get by ID Endpoint', function () {
        
    });
    
    //-- Create --------------------------------------
    describe.skip('Test Create Endpoint', function () {
        
    });
    
    //-- Delete --------------------------------------
    describe.skip('Test Delete Endpoint', function () {

    });
    
    //-- Update --------------------------------------
    describe.skip('Test Update Endpoint', function () {

    });
});
