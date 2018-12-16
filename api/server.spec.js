const request = require('supertest');
const server = require('./server');


describe('server endpoints', () => {
    describe('root endpoint | sanity check', () => {
        it('be sure server is up and running', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200); 
        });
    });
    describe('get notes routes', () => {
        it('should get a list of saved notes', async () => {
            const response = await request(server).get('/api/notes');
            expect(response.type).toBe('application/json');
            expect(response.body.length).toBe(3);
        });
        it('should return a single note', async () => {
            const response = await request(server).get('/api/notes/1');
            expect(response.body.length).toBe(1);
        });
    });
    describe('delete routes', () => {
        it('should delete a specific note', async () => {
            const response = await request(server).delete('/api/notes/3');
            expect(response.body).toEqual('3');
        });
    });
})