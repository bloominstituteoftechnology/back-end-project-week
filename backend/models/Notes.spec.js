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
  
  describe('Validation Tests:', () => {

    /* Test Data */
    const testNote = {
      title: 'My first note',
      text: 'Cold-pressed locavore keytar 8-bit woke fixie, iPhone banh mi. Snackwave chicharrones skateboard meh, waistcoat tattooed vinyl subway tile raw denim PBR&B. VHS selfies pug actually craft beer food truck tote bag taiyaki shabby chic chillwave pickled air plant kogi vinyl. Vinyl slow-carb squid skateboard direct trade everyday carry, roof party umami cliche coloring book pickled. Next level kombucha pug, cold-pressed before they sold out seitan aesthetic.',
      author: testUser._id
    };

    it('rejects notes without an author.', async () => {
      const { author, ...noteWithoutAuthor } = testNote;

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
  
});