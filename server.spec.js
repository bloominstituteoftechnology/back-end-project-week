const request = require('supertest');
const db = require('knex')(require('./knexfile').development);
const server = require('./server');
const noteSeedArray = require('./dummyData/noteSeedArray');

describe('Note api', () => {
  describe('get all notes request', () => {
    let baseNotes = [];
    beforeEach(done => db('notes')
      .truncate()
      .then(() => db('notes').insert(noteSeedArray))
      .then(() => db('notes').select())
      .then(res => (baseNotes = res))
      .then(() => done()));
    it('returns all notes in database', async () => {
      const { body } = await request(server).get(process.env.PATH_GET_NOTES);
      expect(body).toEqual(baseNotes);
    });

    it('returns an empty array when there are no notes', () => {
      db('notes')
        .truncate()
        .then(() => request(server).get(process.env.PATH_GET_NOTES))
        .then(({ body }) => {
          expect(body instanceof Array).toBe(true);
          expect(body.length).toBe(0);
          return;
        });
    });
  });
});
