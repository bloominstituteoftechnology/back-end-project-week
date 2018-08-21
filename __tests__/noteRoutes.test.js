const request = require('supertest');
const route = require('../routes/noteRoutes');
const db = require('../data/db');

let notes = [
  {
    id: 123,
    title: 'Lets take some notes',
    body: 'There is so much to learn at Lamba school'
  },
  {
    id: 124,
    title: 'Notes are my favorite thing',
    body: 'Everything I do, I do for notes'
  }
];
beforeEach(done => {
  db('notes')
    .insert(notes)
    .then(ids => done());
});
afterEach(done => {
  db('notes')
    .del()
    .then(count => done());
});
describe('notesRoutes', () => {
  describe('GET /api/notes', () => {
    it('should return a 200 status code', async () => {
      const res = await request(route)
        .get('/')
        .expect(200);
    });

    it('returned response should be type JSON', async () => {
      const res = await request(route).get('/');
      expect(res.type).toEqual('application/json');
    });

    it('should return an array of notes in response body', async () => {
      const res = await request(route).get('/');
      expect(res.body[0].title).toEqual(notes[0].title);
      expect(res.body[0].body).toEqual(notes[0].body);
      expect(res.body[1].title).toEqual(notes[1].title);
      expect(res.body[1].body).toEqual(notes[1].body);
    });
  });

  describe('GET /notes/:id', () => {
    it('should return a status code of 200', async () => {
      const res = await request(route)
        .get('/123')
        .expect(200);
    });

    it('should respond with a type of JSON', async () => {
      const res = await request(route).get('/123');
      expect(res.type).toEqual('application/json');
    });

    it('should return with a single object', async () => {
      const res = await request(route).get('/123');
      expect(res.body.title).toEqual(notes[0].title);
    });

    it('should return with status of 404 if the note is not found', async () => {
      const res = await request(route)
        .get('/500')
        .expect(404);
    });
  });

  describe('POST /notes', () => {
    it('should return successfully with a status code of 201', async () => {
      const note = {
        id: 125,
        title: 'Monster Hunter', // required
        body: 'I really like the monster hunter game' // required
      };
      const res = await request(route)
        .post('/')
        .send(note)
        .expect(201);
    });

    it('should return unsuccessfully with a status code of 422', async () => {
      const note = {
        title: 'This is an invalid note' // required
      };
      const res = await request(route)
        .post('/')
        .send(note)
        .expect(422);
    });

    it('should return an array of notes with the newly posted object', async () => {
      const note = {
        id: 125,
        title: 'Monster Hunter', // required
        body: 'I really like the monster hunter game' // required
      };
      const res = await request(route)
        .post('/')
        .send(note);
      expect(res.body[res.body.length - 1].id).toEqual(note.id);
    });
  });

  describe('/DELETE/:id', () => {
    it('should respond with a status code of 200', async () => {
      const res = await request(route)
        .del('/123')
        .expect(200);
    });

    it('should respond with an success of true', async () => {
      const res = await request(route).del('/123');
      expect(res.body.success).toBe(true);
    });

    it('should respond with a status of 404 if not found', async () => {
      const res = await request(route)
        .delete('/10')
        .expect(404);
    });
  });
});
