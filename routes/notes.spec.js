/* eslint-disable prefer-destructuring */
const supertest = require('supertest');
const faker = require('faker');
const db = require('knex')(require('../knexfile').development);
const server = require('../server');
const snakeToCamel = require('../utils/snakeToCamel');
const camelToSnake = require('../utils/camelToSnake');
const orderList = require('../utils/orderList');
const populateTestDB = require('../utils/populateTestDB');

async function getCurrentDB(userId) {
  let { rows } = await db.raw('SELECT * FROM notes');
  const camelCased = rows.map(snakeToCamel);
  const ordered = orderList(camelCased, userId);
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
  const users = await db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(res => populateTestDB(db));

  const currentDB = await getCurrentDB(1);
  return { notes: currentDB, users };
}

describe('Note api', () => {
  let baseNotes = [];
  let users = [];

  const scratchLogin = (request, user) => {
    return request.post('/auth/login').send(user);
  };

  const nonAuthTest = (request, type, url, payload) => {
    if (payload !== undefined) {
      return request[type](url)
        .send(payload)
        .then(({ status, body }) => {
          expect(status).toBe(401);
          expect(body).toEqual({ message: 'Must be logged in' });
        });
    }
    return request[type](url)
      .then(({ status, body }) => {
        expect(status).toBe(401);
        expect(body).toEqual({ message: 'Must be logged in' });
      });
  };

  beforeEach((done) => {
    return basicPopulate()
      .then((data) => {
        baseNotes = data.notes;
        users = data.users;
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

  describe('GET request for notes', () => {
    it('returns a 401 error if not logged in', () => {
      const request = supertest.agent(server);
      return request
        .post('/auth/logout')
        .then(() => nonAuthTest(request, 'get', '/notes/get/all'))
    });

    it('returns all notes in database', (done) => {
      const request = supertest.agent(server);
      return scratchLogin(request, users[0])
        .then((result) => {
          return request.get('/notes/get/all');
        })
        .then(({ body, status }) => {
          expect(body).toEqual(baseNotes);
          expect(status).toEqual(200);
          return done();
        });
    });

    it('returns all notes in database for a different user', async (done) => {
      const request = supertest.agent(server);
      await scratchLogin(request, users[1]);
      const user2Notes = getCurrentDB(2);

      const { body, status } = await request.get('/notes/get/all');
      expect(body).not.toEqual(baseNotes);
      expect(body).not.toEqual(user2Notes);
      expect(status).toEqual(200);

      done();
    });

    it('returns an empty array when there are no notes', async (done) => {
      await db.raw('ALTER TABLE "notesTagsJoin" DROP CONSTRAINT "notestagsjoin_noteid_foreign"');
      await db('notes').truncate();

      const request = supertest.agent(server);
      await scratchLogin(request, users[0]);
      const { body, status } = await request.get('/notes/get/all');

      expect(status).toEqual(200);
      expect(body instanceof Array).toBe(true);
      expect(body.length).toBe(0);

      return done();
    });
  });

  describe('GET notes by id', () => {
    it('returns a note when url contains an id for an existing note', async (done) => {
      const request = supertest.agent(server);
      await scratchLogin(request, users[0]);

      const { body, status } = await request.get('/notes/get/2');
      expect(status).toEqual(200);
      expect(body).toEqual(baseNotes[1]);
      return done();
    });

    it('returns error 401 when getting a note for different user', async (done) => {
      const request = supertest.agent(server);
      await scratchLogin(request, users[1]);

      const { body, status } = await request.get('/notes/get/1');
      expect(status).toEqual(401);
      expect(body).toEqual({ message: 'Not authorized for this user' });
      return done();
    });

    it('returns a 404 when a request for a non-existent id is made', async (done) => {
      const request = supertest.agent(server);
      await scratchLogin(request, users[0]);

      const { body, status } = await request.get('/notes/get/45');
      expect(status).toEqual(404);
      expect(body.message).toBeDefined();
      return done();
    });
  });

  describe('POST creates a note', () => {
    it('creates a note successfully for a populated database', async (done) => {
      let newNote = {
        title: 'New note',
        textBody: 'This is a new note',
      };

      const request = supertest.agent(server);
      await scratchLogin(request, users[0]);

      return request
        .post('/notes/create')
        .send(newNote)
        .then(({ status, body }) => {
          console.log(status, body);
          expect(status).toEqual(201);
          expect(body.id).toBeDefined();
          newNote = { ...newNote, id: body.id };
          return body.id;
        })
        .then(id => db('notes')
          .where('id', '=', id)
          .first())
        .then(async (response) => {
          expect(response.created_at).toBeDefined();
          expect(response).toMatchObject(camelToSnake(newNote));

          response.tags = [];
          const parsedNewNote = JSON.parse(JSON.stringify(snakeToCamel(response)));
          let updatedNotes = await getCurrentDB(users[0].id);
          updatedNotes = JSON.parse(JSON.stringify(updatedNotes.map(snakeToCamel)));
          baseNotes[baseNotes.length - 1].right = response.id;
          expect([...baseNotes, parsedNewNote]).toEqual(updatedNotes);

          return done();
        })
        .catch(err => console.log(err));
    });

    it('refuses to create a note when not logged in', async (done) => {
      const newNote = {
        title: 'New note',
        textBody: 'This is a new note',
      };

      const originalNotes = await db('notes').select();
      const request = supertest.agent(server);

      await nonAuthTest(request, 'post', '/notes/create', newNote)

      const updatedNotes = await db('notes').select();
      expect(updatedNotes).toEqual(originalNotes);
      done();
    });

    it('creates a note successfully for other user', async (done) => {
      let newNote = {
        title: 'New note',
        textBody: 'This is a new note',
      };

      baseNotes = await getCurrentDB(users[1].id);
      const request = supertest.agent(server);
      await scratchLogin(request, users[1]);

      return request
        .post('/notes/create')
        .send(newNote)
        .then(({ status, body }) => {
          console.log(status, body);
          expect(status).toEqual(201);
          expect(body.id).toBeDefined();
          newNote = { ...newNote, id: body.id };
          return body.id;
        })
        .then(id => db('notes')
          .where('id', '=', id)
          .first())
        .then(async (response) => {
          expect(response.created_at).toBeDefined();
          expect(response).toMatchObject(camelToSnake(newNote));

          response.tags = [];
          const parsedNewNote = JSON.parse(JSON.stringify(snakeToCamel(response)));
          let updatedNotes = await getCurrentDB(users[1].id);
          updatedNotes = JSON.parse(JSON.stringify(updatedNotes.map(snakeToCamel)));
          baseNotes[baseNotes.length - 1].right = response.id;
          expect([...baseNotes, parsedNewNote]).toEqual(updatedNotes);

          return done();
        });
    });

    it('creates a new post in an empty database', async (done) => {
      const newNote = {
        title: 'This is a title',
        textBody: 'This is a new note',
      };

      const request = supertest.agent(server);
      const user = users[0];
      await scratchLogin(request, user);

      return db
        .raw('ALTER TABLE "notesTagsJoin" DROP CONSTRAINT "notestagsjoin_noteid_foreign"')
        .then(() => db('notesTagsJoin').truncate())
        .then(() => db('notes').truncate())
        .then(() => {
          return request
            .post('/notes/create')
            .send(newNote);
        })
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toBeDefined();
          return response.body;
        })
        .then(async ({ id }) => {
          const updatedNotes = await getCurrentDB(user.id);
          expect(updatedNotes).toHaveLength(1);
          expect(updatedNotes[0]).toMatchObject(newNote);
          expect(updatedNotes[0].id).toEqual(id);
          return done();
        });
    });

    it('rejects a note with an empty-string title', async (done) => {
      const newNote = {
        title: '',
        text_body: 'This is a new note',
      };

      const request = supertest.agent(server);
      const user = users[0];
      await scratchLogin(request, user);

      request
        .post('/notes/create')
        .send(newNote)
        .then(async (res) => {
          const {
            status,
            body: { message },
          } = res;
          expect(status).toEqual(403);
          expect(message).toBeDefined();
          const updatedNotes = await getCurrentDB(user.id);
          expect(baseNotes).toEqual(updatedNotes);
          return done();
        });
    });

    it('rejects a note with an empty-string text', async (done) => {
      const newNote = {
        title: 'New note title',
        text_body: '',
      };
      const request = supertest.agent(server);
      const user = users[0];
      await scratchLogin(request, user);

      request
        .post('/notes/create')
        .send(newNote)
        .then(async (res) => {
          const {
            status,
            body: { message },
          } = res;
          expect(status).toEqual(403);
          expect(message).toBeDefined();
          const updatedNotes = await getCurrentDB(user.id);
          expect(baseNotes).toEqual(updatedNotes);
          return done();
        });
    });

    it('rejects a note with an undefined title', async (done) => {
      const newNote = {
        text_body: 'This is a new note',
      };

      const request = supertest.agent(server);
      const user = users[0];
      await scratchLogin(request, user);

      request
        .post('/notes/create')
        .send(newNote)
        .then(async (res) => {
          const {
            status,
            body: { message },
          } = res;
          expect(status).toEqual(403);
          expect(message).toBeDefined();
          const updatedNotes = await getCurrentDB(user.id);
          expect(baseNotes).toEqual(updatedNotes);
          return done();
        });
    });

    it('rejects a note with an undefined text', async (done) => {
      const newNote = {
        title: 'New note title',
      };

      const request = supertest.agent(server);
      const user = users[0];
      await scratchLogin(request, user);

      request
        .post('/notes/create')
        .send(newNote)
        .then(async (res) => {
          const {
            status,
            body: { message },
          } = res;
          expect(status).toEqual(403);
          expect(message).toBeDefined();
          const updatedNotes = await getCurrentDB(user.id);
          expect(baseNotes).toEqual(updatedNotes);
          return done();
        });
    });
  })

  describe('PUT request to edit note', () => {
     it('edits a note', async (done) => {
       const updateNote = {
         title: 'new title',
         textBody: 'new text',
       };
   
       const request = supertest.agent(server);
       const user = users[0];
       await scratchLogin(request, user);
   
       const { id } = baseNotes[1];
       request
         .put(`/notes/edit/${id}`)
         .send(updateNote)
         .then(async ({ status }) => {
           expect(status).toEqual(204);
           const updatedNotes = await getCurrentDB(user.id);
           expect(updatedNotes[1]).toMatchObject(updateNote);
           return done();
         });
     });

     it('returns a 401 for edits when not logged in', async (done) => {
       const updateNote = {
         title: 'new title',
         textBody: 'new text',
       };

       const { id } = baseNotes[1];

       const request = supertest.agent(server);

       return nonAuthTest(request, 'put', `/notes/edit/${id}`, updateNote)
        .then(async () => {
          const updatedNote = await db('notes').select('*').where('id', '=', id).first();
          expect(baseNotes[1]).toMatchObject(JSON.parse(JSON.stringify(snakeToCamel(updatedNote))));
          return done();
        });
     });
    
     it('throws a 404 error for a bad id', async (done) => {
       const updateNote = {
         title: 'new title',
         textBody: 'new text',
       };
   
       const request = supertest.agent(server);
       const user = users[0];
       await scratchLogin(request, user);
   
       request
         .put('/notes/edit/badid')
         .send(updateNote)
         .then(async ({ status }) => {
           expect(status).toEqual(404);
           const currentNotes = await getCurrentDB(user.id);
           expect(baseNotes).toEqual(currentNotes);
           return done();
         });
     });

     it('rejects a note edit with an empty-string title', async (done) => {
       const newNote = {
         title: '',
       };

       const request = supertest.agent(server);
       const user = users[0];
       await scratchLogin(request, user);
   
       const targetId = baseNotes[1].id;
       request
         .put(`/notes/edit/${targetId}`)
         .send(newNote)
         .then(async (res) => {
           const {
             status,
             body: { message },
           } = res;
           expect(status).toEqual(403);
           expect(message).toBeDefined();
           const updatedNotes = await getCurrentDB(user.id);
           expect(baseNotes).toEqual(updatedNotes);
           return done();
         });
     });
  });

  describe('DELETE a note', () => {

     it('deletes a note from the end', async (done) => {

       const request = supertest.agent(server);
       const user = users[0];
       await scratchLogin(request, user);
   
       const noteTarget = baseNotes[baseNotes.length - 1];
       return request
         .delete(`/notes/delete/${noteTarget.id}`)
         .then(async (res) => {
           const {
             status,
             body: { message },
           } = res;

           expect(status).toBe(204);

           const updatedNotes = await getCurrentDB(user.id);
           expect(updatedNotes).toHaveLength(baseNotes.length - 1);
           expect(updatedNotes
             .find(note => note.id === noteTarget.id)).toBeUndefined();
           expect(updatedNotes[updatedNotes.length - 1].id).not.toBe(noteTarget.id);
           return done();
         });
     });

     it('deletes a note from the beginning', async (done) => {
       const noteTarget = baseNotes[0];

       const request = supertest.agent(server);
       const user = users[0];
       await scratchLogin(request, user);
       
       return request
         .delete(`/notes/delete/${noteTarget.id}`)
         .then(async (res) => {
           const {
             status,
             body: { message },
           } = res;

           expect(status).toBe(204);

           const updatedNotes = await getCurrentDB(user.id);
           expect(updatedNotes).toHaveLength(baseNotes.length - 1);
           expect(updatedNotes
             .find(note => note.id === noteTarget.id)).toBeUndefined();
           expect(updatedNotes[0].id).not.toBe(noteTarget.id);
           return done();
         });
     });

     it('deletes a note from the middle', async (done) => {
       const noteTarget = baseNotes[2];

       const request = supertest.agent(server);
       const user = users[0];
       await scratchLogin(request, user);

       return request
         .delete(`/notes/delete/${noteTarget.id}`)
         .then(async (res) => {
           const {
             status,
             body: { message },
           } = res;

           expect(status).toBe(204);

           const updatedNotes = await getCurrentDB(user.id);
           expect(updatedNotes).toHaveLength(baseNotes.length - 1);
           expect(updatedNotes
             .find(note => note.id === noteTarget.id)).toBeUndefined();
           expect(updatedNotes[2].id).not.toBe(noteTarget.id);
           return done();
         });
     });

     it('returns a 404 error if a bad id is sent', async (done) => {

       const request = supertest.agent(server);
       const user = users[0];
       await scratchLogin(request, user);

       request
         .delete('/notes/delete/999999999')
         .then(({ status }) => {
           expect(status).toEqual(404);
           return db('notes')
             .count({ count: '*' })
             .where({ user_id: user.id})
             .first();
         })
         .then(({ count }) => {
           expect(Number(count)).toEqual(baseNotes.length);
           return done();
         });
     });

    it('returns a 403 error if deletion is attempted when not logged in', async () => {
      
      const request = supertest.agent(server);
      const user = users[0];
      const note = baseNotes[3];
      
      console.log(`notes/delete/${note.id}`);
      await nonAuthTest(request, 'delete', `/notes/delete/${note.id}`);

      updatedNotes = await getCurrentDB(users[0].id);
      expect(baseNotes).toEqual(updatedNotes);
    })

    it('returns a 403 if the wrong user attempts to delete a note', async () => {
      
      const request = supertest.agent(server);
      const note = baseNotes[1];
      const user = users.find(user => user.id !== note.userId);
       
      await scratchLogin(request, user);
      const { status, body } = await request.delete(`/notes/delete/${note.id}`);
      expect(status).toBe(401);
      expect(body).toEqual({ message: 'User is not authorized for this request' });
      updatedNotes = await getCurrentDB(users[0].id);
      expect(baseNotes).toEqual(updatedNotes);
    })
  });
// describe('GET tags', () => {
//   it('returns all tags', (done) => {
//     
//     const baseTags = new Set();
//     baseNotes.forEach((note) => {
//       note.tags.forEach((tag) => {
//         baseTags.add(tag);
//       });
//     });
//     request
//       .get('/notes/tags')
//       .then(({ body, status }) => {
//         expect(status).toEqual(200);
//         expect(body).toEqual(Array.from(baseTags));
//         return done();
//       });
//   });
// })



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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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

  //       const updatedNotes = await getCurrentDB(user.id);
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
