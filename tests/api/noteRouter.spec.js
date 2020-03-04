const request = require('supertest');
const app = require('../../app');
const db = require('../../data/dbConfig');

describe('Notes API', () => {

    describe('POST /api/notes', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test('responds with 201', async () => {
            const body = { title: "Title", content: "Content" };
            const response = await request(app).post('/api/notes').send(body);
            expect(response.status).toBe(201);
        });

        test('responds with json', async () => {
            const body = { title: "Title", content: "Content" };
            const response = await request(app).post('/api/notes').send(body);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with id of new team', async () => {
            const body = { title: "Title", content: "Content" };
            const response = await request(app).post('/api/notes').send(body);
            expect(response.body).toEqual({id: 1, title: "Title", content: "Content" });
        });

        test('responds with 400', async () => {
            const body = {};
            const response = await request(app).post('/api/notes').send(body);
            expect(response.status).toBe(400);
        });

        

    });

    describe('GET /api/notes', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test('responds with 200', async () => {
            const response = await request(app).get("/api/notes");
            expect(response.statusCode).toBe(200);
        });
        
        test('responds with json', async () => {
            const response = await request(app).get("/api/notes");
            expect(response.type).toMatch(/json/i);
        });

        test('responds with empty array', async () => {
            const response = await request(app).get("/api/notes");
            expect(response.body).toEqual([]);
        });

        test('responds with array of note objects', async () => {
            const body = { title: "Title", content: "Content" };
            await request(app).post('/api/notes').send(body);
            await request(app).post('/api/notes').send(body);
            await request(app).post('/api/notes').send(body);
            const response = await request(app).get("/api/notes");
            expect(response.body).toEqual([
                { id: 1, title: "Title", content: "Content" },
                { id: 2, title: "Title", content: "Content" },
                { id: 3, title: "Title", content: "Content" }
            ]);
        });

    });

    describe('GET /api/notes/<id>', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test('responds with 200', async () => {
            const body = { title: "Title", content: "Content" };
            let response = await request(app).post('/api/notes').send(body);
            const note = response.body;
            response = await request(app).get(`/api/notes/${note.id}`);
            expect(response.statusCode).toBe(200);
        });
        
        test('responds with json', async () => {
            const body = { title: "Title", content: "Content" };
            let response = await request(app).post('/api/notes').send(body);
            const note = response.body;
            response = await request(app).get(`/api/notes/${note.id}`);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with note object', async () => {
            const body = { title: "Title", content: "Content" };
            let response = await request(app).post('/api/notes').send(body);
            const note = response.body;
            response = await request(app).get(`/api/notes/${note.id}`);
            expect(response.body).toEqual({ id: 1, title: 'Title', content: 'Content' });
        });

        test('responds with 404 on invalid id', async () => {
            const id = 1;
            const response = await request(app).get(`/api/notes/${id}`);
            expect(response.status).toBe(404);
        });

    });

    describe('PUT /api/notes/<id>', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test('responds with 200', async () => {
            let body = { title: "Ttle", content: "Cntent" };
            let response = await request(app).post('/api/notes').send(body);
            const note = response.body;
            body = { title: 'Title', content: 'Content' };
            response = await request(app).put(`/api/notes/${note.id}`).send(body);
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            let body = { title: 'Ttle', content: 'Cntent' };
            let response = await request(app).post('/api/notes').send(body);
            const note = response.body;
            body = { title: 'Title', content: 'Content' };
            response = await request(app).put(`/api/notes/${note.id}`).send(body);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with updated note object', async () => {
            let body = { title: 'Ttle', content: 'Cntent' };
            let response = await request(app).post('/api/notes').send(body);
            const note = response.body;
            body = { title: 'Title', content: 'Content' };
            response = await request(app).put(`/api/notes/${note.id}`).send(body);
            expect(response.body).toEqual({ id: 1, title: 'Title', content: 'Content' });
        });

        test('responds with 404 on invalid id', async () => {
            const id = 1;
            const body = { title: 'Title', content: 'Content' };
            const response = await request(app).put(`/api/notes/${id}`).send(body);
            expect(response.status).toBe(404);
        });

    });

    describe('DELETE /api/notes/<id>', () => {

        beforeEach(async () => {
            await db('notes').truncate();
        });

        afterAll(async () => {
            await db('notes').truncate();
        });

        test('responds with 200', async () => {
            const body = { title: "Title", content: "Content" };
            let response = await request(app).post('/api/notes').send(body);
            const note = response.body;
            response = await request(app).delete(`/api/notes/${note.id}`);
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            const body = { title: "Title", content: "Content" };
            let response = await request(app).post('/api/notes').send(body);
            const note = response.body;
            response = await request(app).delete(`/api/notes/${note.id}`);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with count of 1 record deleted', async () => {
            const body = { title: "Title", content: "Content" };
            let response = await request(app).post('/api/notes').send(body);
            const note = response.body;
            response = await request(app).delete(`/api/notes/${note.id}`);
            expect(response.body).toEqual({ count: 1 });
        });

        test('responds with 404 on invalid id', async () => {
            const id = 1;
            const response = await request(app).delete(`/api/notes/${id}`);
            expect(response.status).toBe(404);
        });

    });

});