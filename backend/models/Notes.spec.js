// Packages
const mongoose = require('mongoose');
// Dependencies
const Notes = require('./Notes');
const Users = require('./Users');
// Definitions
const { MONGO_TEST_URI } = require('../utils/secrets');

describe('Notes Model:', () => {

  /* Global Test Data */
  const testUser = {
    '_id': '5b2ff5a976a4003b18e28ae8',
    'email': 'john@doe.com',
    'password': 'arewemarriedorarewesiblings',
  };
  
  beforeAll(async () => {
    try {
      await mongoose.connect(MONGO_TEST_URI);
    } catch(error) {
      console.log("\n=== MongoDB connection unsuccessful ===\n",error);
      return;
    }
    console.log('\n*** connected to TEST DB ***\n');
    const createdUser = await Users.create(testUser);
  });
  
  afterAll(async () => {
    await Notes.remove();
    await Users.remove();
    return mongoose
    .disconnect()
    .then(() => console.log('\n=== disconnected from TEST DB ==='))
    .catch(err => console.log('\nError:',err,'\n'));
  });
  
  it('The tests are testing.', () => {
    expect('sanity check').toBe('sanity check');
    expect(true).toBeTruthy();
  });

  /* Test Data */
  const testNote = {
    title: 'My first note',
    text: 'Cold-pressed locavore keytar 8-bit woke fixie, iPhone banh mi. Snackwave chicharrones skateboard meh, waistcoat tattooed vinyl subway tile raw denim PBR&B. VHS selfies pug actually craft beer food truck tote bag taiyaki shabby chic chillwave pickled air plant kogi vinyl. Vinyl slow-carb squid skateboard direct trade everyday carry, roof party umami cliche coloring book pickled. Next level kombucha pug, cold-pressed before they sold out seitan aesthetic.',
    author: testUser._id
  };
  
  const { author, ...noteWithoutAuthor } = testNote;

  describe('Validation Tests:', () => {

    it('rejects notes without an author.', async () => {
      let response;
      try {
        response = await Notes.create(noteWithoutAuthor);
      } catch(error) {
        response = error;
      }
      // console.log('TEST-rejects notes without an author--response:\n',response);
      expect(response.message).toBe("Note validation failed: author: Path `author` is required.");
    });
  });

  describe('CRUD Tests:', () => {
    /* Test Data */

    it('saves a new note to the DB.', async () => {
      let response;
      try {
        response = await Notes.create(testNote);
        noteWithoutAuthor._id = response._id;
      } catch(error) {
        console.log('saves a new note to the DB--ERROR:',error);
      }

      expect(response).toMatchObject(noteWithoutAuthor);
      // An error appears if we try to match the response with the test note directly
      // The author fields might match, but the formats are different, with one a string
      // and the other a full blown BSON object thing.
    });

    it('allows an existing note to be modified.', async () => {
      const editedNote = { ...noteWithoutAuthor, text: 'thing object blown full fields match' };
      let response;
      try {
        const idOfNoteToEdit = noteWithoutAuthor._id;
        const configObj = { new: true }; // configure response to be the updated object
        response = await Notes.findByIdAndUpdate(idOfNoteToEdit, editedNote, configObj);
      } catch(error) {
        console.log('saves a new note to the DB--ERROR:',error);
      }
      expect(response).toMatchObject(editedNote);
    });

    // it('removes an existing note from the DB.', async () => {
    //   let removeResponse;
    //   try {
    //     const idOfNoteToRemove = noteWithoutAuthor._id;
    //     removeReponse = await Notes.findByIdAndRemove(idOfNoteToRemove);
    //   } catch (error) {
    //     console.log('removes an existing note from the DB--ERROR:',error);
    //   }
    //   console.log('removes an existing note from the DB--removeResponse:',removeResponse);
    //   expect(removeResponse).toMatchObject(noteWithoutAuthor);
    // });
  });
  
});