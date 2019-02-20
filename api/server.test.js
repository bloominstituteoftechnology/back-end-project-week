const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig');

describe('the route handlers', () => {

  describe('GET /note/get/all', () => {

    afterEach(async () => {
      await db('games').truncate();
    });

  })

  describe('POST /note/create', () => {

    afterEach(async () => {
      await db('games').truncate();
    });

  })

  describe('GET /note/view/:id', () => {

    afterEach(async () => {
      await db('games').truncate();
    });

  })

  describe('PUT /note/edit/:id', () => {

    afterEach(async () => {
      await db('games').truncate();
    });

  })

  describe('DELETE /note/delete/:id', () => {

    afterEach(async () => {
      await db('games').truncate();
    });

  })

})