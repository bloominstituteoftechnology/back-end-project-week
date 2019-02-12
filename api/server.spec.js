const response = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');

afterEach(async () => {
    await db('notes').truncate;
})