process.env.NODE_ENV = 'test';

const request = require('supertest');
const server = require('../../../server');

describe('/api/notes', () => {
  describe('GET all notes', () => {
    it('should return a status of 200', async () => {
      let response = await request(server).get('/api/notes');
      expect(response.status).toBe(200);
    });
    it('should return an array with 6 six items', async () => {
      let response = await request(server).get('/api/notes');
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(6);
    });
    it('should return notes with an id, title, content, created_at, updated_at, and user_id row', async () => {
      let response = await request(server).get('/api/notes');
      let firstNote = response.body[0];
      // id and user_id
      expect(firstNote.id && firstNote.user_id).toBe(1);
      expect(firstNote.id && firstNote.user_id).toBeTruthy();
      expect(typeof firstNote.id && typeof firstNote.user_id).toBe('number');
      // title and content
      expect(firstNote.title).toBe('Note 1 User 1');
      expect(firstNote.content).toBe('This is a note ya da da da');
      expect(firstNote.title && firstNote.content).toBeTruthy();
      expect(typeof firstNote.title && typeof firstNote.content).toBe('string');
      // created_at and updated_at
      expect(firstNote.created_at && firstNote.updated_at).toBeTruthy();
    });
  });
  describe('GET single note by id', () => {
    it('should return a status of 200', async () => {
      let response = await request(server).get('/api/notes/1');
      expect(response.status).toBe(200);
    });
    it('should return a status of 404 if note does not exist', async () => {
      let response = await request(server).get('/api/notes/10');
      expect(response.status).toBe(404);
    });

    it('should return an object with an id, title, content, created_at, updated_at, and user_id row', async () => {
      let response = await request(server).get('/api/notes/1');
      let note = response.body;
      // id and user_id
      expect(note.id && note.user_id).toBe(1);
      expect(note.id && note.user_id).toBeTruthy();
      expect(typeof note.id && typeof note.user_id).toBe('number');
      // title and content
      expect(note.title).toBe('Note 1 User 1');
      expect(note.content).toBe('This is a note ya da da da');
      expect(note.title && note.content).toBeTruthy();
      expect(typeof note.title && typeof note.content).toBe('string');
      // created_at and updated_at
      expect(note.created_at && note.updated_at).toBeTruthy();
    });
  });
});
