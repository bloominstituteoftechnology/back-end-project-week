// Packages
require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
// Models
const Users = require('./models/Users');
const Notes = require('./models/Notes');
// Dependencies
const server = require('./server')(Users, Notes);
// Utils
const httpStatusCode = require('./utils/HTTPStatusCodes');
const { MONGO_TEST_URI } = process.env;

const logError = (responseObject, blockedCode) => {
  const { status, error } = responseObject;
  if (error && status !== blockedCode) {
    console.log("Error:",error);
  }
};

describe('Server:', () => {

  /* Global Test Data */
  const testUsers = [
    {
      '_id': '5b30103ce1b2f831b8b04010',
      'email': 'john@doe.com',
      'password': 'arewemarriedorarewesiblings',
      'notes': ['5b3010a706ae9531b8a9b421'],
    },
    {
      '_id': '5b30101a8a63c231b8200da2',
      'email': 'jane@doe.com',
      'password': 'porquenolosdos',
      'notes': ['5b3010deec60a131b830e565'],
    },
  ];

  const testNotes = [
    {
      '_id': '5b3010a706ae9531b8a9b421',
      'title': 'Hey',
      'text': 'You there! Hey! Over there!',
      'author': '5b30103ce1b2f831b8b04010',
      'collaborators': []
    },
    {
      '_id': '5b3010deec60a131b830e565',
      'title': 'One look',
      'text': 'That\'s all it takes. Possibilities!',
      'author': '5b30101a8a63c231b8200da2',
      'collaborators': []
    }
  ];

  const userToken = {
    token: ""
  };

  beforeAll(async () => {
    try {
      await mongoose.connect(MONGO_TEST_URI);
    } catch(error) {
      console.log('\n=== MongoDB Connection Error ===\n',error);
      return;
    }
    console.log('MongoDB connection successful.');
    await Users.create(testUsers);
    await Notes.create(testNotes);
  });

  afterAll(async () => {
    await Notes.remove();
    await Users.remove();
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

  describe(`'/register' Route:`, () => {

    /* Test Data */
    const testUser = {
      email: "ron@ron.com",
      password: "12345678"
    };

    it('rejects a malformed User object.', async () => {
      const { password, ...userWithNoPassword } = testUser;

      const responseObject = await request(server).post(`/register`).send(userWithNoPassword);
      logError(responseObject, httpStatusCode.badRequest);

      const { status, body } = responseObject;

      expect(status).toBe(httpStatusCode.badRequest);
    });

    it('accepts a new user.', async () => {
      const responseObject = await request(server).post('/register').send(testUser);
      logError(responseObject);

      const { status, body } = responseObject;

      expect(status).toBe(httpStatusCode.created);
      expect(body).toMatchObject({ email: testUser.email });
      expect(body).toHaveProperty('token');
      expect(body.token).toBeTruthy();
    });
  });

  describe(`'/login' Route:`, () => {

    /* Test Data */
    // const testUser = {
    //   email: "ron@ron.com",
    //   password: "12345678"
    // };

    const testUser = testUsers[1];

    it('rejects a malformed User object.', async () => {
      const { password, ...userWithNoPassword } = testUser;

      const responseObject = await request(server).post(`/login`).send(userWithNoPassword);
      logError(responseObject, httpStatusCode.badRequest);

      const { status } = responseObject;

      expect(status).toBe(httpStatusCode.badRequest);
    });

    it('rejects invalid logins.', async () => {
      const userWithWrongPassword = {...testUser, password: "wrongwrongwrong" };

      // should be noted that if the password inputted is less than 8 characters, it will trigger the controller validation error. Might be OK, but need to look into that.

      const responseObject = await request(server).post('/login').send(userWithWrongPassword);
      logError(responseObject, httpStatusCode.unauthorized);

      const { status, body } = responseObject;

      expect(status).toBe(httpStatusCode.unauthorized);
      expect(body).toMatchObject({ "error": "Login Failed."});
      expect(body).not.toHaveProperty('token');
      expect(body.token).toBeFalsy();
    });

    it('logins an existing user.', async () => {
      const responseObject = await request(server).post('/login').send(testUser);
      logError(responseObject);

      const { status, body } = responseObject;
      
      // We'll use the token generated from this login test to check authentication for other tests in this file.
      userToken.token = body.token;
      
      expect(status).toBe(httpStatusCode.OK);
      expect(body).toMatchObject({ "Welcome": "Login Successful"});
      expect(body).toHaveProperty('token');
      expect(body.token).toBeTruthy();
    });
  });
  
  describe(`'/notes' Route:`, () => {

    describe('POST Requests:', () => {
      /* Some Test Data */
      const testNote = {
        "title": "My first note",
        "text": "My brain is melting. Please send help.",
      };
    
      /* Test is irrelevant because we grab the author from _id in the user's JWT */
      // it("rejects POST request at '/notes' missing author.", async () => {
      //   const { author, ...noAuthorNote } = testNote;

      //   const responseObject = 
      //     await request(server)
      //       .post('/notes')
      //       .set('authorization', userToken.token)
      //       .send(noAuthorNote);
      //   logError(responseObject, httpStatusCode.badRequest);
  
      //   const { status, body } = responseObject;
      //   expect(status).toBe(httpStatusCode.badRequest);
      //   expect(body).toMatchObject({ error: "400: Bad Request\nThe 'author' field is missing but is required. Ensure it is a MongoDB ObjectID type." });
      // });
      
      it('rejects POST requests at \'notes\' without JWT', async () => {
        const responseObject = await request(server)
          .post('/notes')
          .send(testNote);
        logError(responseObject, httpStatusCode.unauthorized);
  
        const { status } = responseObject;
        expect(status).toBe(httpStatusCode.unauthorized);
      });

      it('accepts POST requests at \'notes\' with JWT', async () => {
        const responseObject = await request(server)
          .post('/notes')
          .set('authorization', userToken.token)
          .send(testNote);
        logError(responseObject);
  
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
  
      it('rejects requests at \'notes\' without JWT', async () => {
        // console.log("userToken token:",userToken.token);
        const responseObject = 
          await request(server)
            .get('/notes')
        logError(responseObject, httpStatusCode.unauthorized);

        const { status } = responseObject;
  
        expect(status).toBe(httpStatusCode.unauthorized);
      });

      it('accepts requests at \'notes\' with JWT', async () => {
        // console.log("userToken token:",userToken.token);
        const responseObject = 
          await request(server)
            .get('/notes')
            .set('authorization', userToken.token);
        logError(responseObject);

        const { status, body } = responseObject;
  
        expect(status).toBe(httpStatusCode.OK);
        expect(body).toEqual(expect.arrayContaining([expect.objectContaining(testNote)]));
        expect(body.length).toBe(2);
        // There should be three notes in total in the server, but only two notes related to the user whose token is being passed to the route.
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
        const responseObject = await request(server)
          .put('/notes')
          .set('authorization', userToken.token)
          .send(testNote);
        logError(responseObject, httpStatusCode.notFound);

        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.notFound);
        expect(body).toMatchObject({ error: "404: Not Found\nA valid note ID was not received with the PUT request. Please ensure the URL includes the ID of the note you wish to update." })
      });
    });
  });

  describe(`'/notes/:id' Route:`, () => {

    describe('GET Requests', () => {
      
      it('retrieves a specified note.', async () => {
        const idToRetrieve = testNotes[1]._id;
        
        const responseObject = await request(server)
          .get(`/notes/${idToRetrieve}`)
          .set('authorization', userToken.token);
        logError(responseObject);

        const noteExpectedToReceive = testNotes[1];
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.OK);
        expect(body).toMatchObject(noteExpectedToReceive);
      });

      it('denies access to a specified note from another user.', async () => {
        const idToRetrieve = testNotes[0]._id; // this note belongs to testUsers[0]. Remember that testUsers[1] is logged in.
        
        const responseObject = await request(server)
          .get(`/notes/${idToRetrieve}`)
          .set('authorization', userToken.token);
        logError(responseObject, httpStatusCode.unauthorized);

        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.unauthorized);
        expect(body).toMatchObject({ error: "401: Unauthorized\nYou don't appear to have permission to view this note." });
      });

      it('returns a 404 status when it cannot find a note with the specified ID.', async () => {
        const idToRetrieve = '5b30101a8a63c231b8200da2'; // a note with this id should not exist within the test environment

        const responseObject = await request(server)
          .get(`/notes/${idToRetrieve}`)
          .set('authorization', userToken.token);
        logError(responseObject, httpStatusCode.notFound);

        const {status, body } = responseObject;
        expect(status).toBe(httpStatusCode.notFound);
        expect(body).toEqual({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
      })
    });

    describe('PUT Requests:', () => {
      
      it('modifies a note appropriately.', async () => {
        const idToRetrieve = testNotes[1]._id;
        const { author, ...noteWithNoAuthor } = testNotes[1];
        const editedNote = {...noteWithNoAuthor, text: 'ABC123DOREMI' };
        const responseObject = await request(server)
          .put(`/notes/${idToRetrieve}`)
          .set('authorization', userToken.token)
          .send(editedNote);

        logError(responseObject);

        const noteExpectedToReceive = editedNote;
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.OK);
        expect(body).toMatchObject(noteExpectedToReceive);
      });

      it('rejects modification if user is not the author of the note', async () => {
        const idToRetrieve = testNotes[0]._id;
        const { author, ...noteWithNoAuthor } = testNotes[1];
        const editedNote = {...noteWithNoAuthor, text: 'ABC123DOREMI' };
        const responseObject = await request(server)
          .put(`/notes/${idToRetrieve}`)
          .set('authorization', userToken.token)
          .send(editedNote);

        logError(responseObject, httpStatusCode.unauthorized);

        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.unauthorized);
        expect(body).toMatchObject({ error: "401: Unauthorized\nYou don't appear to have permission to view this note." });
      });

      it('returns a 404 status when it cannot find a note with the specified ID.', async () => {
        const idToRetrieve = '5b30101a8a63c231b8200da2'; // a note with this id should not exist within the test environment
        const editedNote = testNotes[0]; //just a random test note. We shouldn't be getting this back

        const responseObject = await request(server)
          .put(`/notes/${idToRetrieve}`)
          .set('authorization', userToken.token)
          .send(editedNote);
        logError(responseObject, httpStatusCode.notFound);

        const noteExpectedToReceive = editedNote;
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.notFound);
        expect(body).toEqual({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
      });
    });

    describe('Sharing Notes:', () => {

      /* Test Data */

      it('rejects sharing a note if the sharer is not the note\'s author', async () => {
        const noteToShare = testNotes[0];
        const idOfNoteToShare = testNotes[0]._id;
        const emailOfUserToShareTo = testUsers[1].email;
        
        const responseObject = await request(server)
          .post(`/notes/${idOfNoteToShare}/share`)
          .set('authorization', userToken.token)
          .send({ email: emailOfUserToShareTo, share: true });
        logError(responseObject, httpStatusCode.unauthorized);
        
        const idOfUserToShareTo = testUsers[1]._id;
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.unauthorized);
      });
      
      /* The two below tests may give false positives */
      it('adds another user to a note\'s collaborators', async () => {
        const noteToShare = testNotes[1];
        const idOfNoteToShare = testNotes[1]._id;
        const emailOfUserToShareTo = testUsers[0].email;
        
        const responseObject = await request(server)
          .post(`/notes/${idOfNoteToShare}/share`)
          .set('authorization', userToken.token)
          .send({ email: emailOfUserToShareTo, share: true });
        logError(responseObject);
        
        const idOfUserToShareTo = testUsers[0]._id;
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.OK);
      });

      it('removes another user to a note\'s collaborators', async () => {
        const noteToShare = testNotes[1];
        const idOfNoteToShare = testNotes[1]._id;
        const emailOfUserToShareTo = testUsers[0].email;
        
        const responseObject = await request(server)
          .post(`/notes/${idOfNoteToShare}/share`)
          .set('authorization', userToken.token)
          .send({ email: emailOfUserToShareTo, share: false });
        logError(responseObject);
        
        const idOfUserToShareTo = testUsers[0]._id;
        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.OK);
        // expect(body).toMatchObject({ cookies: 'cookies' })
      });
    });

    describe('DELETE Requests:', () => {

      it('deletes a note appproriately.', async () => {
        const noteToDelete = testNotes[1];
        const idOfNoteToDelete = noteToDelete._id;

        const responseObject = await request(server)
          .delete(`/notes/${idOfNoteToDelete}`)
          .set('authorization', userToken.token);
        logError(responseObject);

        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.OK);
        expect(body).toEqual({"success": "Note successfully deleted."});
      });

      it('rejects deletion if the user is not the author of the note to be deleted.', async () => {
        const noteToDelete = testNotes[0];
        const idOfNoteToDelete = noteToDelete._id;

        const responseObject = await request(server)
          .delete(`/notes/${idOfNoteToDelete}`)
          .set('authorization', userToken.token);
        logError(responseObject,httpStatusCode.unauthorized);

        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.unauthorized);
      });

      it('returns a 404 status when it cannot find a note with the specified ID.', async () => {
        const idOfNoteToDelete = '5b30101a8a63c231b8200da2'; // a note with this id should not exist within the test environment

        const responseObject = await request(server)
          .delete(`/notes/${idOfNoteToDelete}`)
          .set('authorization', userToken.token);
        logError(responseObject, httpStatusCode.notFound);

        const { status, body } = responseObject;
        expect(status).toBe(httpStatusCode.notFound);
        expect(body).toEqual({ error: "404: Not Found\nThe note with the specified ID cannot be found. The note is likely to have changed or not exist, though you may double check the ID in the URL for errors." });
      });
    });
  });
});