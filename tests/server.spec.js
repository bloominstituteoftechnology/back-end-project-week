const request = require('supertest');
const mongoose = require('mongoose');

const server = require('../server');
const Notes = require('../notes/notesModel');

describe('server', () => {
    beforeAll(() => {
        return mongoose
          .connect('mongodb://brad:brad@ds233500.mlab.com:33500/backendproject1111')
          .then(() => console.log('\n=== connected to TEST DB ==='));
      });
    
      afterAll(() => {
        return mongoose
          .disconnect()
          .then(() => console.log('\n=== disconnected from TEST DB ==='));
      });
     
      afterEach((done) => {
        Notes.remove({}, err => {
          if(err) {console.log('error with the after each');}
          done();
        })
      });

    test('should return 200 and a response', async (done) => {
        const expected ={ api: 'running' };
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expected);
        done();
    });
    test('should return 200 and an array', async (done) => {
        const response = await request(server).get('/notes');
        expect(response.status).toBe(200);
        expect(response.body).not.toBe('string');
        expect(Array.isArray(response.body)).toBe(true);
        done();
    });
    test('should return 200 and an array', async (done) => {
        const badNote = {
            title: 'wow',
            body:'mmo',
          }
          const newNote = await Notes.create(badNote);
        const response = await request(server).get(`/notes/${newNote._id}`);
        expect(response.status).toBe(200);
        expect(response.body).not.toBe('string');
        expect(Array.isArray(response.body)).toBe(false);
        done();
    });
    test('should return 201', async (done) => {
        const badNote = {
            title: 'wowwwww',
            body:'mmoooo',
          };
        const newNote = await Notes.create(badNote);
        const response = await request(server)
        .post('/notes')
        .send(badNote)
        expect(response.status).toBe(201);
        done();
    });
    test('should return 204 and delete', async (done) => {
        const badNote = {
            title: 'wow',
            body:'mmo',
          }
          const newNote = await Notes.create(badNote);
          request(server).delete(`/notes/${newNote._id}`);
          expect(204);
          done();
    });
    test('should return 404 for delete', async (done) => {
          request(server)
          .delete(`/notes/11111`);
          expect(404);
          done();
    });
    test('put id error should be 404', async (done) => {
        request(server)
          .put(`/notes/11111`);
          expect(404);
          done();
    });
    test('put test should return 201', async (done) => {
        const badNote = {
            title: 'wow',
            body:'mmo',
          }
          const newNote = await Notes.create(badNote);
        const response = await request(server).put(`/notes/${newNote._id}`).send(newNote.title = 'bob');
        expect(response.status).toBe(201);
        done();
    });
})