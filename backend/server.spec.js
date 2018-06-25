// Packages
const request = require('supertest');
const mongoose = require('mongoose');
// Models
const Notes = require('./models/Notes');
// Dependencies
const server = require('./server')(Notes);
// Utils
const httpStatusCode = require('./utils/HTTPStatusCodes');
const { MONGO_TEST_URI } = require('./utils/secrets');

describe('Server:', () => {

  /* Global Test Data */
  const testUsers = [
    {
      '_id': '5b30103ce1b2f831b8b04010',
      'email': 'john@doe.com',
      'password': 'arewemarriedorarewesiblings',
      'notes': ['5b3010a706ae9531b8a9b421']
    },
    {
      '_id': '5b30101a8a63c231b8200da2',
      'email': 'jane@doe.com',
      'password': 'porquenolosdos',
      'notes': ['5b3010deec60a131b830e565']
    },
  ];

  const testNotes = [
    {
      '_id': '5b3010a706ae9531b8a9b421',
      'title': 'Hey',
      'text': 'You there! Hey! Over there!',
      'author': '5b30103ce1b2f831b8b04010'
    },
    {
      '_id': '5b3010deec60a131b830e565',
      'title': 'One look',
      'text': 'That\'s all it takes. Possibilities!',
      'author': '5b30101a8a63c231b8200da2'
    }
  ];

  beforeAll(async () => {
    try {
      await mongoose.connect(MONGO_TEST_URI);
    } catch(error) {
      console.log('\n=== MongoDB Connection Error ===\n',error);
      return;
    }
    console.log('MongoDB connection successful.');
    await Notes.create(testNotes);
  });

  afterAll(async () => {
    await Notes.remove();
    await mongoose.disconnect();
    console.log('MongoDB connection terminated.');
  });

  it('Tests are testing.', () => {
    expect('sanity check').toBe('sanity check');
    expect(true).toBeTruthy();
  });

  it('Server accepts requests at root.', async () => {
    const responseObject = await request(server).get('/');
    const { status } = responseObject;

    expect(status).toBe(httpStatusCode.OK);
  });
  
  describe(`'/notes' Route:`, () => {

    describe('POST Requests:', () => {
      /* Some Test Data */
      const testNote = {
        "title": "My first note",
        "text": "My brain is melting. Please send help.",
        "author": "5b30101a8a63c231b8200da2"
      };
    
      it("rejects POST request at '/notes' missing author.", async () => {
        const { author, ...noAuthorNote } = testNote;
  
        let responseObject;
        try {
          responseObject = await request(server).post('/notes').send(noAuthorNote);
        } catch (error) {
          console.log('acccepts POST requests at \'notes\' ERROR:',error);
        }
  
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.badRequest);
        expect(body).toMatchObject({ message: "Please let your admin or dev know an error has happened and show them the following:\n400: Bad Request\nThe 'author' field is missing but is required. Ensure it is a MongoDB ObjectID type." });
      });
      
      it('acccepts POST requests at \'notes\'', async () => {
        let responseObject;
        try {
          responseObject = await request(server).post('/notes').send(testNote);
        } catch (error) {
          console.log('acccepts POST requests at \'notes\' ERROR:',error);
        }
  
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.created);
        expect(body).toMatchObject(testNote);
      });
    });
  
    describe('GET Requests:', () => {
      /* Some Test Data */
      const testNote = {
        "title": "My first note",
        "text": "My brain is melting. Please send help.",
        "author": "5b30101a8a63c231b8200da2"
      };
  
      it('accepts requests at \'notes\'', async () => {
        let responseObject;
        try {
          responseObject = await request(server).get('/notes');
        } catch (error) {
          console.log('accepts requests at \'notes\' ERROR:',error);
        }
        const { status, body } = responseObject;
  
        expect(status).toBe(httpStatusCode.OK);
        expect(body).toEqual(expect.arrayContaining([expect.objectContaining(testNote)]));
        expect(body.length).toBe(3);
      });
    });
    
    describe('PUT Requests:', () => {

      /* Some Test Data */
      const testNote = {
        "title": "My first note",
        "text": "My brain is melting. Please send help.",
        "author": "5b30101a8a63c231b8200da2"
      };

      it(`rejects PUT requests at root '/notes'`, async () => {
        let responseObject;
        try {
          responseObject = await request(server).put('/notes').send(testNote);
        } catch (error) {
          console.log(`rejects PUT requests at root '/notes'--ERROR:`,error);
        }
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.notFound);
        expect(body).toMatchObject({ message: "404: Not Found\nA valid note ID was not received with the PUT request. Please ensure the URL includes the ID of the note you wish to update." })
      });
    });
  });

  describe(`'/notes/:id' Routes:`, () => {

    describe('GET Requests', () => {
      
      it('retrieves a specified note.', async () => {
        const idToRetrieve = testNotes[0]._id;
        
        let responseObject;
        try {
          responseObject = await request(server).get(`/notes/${idToRetrieve}`);
        } catch (error) {
          console.log(`retrieves a specified note--ERROR:`,error);
        }
        
        const noteExpectedToReceive = testNotes[0];
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.OK);
        expect(body).toMatchObject(noteExpectedToReceive);
      });

      it('returns a 404 status when it cannot find a note with the specified ID.', async () => {
        const idToRetrieve = '5b30101a8a63c231b8200da2'; // this id does not exist

        let responseObject;
        try {
          responseObject = await request(server).get(`/notes/${idToRetrieve}`);
        } catch (error) {
          console.log(`retrieves a specified note--ERROR:`,error);
        }

        const {status, body } = responseObject;
        console.log("BODY:",body);
        expect(status).toBe(httpStatusCode.notFound);
        expect(body).toEqual({ message: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
      })
    });

    describe('PUT Requests:', () => {
      
      it('modifies a note appropriately.', async () => {
        const idToRetrieve = testNotes[1]._id;
        const editedNote = {...testNotes[1], text: 'ABC123DOREMI' };

        let responseObject;
        try {
          responseObject = await request(server).put(`/notes/${idToRetrieve}`).send(editedNote);
        } catch (error) {
          console.log(`retrieves a specified note--ERROR:`,error);
        }
        console.log(await Notes.find());
        const noteExpectedToReceive = editedNote;
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.OK);
        expect(body).toMatchObject(noteExpectedToReceive);
      });
    });
  });
});