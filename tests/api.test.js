const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server');

const Note = require('../models/note');
const faker = require('faker');

describe('Notes', () => {

  function getTestNoteData() {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    };
  }

  async function createNote(noteData) {
     return await new Note(noteData).save();
  }

  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  afterEach(() => {
    // return Note.remove();
  });

  describe('POST /api/notes', () => {
    it('should create a new game with correct data', async () => {
      const testNoteData = getTestNoteData(); 

      const response = await request(server)
        .post('/api/notes')
        .send(testNoteData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(testNoteData);
    });
  });

});
