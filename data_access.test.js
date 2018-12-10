

//== Data Access Test ==========================================================

//-- Dependencies --------------------------------
const dataAccess = require('./data_access.js');


//== Crud Tests ================================================================

describe("Test Data Access", function () {

    //-- Clear table ---------------------------------
    describe("Clear Data", function () {
        // Clears all entries
    })

    //-- Create Entry --------------------------------
    describe("Create Entry", function () {
        // Returns created entry, with id
        // Throws errors with incorrect submissions
    });

    //-- Get Entry -----------------------------------
    describe("Get Entry", function () {
        // Returns entry from provided id
        // Throws errors with invalid ids (not found)
    });

    //-- Get All Entries -----------------------------
    describe("Get All Entries", function () {
        // Returns array of all entries
    });

    //-- Delete Entry --------------------------------
    describe("Delete Entry", function () {
        // Returns entry from provided id
        // Removes entry from data
        // Throws errors with invalid ids (not found)
    });

    //-- Update Entry --------------------------------
    describe("Update Entry", function () {
    });
});
