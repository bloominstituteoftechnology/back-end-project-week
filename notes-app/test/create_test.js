// MOCHA

// Mocha gives us global access to describe and it function, not nothing to make an assertion (inside it)
const assert = require('assert');
const Note = require('../src/models/note.js');

describe('Creating records', () => { // first arg has nothing to do with tests, just for us to know what's breaking
  it('saves a note', (done) => { // whenever Mocha sees and it function (ah, the dev is trying to run some kind of test inside here)
    // make an assertion here (compare one value to another.. Mocha compares it)
    // assert(1 + 1 === 2); // evaluates to true, test passes
    const newNote = new Note({ title: 'Test Title', content: 'This is the content' }); // Note can only have a name, and name has to be a string
    // newNote becomes an instance of Note (does not save to DB yet)

    newNote.save() // newNote is an object with a bunch of functions attached to it (one which is .save())
      .then(() => {
        // Has newNote been saved successfully?
        // if the record has not been saved to the database YET, isNew = true
        // once newNote is saved, isNew = false
        assert(!newNote.isNew); // check to make sure it's NOT isNew (isNew = true when it hasn't reached DB yet)
        done(); // done is available to every single 'it' block and 'foreach' in Mocha
        console.log(`'Done saving the note!'`);
      });
  })
}) // 2 args, 1) string that describes the test we're about to write, 2) a function
