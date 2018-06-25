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
    await mongoose.disconnect();
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

  it('accepts requests at \'notes\'', async () => {
    const responseObject = await request(server).get('/notes');
    // let responseObject;
    // try {
    //   responseObject = await request(server.get('/notes');
    // } catch (error) {
    //   console.log(error);
    //   responseObject = error;
    // }
    const { status, body } = responseObject;

    expect(status).toBe(httpStatusCode.OK);
    expect(body).toEqual(expect.arrayContaining([]));
  });
});