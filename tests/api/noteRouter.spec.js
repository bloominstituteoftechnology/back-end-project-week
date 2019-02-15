const request = require('supertest');
const app = require('../../app');
const db = require('../../data/dbConfig');

describe('Notes API', () => {

    describe('POST /notes', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test('responds with 201', async () => {
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).post('/api/teams').send(body);
            expect(response.status).toBe(201);
        });

        test('responds with json', async () => {
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).post('/api/teams').send(body);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with id of new team', async () => {
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).post('/api/teams').send(body);
            expect(response.body).toEqual({id: 1});
        });

        test('responds with 400', async () => {
            const body = {};
            const response = await request(server).post('/api/teams').send(body);
            expect(response.status).toBe(400);
        });

        

    });

    describe('GET /notes', () => {

        test('responds with 200', async () => {
            const response = await request(app).get("/api/notes");
            expect(response.statusCode).toBe(200);
        });
        
        test('responds with json', async () => {
            const response = await request(app).get("/api/notes");
            expect(response.type).toMatch(/json/i);
        });

        test('responds with empty array', async () => {

        });

        test('responds with array of note objects', async () => {

        });

    });

    describe('GET /notes/<id>', () => {



    });

    describe('PUT /notes/<id>', () => {

        

    });

    describe('DELETE /notes/<id>', () => {

        

    });

});