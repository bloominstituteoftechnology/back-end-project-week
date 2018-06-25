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

  beforeAll(async () => {
    try {
      await mongoose.connect(MONGO_TEST_URI);
    } catch(error) {
      console.log('\n=== MongoDB Connection Error ===',error);
      console.log(error);
      return;
    }
    console.log('MongoDB connection successful.');
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
        expect(body).toEqual([expect.objectContaining(testNote)]);
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
        expect(body).not.toMatchObject({ message: "404: Not Found\nA valid note ID was not received with the PUT request. Please ensure the URL includes the ID of the note you wish to update." })
      });
    });
  });

  describe(`'/notes/:id' Routes:`, () => {

    describe('PUT Requests:', () => {

    });
  });
});