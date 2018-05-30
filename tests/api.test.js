const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server');

const Note = require('../models/note');
const faker = require('faker');

describe('Notes', () => {
  let testNotesData = [];

  function getTestNoteData() {
    return {
      title: faker.random.words(3),
      content: faker.random.words(6),
    };
  }

  async function createNote() {
     return await new Note(getTestNoteData()).save();
  }

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test')
    console.log('\n=== connected to TEST DB ===');

    for(let i = 0; i < 5; i++) {
      testNotesData[i] = getTestNoteData(); 
    }

    // inserts and reassigns testNotesData so that it has the ids
    Note.insertMany(testNotesData, (err, notes) => {
      testNotesData = notes.map( note => {
        return { ...note._doc, _id: note._doc._id.toString() };
      });
    });
  });

  afterAll( async () => {
    await Note.remove();
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  // this test needs to be first
  describe('GET /api/notes', () => {
    it('should get list of all notes', async () => {

      const response = await request(server)
        .get('/api/notes');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(testNotesData);
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should get one note', async () => {

      const response = await request(server)
        .get(`/api/notes/${testNotesData[0]._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(testNotesData[0]);
    });
  });

  describe('POST /api/notes', () => {
    it('should create a new note with correct data', async () => {
      const testNoteData = getTestNoteData(); 

      const response = await request(server)
        .post('/api/notes')
        .send(testNoteData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(testNoteData);
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update a note', async () => {
      const testNoteData = getTestNoteData();

      const response = await request(server)
        .put(`/api/notes/${testNotesData[0]._id}`)
        .send(testNoteData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(testNoteData);
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should update a note', async () => {
      const response = await request(server)
        .delete(`/api/notes/${testNotesData[0]._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({"message": `Note with id ${testNotesData[0]._id} deleted.`});
    });
  });

});
