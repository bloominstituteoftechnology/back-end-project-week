const request = require('supertest');
const db = require('knex')(require('./knexfile').development);
const server = require('./server');
const noteSeedArray = require('./dummyData/noteSeedArray');
const tagSeedArray = require('./dummyData/tagSeedArray');
const notesTagsJoinArray = require('./dummyData/notesTagsJoinArray');
const seed = require('./seeds/01notes');
const snakeToCamel = require('./utils/snakeToCamel');
const orderList = require('./utils/orderList');

async function getCurrentDB() {
  let { rows } = await db.raw('SELECT * FROM notes');
  const camelCased = rows.map(snakeToCamel);
  const ordered = orderList(camelCased);
  const tagPromises = ordered.map(
    note => new Promise((resolve) => {
      db.select('tags.id', 'tags.name')
        .from('notesTagsJoin')
        .innerJoin('tags', 'notesTagsJoin.tagId', '=', 'tags.id')
        .where('notesTagsJoin.noteId', '=', note.id)
        .then((res) => {
          resolve({ ...note, tags: [...res] });
        });
    }),
  );
  rows = await Promise.all(tagPromises);

  // this converts createdAt property to a string to match the way it returns as a raw
  // query from postgresql, which is what is used on the server.
  return JSON.parse(JSON.stringify(rows));
}

async function basicPopulate() {
  await db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(res => db.seed.run());

  const currentDB = await getCurrentDB();
  return currentDB;
}

describe('Note api', () => {
  let baseNotes = [];
  beforeEach(async () => {
    baseNotes = await basicPopulate(baseNotes);
  });

  it('responds with a 404 error when a bad url is sent', async (done) => {
    const response = await request(server).get('/badurl');
    expect(response.status).toEqual(404);
    done();
  });

  it('returns all notes in database', async (done) => {
    const { body, status } = await request(server).get('/notes/get/all');

    expect(status).toEqual(200);
    expect(body).toEqual(baseNotes);
    return done();
  });

  it('returns an empty array when there are no notes', async (done) => {
    await db.raw('ALTER TABLE "notesTagsJoin" DROP CONSTRAINT "notestagsjoin_noteid_foreign"');
    await db('notes').truncate();

    const { body, status } = await request(server).get('/notes/get/all');

    expect(status).toEqual(200);
    expect(body instanceof Array).toBe(true);
    expect(body.length).toBe(0);
    return done();
  });

  it('returns a note when url contains an id for an existing note', async (done) => {
    const { body, status } = await request(server).get('/notes/get/2');
    expect(status).toEqual(200);
    expect(body).toEqual(baseNotes[1]);
    done();
  });

  it('returns a 404 when a request for a non-existent id is made', async (done) => {
    const { body, status } = await request(server).get('/notes/get/45');
    expect(status).toEqual(404);
    expect(body.message).toBeDefined();
    done();
  });

  it('reduces notes array length by 1', (done) => {
    request(server)
      .delete('/notes/delete/2')
      .then(({ status }) => expect(status).toEqual(204))
      .then(() => db('notes')
        .count({ count: '*' })
        .first())
      .then(({ count }) => {
        expect(Number(count)).toEqual(baseNotes.length - 1);
        return done();
      });
  });

  it('returns a 404 error if a bad id is sent', (done) => {
    request(server)
      .delete('/notes/delete/nonexistent')
      .then(({ status }) => {
        expect(status).toEqual(404);
        return db('notes')
          .count({ count: '*' })
          .first();
      })
      .then(({ count }) => {
        expect(Number(count)).toEqual(baseNotes.length);
        return done();
      });
  });

  it('creates a note successfully', (done) => {
    const newNote = {
      title: 'New note',
      text_body: 'This is a new note',
    };
    let createdNote;
    request(server)
      .post('/notes/create')
      .send(newNote)
      .then(({ status, body }) => {
        expect(status).toEqual(201);
        expect(body.id).toBeGreaterThanOrEqual(1);
        createdNote = body;
        return createdNote.id;
      })
      .then(id => db('notes')
        .where('id', '=', id)
        .first())
      .then((response) => {
        expect(response['created_at']).toBeDefined();
        expect(createdNote).toEqual(response);
        return done();
      });
  });
  //   it('rejects a note with an undefined title', (done) => {
  //     request(server)
  //       .post(process.env.PATH_POST_NOTE)
  //       .send(noTitle)
  //       .then((res) => {
  //         const {
  //           status,
  //           body: { message },
  //         } = res;
  //         expect(status).toEqual(400);
  //         expect(message).toBeDefined();
  //         return done();
  //       });
  //   });
  //   it('rejects a note with a zero-string title', (done) => {
  //     request(server)
  //       .post(process.env.PATH_POST_NOTE)
  //       .send(zeroString)
  //       .then((res) => {
  //         const {
  //           status,
  //           body: { message },
  //         } = res;
  //         expect(status).toEqual(400);
  //         expect(message).toBeDefined();
  //         return done();
  //       });
  //   });
  // });
  // describe('for a put request', () => {
  //   const updateNote = {
  //     title: 'New note',
  //     text_body: 'This is a new note',
  //   };
  //   const zeroString = {
  //     title: '',
  //   };
  //   let baseNotes;
  //   beforeEach(done => basicPopulate()
  //     .then((res) => {
  //       baseNotes = res;
  //     })
  //     .then(() => done()));
  //   it('edits a note', (done) => {
  //     const { id } = baseNotes[1];
  //     request(server)
  //       .put(`${process.env.PATH_EDIT_NOTE}/${id}`)
  //       .send(updateNote)
  //       .then(({ status }) => {
  //         expect(status).toEqual(204);
  //         return db('notes')
  //           .where('id', '=', id)
  //           .select(Object.keys(updateNote))
  //           .first();
  //       })
  //       .then((editedObj) => {
  //         expect(editedObj).toEqual(updateNote);
  //         return done();
  //       });
  //   });
  //   it('throws a 404 error for a bad id', done => request(server)
  //     .put(`${process.env.PATH_EDIT_NOTE}/305`)
  //     .send(updateNote)
  //     .then(({ status }) => {
  //       expect(status).toEqual(404);
  //       return done();
  //     }));
  //   it('throws a 400 error for a 0-string title', (done) => {
  //     const { id } = baseNotes[1];
  //     request(server)
  //       .put(`${process.env.PATH_EDIT_NOTE}/${id}`)
  //       .send(zeroString)
  //       .then(({ status }) => {
  //         expect(status).toEqual(400);
  //         return db('notes')
  //           .where('id', '=', id)
  //           .first();
  //       })
  //       .then((editedObj) => {
  //         expect(editedObj).toEqual(baseNotes[1]);
  //         return done();
  //       });
  //   });
});
