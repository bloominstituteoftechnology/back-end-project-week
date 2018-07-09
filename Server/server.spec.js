
const request = require('supertest');
const mongoose = require('mongoose');
const server = require('./server');

describe('server.js', () => {
    it('should have a sanity check', async () => {
        const response = await request(server).get("/");
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({"Success": "api is working..."});
    });



})