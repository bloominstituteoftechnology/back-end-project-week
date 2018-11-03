/* eslint-disable prefer-destructuring */
const supertest = require('supertest');
const faker = require('faker');
const db = require('knex')(require('../knexfile').development);
const server = require('../server');
const snakeToCamel = require('../utils/snakeToCamel');
const camelToSnake = require('../utils/camelToSnake');
const orderList = require('../utils/orderList');

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

  const scratchLogin = (request) => {
    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    return request
      .post('/auth/register')
      .send(user)
      .then((response) => {
        return request
          .post('/auth/login')
          .send(user);
      });
  }

  beforeEach((done) => {
    return basicPopulate(baseNotes)
      .then((response) => {
        baseNotes = response;
        return done();
      })
      .catch((response) => {
        return done();
      });
  });

  it('responds with a 404 error when a bad url is sent', async (done) => {
    const response = await supertest(server).get('/badurl');
    expect(response.status).toEqual(404);
    return done();
  });

  it('returns a 401 error if not logged in', () => {
    const request = supertest.agent(server);
    return scratchLogin(request)
      .then(() => {
        return request
          .post('/auth/logout')
          .then(() => request.get('/notes/get/all'))
          .then((response) => {
            // expect(response.status).toBe(401);
            expect(response.body).toEqual({
              message: 'Must be logged in',
            });
          });
      });
  });

  it('returns all notes in database', (done) => {
    const request = supertest.agent(server);
    return scratchLogin(request)
      .then(() => {
        return request.get('/notes/get/all');
      })
      .then(({ body, status }) => {
        expect(body).toEqual(baseNotes);
        expect(status).toEqual(200);
        return done();
      });
  });

  // it('returns an empty array when there are no notes', async (done) => {
  //   await db.raw('ALTER TABLE "notesTagsJoin" DROP CONSTRAINT "notestagsjoin_noteid_foreign"');
  //   await db('notes').truncate();

  //   const { body, status } = await request.get('/notes/get/all');

  //   expect(status).toEqual(200);
  //   expect(body instanceof Array).toBe(true);
  //   expect(body.length).toBe(0);

  //   // await db.raw('ALTER TABLE "notesTagsJoin" ADD CONSTRAINT "notestagsjoin_noteid_foreign" FOREIGN KEY ("noteId") REFERENCES notes (id)');
  //   return done();
  // });

  // it('returns a note when url contains an id for an existing note', async (done) => {
  //   const { body, status } = await request.get('/notes/get/2');
  //   expect(status).toEqual(200);
  //   expect(body).toEqual(baseNotes[1]);
  //   return done();
  // });

  // it('returns a 404 when a request for a non-existent id is made', async (done) => {
  //   const { body, status } = await request.get('/notes/get/45');
  //   expect(status).toEqual(404);
  //   expect(body.message).toBeDefined();
  //   return done();
  // });

  // it('creates a note successfully for a populated database', (done) => {
  //   let newNote = {
  //     title: 'New note',
  //     textBody: 'This is a new note',
  //   };
  //   request
  //     .post('/notes/create')
  //     .send(newNote)
  //     .then(({ status, body }) => {
  //       expect(status).toEqual(201);
  //       expect(body.id).toBeDefined();
  //       newNote = { ...newNote, id: body.id };
  //       return body.id;
  //     })
  //     .then(id => db('notes')
  //       .where('id', '=', id)
  //       .first())
  //     .then(async (response) => {
  //       expect(response.created_at).toBeDefined();
  //       expect(response).toMatchObject(camelToSnake(newNote));

  //       response.tags = [];
  //       const parsedNewNote = JSON.parse(JSON.stringify(snakeToCamel(response)));
  //       let updatedNotes = await getCurrentDB();
  //       updatedNotes = JSON.parse(JSON.stringify(updatedNotes.map(snakeToCamel)));
  //       baseNotes[baseNotes.length - 1].right = response.id;
  //       expect([...baseNotes, parsedNewNote]).toEqual(updatedNotes);

  //       return done();
  //     });
  // });

  // it('creates a new post in an empty database', (done) => {
  //   const newNote = {
  //     title: 'This is a title',
  //     textBody: 'This is a new note',
  //   };

  //   return db
  //     .raw('ALTER TABLE "notesTagsJoin" DROP CONSTRAINT "notestagsjoin_noteid_foreign"')
  //     .then(() => db('notesTagsJoin').truncate())
  //     .then(() => db('notes').truncate())
  //     .then(() => {
  //       return request
  //         .post('/notes/create')
  //         .send(newNote);
  //     })
  //     .then((response) => {
  //       expect(response.status).toBe(201);
  //       expect(response.body).toBeDefined();
  //       return response.body;
  //     })
  //     .then(async ({ id }) => {
  //       const updatedNotes = await getCurrentDB();
  //       expect(updatedNotes).toHaveLength(1);
  //       expect(updatedNotes[0]).toMatchObject(newNote);
  //       expect(updatedNotes[0].id).toEqual(id);
  //       return done();
  //     });
  // });

  // it('rejects a note with an empty-string title', (done) => {
  //   const newNote = {
  //     title: '',
  //     text_body: 'This is a new note',
  //   };
  //   request
  //     .post('/notes/create')
  //     .send(newNote)
  //     .then(async (res) => {
  //       const {
  //         status,
  //         body: { message },
  //       } = res;
  //       expect(status).toEqual(403);
  //       expect(message).toBeDefined();
  //       const updatedNotes = await getCurrentDB();
  //       expect(baseNotes).toEqual(updatedNotes);
  //       return done();
  //     });
  // });

  // it('rejects a note with an empty-string text', (done) => {
  //   const newNote = {
  //     title: 'New note title',
  //     text_body: '',
  //   };
  //   request
  //     .post('/notes/create')
  //     .send(newNote)
  //     .then(async (res) => {
  //       const {
  //         status,
  //         body: { message },
  //       } = res;
  //       expect(status).toEqual(403);
  //       expect(message).toBeDefined();
  //       const updatedNotes = await getCurrentDB();
  //       expect(baseNotes).toEqual(updatedNotes);
  //       return done();
  //     });
  // });

  // it('rejects a note with an undefined title', (done) => {
  //   const newNote = {
  //     text_body: 'This is a new note',
  //   };
  //   request
  //     .post('/notes/create')
  //     .send(newNote)
  //     .then(async (res) => {
  //       const {
  //         status,
  //         body: { message },
  //       } = res;
  //       expect(status).toEqual(403);
  //       expect(message).toBeDefined();
  //       const updatedNotes = await getCurrentDB();
  //       expect(baseNotes).toEqual(updatedNotes);
  //       return done();
  //     });
  // });

  // it('rejects a note with an undefined text', (done) => {
  //   const newNote = {
  //     title: 'New note title',
  //   };
  //   request
  //     .post('/notes/create')
  //     .send(newNote)
  //     .then(async (res) => {
  //       const {
  //         status,
  //         body: { message },
  //       } = res;
  //       expect(status).toEqual(403);
  //       expect(message).toBeDefined();
  //       const updatedNotes = await getCurrentDB();
  //       expect(baseNotes).toEqual(updatedNotes);
  //       return done();
  //     });
  // });

  // it('edits a note', (done) => {
  //   const updateNote = {
  //     title: 'new title',
  //     textBody: 'new text',
  //   };
  //   const { id } = baseNotes[1];
  //   request
  //     .put(`/notes/edit/${id}`)
  //     .send(updateNote)
  //     .then(async ({ status }) => {
  //       expect(status).toEqual(204);
  //       const updatedNotes = await getCurrentDB();
  //       expect(updatedNotes[1]).toMatchObject(updateNote);
  //       return done();
  //     });
  // });

  // it('throws a 404 error for a bad id', (done) => {
  //   const updateNote = {
  //     title: 'new title',
  //     textBody: 'new text',
  //   };
  //   request
  //     .put('/notes/edit/badid')
  //     .send(updateNote)
  //     .then(async ({ status }) => {
  //       expect(status).toEqual(404);
  //       const currentNotes = await getCurrentDB();
  //       expect(baseNotes).toEqual(currentNotes);
  //       return done();
  //     });
  // });

  // it('rejects a note edit with an empty-string title', (done) => {
  //   const newNote = {
  //     title: '',
  //   };
  //   const targetId = baseNotes[1].id;
  //   request
  //     .put(`/notes/edit/${targetId}`)
  //     .send(newNote)
  //     .then(async (res) => {
  //       const {
  //         status,
  //         body: { message },
  //       } = res;
  //       expect(status).toEqual(403);
  //       expect(message).toBeDefined();
  //       const updatedNotes = await getCurrentDB();
  //       expect(baseNotes).toEqual(updatedNotes);
  //       return done();
  //     });
  // });

  // it('deletes a note from the end', (done) => {
  //   const noteTarget = baseNotes[baseNotes.length - 1];
  //   return request
  //     .delete(`/notes/delete/${noteTarget.id}`)
  //     .then(async (res) => {
  //       const {
  //         status,
  //         body: { message },
  //       } = res;

  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       expect(updatedNotes).toHaveLength(baseNotes.length - 1);
  //       expect(updatedNotes
  //         .find(note => note.id === noteTarget.id)).toBeUndefined();
  //       expect(updatedNotes[updatedNotes.length - 1].id).not.toBe(noteTarget.id);
  //       return done();
  //     });
  // });

  // it('deletes a note from the beginning', (done) => {
  //   const noteTarget = baseNotes[0];
  //   return request
  //     .delete(`/notes/delete/${noteTarget.id}`)
  //     .then(async (res) => {
  //       const {
  //         status,
  //         body: { message },
  //       } = res;

  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       expect(updatedNotes).toHaveLength(baseNotes.length - 1);
  //       expect(updatedNotes
  //         .find(note => note.id === noteTarget.id)).toBeUndefined();
  //       expect(updatedNotes[0].id).not.toBe(noteTarget.id);
  //       return done();
  //     });
  // });

  // it('deletes a note from the middle', (done) => {
  //   const noteTarget = baseNotes[2];
  //   return request
  //     .delete(`/notes/delete/${noteTarget.id}`)
  //     .then(async (res) => {
  //       const {
  //         status,
  //         body: { message },
  //       } = res;

  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       expect(updatedNotes).toHaveLength(baseNotes.length - 1);
  //       expect(updatedNotes
  //         .find(note => note.id === noteTarget.id)).toBeUndefined();
  //       expect(updatedNotes[2].id).not.toBe(noteTarget.id);
  //       return done();
  //     });
  // });

  // it('returns a 404 error if a bad id is sent', (done) => {
  //   request
  //     .delete('/notes/delete/999999999')
  //     .then(({ status }) => {
  //       expect(status).toEqual(404);
  //       return db('notes')
  //         .count({ count: '*' })
  //         .first();
  //     })
  //     .then(({ count }) => {
  //       expect(Number(count)).toEqual(baseNotes.length);
  //       return done();
  //     });
  // });

  // it('returns all tags', (done) => {
  //   const baseTags = new Set();
  //   baseNotes.forEach((note) => {
  //     note.tags.forEach((tag) => {
  //       baseTags.add(tag);
  //     });
  //   });
  //   request
  //     .get('/notes/tags')
  //     .then(({ body, status }) => {
  //       expect(status).toEqual(200);
  //       expect(body).toEqual(Array.from(baseTags));
  //       return done();
  //     });
  // });

  // it('handles two reorders internally towards right', (async (done) => {
  //   // [1, 2, 3, 4, 5]
  //   // [1, 3, 2, 4, 5]
  //   let leftNote = baseNotes[1];
  //   let rightNote = baseNotes[baseNotes.length - 2];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: leftNote.id, dropId: rightNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 0, leftNote);
  //       baseNotes.splice(1, 1);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   leftNote = baseNotes[1];
  //   rightNote = baseNotes[baseNotes.length - 2];
  //   request
  //     .put('/notes/move')
  //     .send({ sourceId: leftNote.id, dropId: rightNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 0, leftNote);
  //       baseNotes.splice(1, 1);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //       return done();
  //     });
  // }));

  // it('handles two reorders internally towards left', (async (done) => {
  //   // [1, 2, 3, 4, 5]
  //   // [1, 4, 2, 3, 5]
  //   let leftNote = baseNotes[1];
  //   let rightNote = baseNotes[baseNotes.length - 2];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: rightNote.id, dropId: leftNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 1);
  //       baseNotes.splice(1, 0, rightNote);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   leftNote = baseNotes[1];
  //   rightNote = baseNotes[baseNotes.length - 2];
  //   request
  //     .put('/notes/move')
  //     .send({ sourceId: rightNote.id, dropId: leftNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 1);
  //       baseNotes.splice(1, 0, rightNote);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       return done();
  //     });
  // }));

  // it('handles two internal reorders to left end', (async (done) => {
  //   // [1, 2, 3, 4, 5]
  //   // [4, 1, 2, 3, 5]
  //   let leftNote = baseNotes[0];
  //   let rightNote = baseNotes[baseNotes.length - 2];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: rightNote.id, dropId: leftNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 1);
  //       baseNotes.splice(0, 0, rightNote);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   [leftNote] = baseNotes;
  //   rightNote = baseNotes[baseNotes.length - 2];
  //   request
  //     .put('/notes/move')
  //     .send({ sourceId: rightNote.id, dropId: leftNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 1);
  //       baseNotes.splice(0, 0, rightNote);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //       return done();
  //     });
  // }));

  // it('handles two internal reorders to left end', (async (done) => {
  //   let leftNote = baseNotes[1];
  //   let rightNote = baseNotes[baseNotes.length - 1];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: leftNote.id, dropId: rightNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 1, 0, leftNote);
  //       baseNotes.splice(1, 1);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   leftNote = baseNotes[1];
  //   rightNote = baseNotes[baseNotes.length - 1];
  //   request
  //     .put('/notes/move')
  //     .send({ sourceId: leftNote.id, dropId: rightNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 1, 0, leftNote);
  //       baseNotes.splice(1, 1);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       return done();
  //     });
  // }));

  // it('handles all reorders combined', (async (done) => {
  //   let leftNote = baseNotes[1];
  //   let rightNote = baseNotes[baseNotes.length - 2];

  //   // first internal reorder left to right
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: leftNote.id, dropId: rightNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 0, leftNote);
  //       baseNotes.splice(1, 1);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   // second internal reorder left to right
  //   leftNote = baseNotes[1];
  //   rightNote = baseNotes[baseNotes.length - 2];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: leftNote.id, dropId: rightNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 0, leftNote);
  //       baseNotes.splice(1, 1);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   // first internal reorder right to left
  //   leftNote = baseNotes[1];
  //   rightNote = baseNotes[baseNotes.length - 2];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: rightNote.id, dropId: leftNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 1);
  //       baseNotes.splice(1, 0, rightNote);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   // second internal reorder right to left
  //   leftNote = baseNotes[1];
  //   rightNote = baseNotes[baseNotes.length - 2];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: rightNote.id, dropId: leftNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 1);
  //       baseNotes.splice(1, 0, rightNote);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes; 
  //     });

  //   // first reorder internal right to left end
  //   leftNote = baseNotes[0];
  //   rightNote = baseNotes[baseNotes.length - 2];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: rightNote.id, dropId: leftNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 1);
  //       baseNotes.splice(0, 0, rightNote);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   // second reorder internal right to left end
  //   [leftNote] = baseNotes;
  //   rightNote = baseNotes[baseNotes.length - 2];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: rightNote.id, dropId: leftNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 2, 1);
  //       baseNotes.splice(0, 0, rightNote);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   // first reorder internal left to right end
  //   leftNote = baseNotes[1];
  //   rightNote = baseNotes[baseNotes.length - 1];
  //   await request
  //     .put('/notes/move')
  //     .send({ sourceId: leftNote.id, dropId: rightNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 1, 0, leftNote);
  //       baseNotes.splice(1, 1);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //     });

  //   // second reorder internal left to right end
  //   leftNote = baseNotes[1];
  //   rightNote = baseNotes[baseNotes.length - 1];
  //   request
  //     .put('/notes/move')
  //     .send({ sourceId: leftNote.id, dropId: rightNote.id })
  //     .then(async ({ status }) => {
  //       expect(status).toBe(204);

  //       const updatedNotes = await getCurrentDB();
  //       baseNotes.splice(baseNotes.length - 1, 0, leftNote);
  //       baseNotes.splice(1, 1);
  //       const baseNoteIds = baseNotes.map(note => note.id);
  //       const updatedIds = updatedNotes.map(note => note.id);
  //       expect(updatedIds).toEqual(baseNoteIds);
  //       baseNotes = updatedNotes;
  //       return done();
  //     });
  // }));
});
