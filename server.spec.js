const request = require('supertest');
const db = require('knex')(require('./knexfile').development);
const server = require('./server');
const noteSeedArray = require('./dummyData/noteSeedArray');

function basicPopulate() {
  return new Promise((resolve, reject) => {
    db.schema
      .dropTableIfExists('notes', () => {})
      .then(() => db.schema.createTable('notes', notes => Promise.all([
        notes.increments('id'),
        notes.string('title', 20).unique(),
        notes.text('textBody'),
        notes.timestamp('createdAt').defaultTo(db.fn.now()),
      ])))
      .then(() => db('notes').insert(noteSeedArray))
      .then(() => db('notes').select())
      .then(res => resolve(res));
  });
}

describe('Note api', () => {
  let baseNotes = [];
  it('responds with a 404 error when a bad url is sent', async (done) => {
    const response = await request(server).get('/badurl');
    expect(response.status).toEqual(404);
    done();
  });
  describe('get all notes request', () => {
    beforeEach(done => basicPopulate()
      .then((res) => {
        baseNotes = res;
      })
      .then(() => done()));
    it('returns all notes in database', async (done) => {
      const { body, status } = await request(server).get(process.env.PATH_GET_NOTES);
      expect(status).toEqual(200);
      expect(body).toEqual(baseNotes);
      done();
    });
    it('returns an empty array when there are no notes', (done) => {
      db('notes')
        .truncate()
        .then(() => request(server).get(process.env.PATH_GET_NOTES))
        .then(({ body, status }) => {
          expect(status).toEqual(200);
          expect(body instanceof Array).toBe(true);
          expect(body.length).toBe(0);
          return done();
        });
    });
  });
  describe('for a single note', () => {
    beforeEach(done => basicPopulate()
      .then((res) => {
        baseNotes = res;
      })
      .then(() => done()));
    it('returns a note when url contains an id for an existing note', async (done) => {
      const { body, status } = await request(server).get(`${process.env.PATH_GET_NOTES}/2`);
      expect(status).toEqual(200);
      expect(body).toEqual(baseNotes[1]);
      done();
    });
    it('returns a 404 when a request for a non-existent id is made', async (done) => {
      const { body, status } = await request(server).get(`${process.env.PATH_GET_NOTES}/9`);
      expect(status).toEqual(404);
      expect(body.message).toBeDefined();
      done();
    });
  });
  describe('delete a note', () => {
    beforeEach(done => basicPopulate()
      .then((res) => {
        baseNotes = res;
      })
      .then(() => done()));
    it('reduces notes array length by 1', (done) => {
      request(server)
        .delete(`${process.env.PATH_DELETE_NOTE}/2`)
        .then(({ status }) => expect(status).toEqual(204))
        .then(() => db('notes')
          .count({ count: '*' })
          .first())
        .then(({ count }) => {
          expect(count).toEqual(baseNotes.length - 1);
          return done();
        });
    });
    it('returns a 404 error if a bad id is sent', (done) => {
      request(server)
        .delete(`${process.env.PATH_DELETE_NOTE}/25`)
        .then(({ status }) => {
          expect(status).toEqual(404);
          return db('notes')
            .count({ count: '*' })
            .first();
        })
        .then(({ count }) => {
          expect(count).toEqual(baseNotes.length);
          done();
        });
    });
  });
  describe('create a note', () => {
    const newNote = {
      title: 'New note',
      textBody: 'This is a new note',
    };
    const noTitle = {
      textBody: 'Text with no title',
    };
    const zeroString = {
      title: '',
      textBody: 'Title is zero string',
    };
    beforeEach(done => basicPopulate()
      .then((res) => {
        baseNotes = res;
      })
      .then(() => done()));
    it('creates a note successfully', (done) => {
      request(server)
        .post(process.env.PATH_POST_NOTE)
        .send(newNote)
        .then(({ status, body }) => {
          expect(status).toEqual(201);
          expect(body.id).toBeGreaterThanOrEqual(1);
          return body.id;
        })
        .then(id => db('notes')
          .where('id', '=', id)
          .first())
        .then((response) => {
          const { createdAt, ...rest } = response;
          expect(createdAt).toBeDefined();
          expect(rest).toEqual({ ...rest, id: 4 });
          return done();
        });
    });
    it('rejects a note with an undefined title', (done) => {
      request(server)
        .post(process.env.PATH_POST_NOTE)
        .send(noTitle)
        .then((res) => {
          const {
            status,
            body: { message },
          } = res;
          expect(status).toEqual(400);
          expect(message).toBeDefined();
          done();
        });
    });
    it('rejects a note with a zero-string title', (done) => {
      request(server)
        .post(process.env.PATH_POST_NOTE)
        .send(zeroString)
        .then((res) => {
          const {
            status,
            body: { message },
          } = res;
          expect(status).toEqual(400);
          expect(message).toBeDefined();
          done();
        });
    });
  });
});
