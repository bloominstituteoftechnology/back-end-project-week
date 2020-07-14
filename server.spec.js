const server = require('./server');
const request = require('supertest');

describe('Server', () => {
    describe('GET to /note/get/all', () => {
        it('should return a status code of 200 on success', async () => {
            const response = await request(server).get('/note/get/all');
            expect(response.status).toEqual(200);
        });

        it('should return a JSON object', async () => {
            const response = await request(server).get('/note/get/all');
            expect(response.type).toBe('application/json');
        });
    });

    describe('POST to /note/create', () => {
        it('should return a status code of 201 on POST', async () => {
            const sendObject = {
                "title": "Test",
                "textBody": "Hello, world!",
                "tags": "nothing, to, see, here"
            }
            
            const response = await request(server).post('/note/create').send(sendObject);
            expect(response.status).toEqual(201);
        });

        it('should return a JSON object', async () => {
            const sendObject = {
                "title": "Test",
                "textBody": "Hello, world!",
                "tags": "nothing, to, see, here"
            };
            
            const response = await request(server).post('/note/create').send(sendObject);
            expect(response.type).toBe('application/json');
        });
    });

    describe('GET to /note/get/1', () => {
        it('should return a status code of 200 on success', async () => {
            const response = await request(server).get('/note/get/1');
            expect(response.status).toEqual(200);
        });

        it('should return a JSON object', async () => {
            const response = await request(server).get('/note/get/1');
            expect(response.type).toBe('application/json');
        });
    });

    describe('PUT to /note/edit/1', () => {
        it('should return a status code of 200 on success', async () => {
            const sendObject = {
                "title": "Updated Note"
            };

            const response = await request(server).put('/note/edit/1').send(sendObject);
            expect(response.status).toEqual(200);
        });

        it('should return a JSON object', async () => {
            const sendObject = {
                "title": "Updated Note"
            };

            const response = await request(server).put('/note/edit/1').send(sendObject);
            expect(response.type).toBe('application/json');
        });
    });

    describe('DELETE to /note/delete/1', () => {
        it('should return a status code of 200 on success', async () => {
            const response = await request(server).delete('/note/delete/1');
            expect(response.status).toEqual(200);
        });

        it('should return a JSON object', async () => {
            const response = await request(server).delete('/note/delete/1');
            expect(response.type).toBe('application/json');
        });
    });
});