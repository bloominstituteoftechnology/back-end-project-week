const request = require('supertest');
const db = require('knex')(require('./knexfile').development);
const server = require('./server');
const noteSeedArray = require('./dummyData/noteSeedArray');

function basicPopulate() {
  return new Promise((resolve, reject) => {
    db('notes')
      .truncate()
      .then(() => db('notes').insert(noteSeedArray))
      .then(() => db('notes').select())
      .then(res => resolve(res));
  });
}

describe('Note api', () => {
  let baseNotes = [];
  it('responds with a 404 error when a bad url is sent', async () => {
    const response = await request(server).get('/badurl');
    expect(response.status).toEqual(404);
  });
  describe('get all notes request', () => {
    beforeEach(done => basicPopulate() 
      .then((res) => {
        baseNotes = res;
      })
      .then(() => done()));
    it('returns all notes in database', async () => {
      const { body, status } = await request(server).get(process.env.PATH_GET_NOTES);
      expect(status).toEqual(200);
      expect(body).toEqual(baseNotes);
    });
    it('returns an empty array when there are no notes', () => {
      db('notes')
        .truncate()
        .then(() => request(server).get(process.env.PATH_GET_NOTES))
        .then(({ body, status }) => {
          expect(status).toEqual(200)
          expect(body instanceof Array).toBe(true);
          expect(body.length).toBe(0);
        });
    });
  });
  describe('for a single note', () => {
    beforeEach(done => basicPopulate() 
      .then((res) => {
        baseNotes = res;
      })
      .then(() => done()));
    it('returns a note when url contains an id for an existing note', async () => {
      const { body, status } = await request(server).get(`${process.env.PATH_GET_NOTES}/2`);
      expect(status).toEqual(200);
      expect(body).toEqual(baseNotes[1]);
    });
    it('returns a 404 when a request for a non-existent id is made', async () => {
      const { body, status } = await request(server).get(`${process.env.PATH_GET_NOTES}/9`);
      expect(status).toEqual(404);
      expect(body.message).toBeDefined();
    });
  });
});
