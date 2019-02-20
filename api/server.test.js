const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig');

describe('the route handlers', () => {

  describe('GET /note/get/all', () => {

    afterEach(async () => {
      await db('notes').truncate();
    });

    it('responds with 200', async () => {
      const response = await request(server).get('/note/get/all');

      expect(response.status).toBe(200);
    })

    it('sends correct responds object', async () => {
      const response = await request(server).get('/note/get/all');

      expect(response.body).toEqual([]);
    })

  })

  describe('POST /note/create', () => {

    afterEach(async () => {
      await db('notes').truncate();
    });

    it('responds with 201 when body is correct', async () => {
      const body = { title: 'FakeNote', textBody: 'FakeBody' };
      const response = await request(server).post('/note/create').send(body);

      expect(response.status).toBe(201);
    })

    it('responds with 422 when body is missing data', async () => {
      const body = {};
      const response = await request(server).post('/note/create').send(body);

      expect(response.status).toBe(422);
    })

  })

  describe('GET /note/view/:id', () => {

    afterEach(async () => {
      await db('notes').truncate();
    });

    it(`responds with 404 when ID isn't available`, async () => {
      const response = await request(server).get('/note/view/1');

      expect(response.status).toBe(404);
    })

    it('responds with 200 when ID exists', async () => {
      const body = { title: 'FakeNote', textBody: 'FakeBody' };
      await request(server).post('/note/create').send(body);
      const response = await request(server).get('/note/view/1');

      expect(response.status).toBe(200);
    })

  })

  describe('PUT /note/edit/:id', () => {

    afterEach(async () => {
      await db('notes').truncate();
    });

    it('responds with 200 when successfully updated', async () => {
      const body = { title: 'FakeNote', textBody: 'FakeBody' };
      const updatedBody = { title: 'UpdatedNote', textBody: 'UpdatedBody' };

      await request(server).post('/note/create').send(body);
      const updatedResponse = await request(server).put('/note/edit/1').send(updatedBody);

      expect(updatedResponse.status).toBe(200);
    })

    it('responds with 422 when body is missing info', async () => {
      const body = { title: 'FakeNote', textBody: 'FakeBody' };
      const updatedBody = {};
      await request(server).post('/note/create').send(body);
      const updatedResponse = await request(server).put('/note/edit/1').send(updatedBody);

      expect(updatedResponse.status).toBe(422);
    })

  })

  describe('DELETE /note/delete/:id', () => {

    afterEach(async () => {
      await db('notes').truncate();
    });

/*     it('responds with 404 if ID is not valid', async () => {
      const response = await request(server).delete('/note/delete/:id');

      expect(response.status).toBe(404);
    }) */

    it('responds with 200 when succesfully deleted', async () => {
      const body = { title: 'FakeNote', textBody: 'FakeBody' };
      await request(server).post('/note/create').send(body);
      const response = await request(server).delete('/note/delete/1');

      expect(response.status).toBe(200);
    })

  })

})