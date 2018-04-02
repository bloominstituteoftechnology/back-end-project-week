// When we run a command to test our project:
// Mocha library starts up -> Tell Mongoose to connect to Mongo -> (wait) -> Mongoose connects to Mongo -> Connection successful? Run tests / Connection Failed? Show Error.
const mongoose = require('mongoose'); // every file in Node is executed in its own scope, must require into this file

// VvV this isn't needed necessarily
mongoose.Promise = global.Promise; // Mongoose when you want to create a Promise, use this library
// global.Promise is ES6 implementation of promise

// 'before' is run
before ((done) => { // connection to Mongoose will take some time, say to Mocha hold up until we have successfully connected to Mongo
  mongoose.connect('mongodb://localhost/notes'); // initialize Mongoose connection to Mongo.. tell it very directly where/what server of Mongo you want to connect to is
  // ^ notes is the Database we want to connect to (store any collections in that database)
  // NOTE: you don't have to create a database ahead of time
  mongoose.connection
  // .once and .on are both event handlers
    .once('open', () => {
      console.log('Good to go'); // watch for Mongoose to emit event 'open' one time, then run this function
      done();
    })
    .on('error', (error) => { // watch for Mongoose to emit event error, and when it does run this function
    console.warn('Warning', error);
    });
});


// A hook is a function that will be executed before any test gets executed inside the test suite
beforeEach((done) => { // runs before each test suite (this is a Mocha function) (beforeEach is a hook)
  // done says I'm all complete with beforeEach (beforeEach, it, describe: can all use done function)
  // .drop() - take all records inside notes collection and delete all of them
  mongoose.connection.collections.notes.drop(() => {
    // ready to run next test
    done(); // after our collection of notes has been drop, signal to mocha you can run the next test
    console.log('Done dropping collection');
  }); // direct reference to our collection of notes in the DB
  // .drop() is async.. so we want to make sure mocha stops until the drop function is done (before mocha runs next test)
});
