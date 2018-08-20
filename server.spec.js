const request = require('supertest');
const db = require('knex')(require('./knexfile').development);
const server = require('./server');
const noteSeedArray = require('./dummyData/noteSeedArray');

describe('Note api', () => {
  let baseNotes = [];
  beforeEach(done => db('notes')
    .truncate()
    .then(() => db('notes').insert(noteSeedArray))
    .then(() => db('notes').select())
    .then(res => baseNotes = res)
    .then(() => done()));
  describe('get all notes request', () => {
    it('returns all notes in database', async () => {
      console.log(process.env.PATH_GET_NOTES);
      const { body } = await request(server).get(process.env.PATH_GET_NOTES);
      expect(body).toEqual(baseNotes);
    });
  });
});
