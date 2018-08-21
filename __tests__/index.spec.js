const request = require('supertest');
const server = require('../index');

describe('SERVER', () => {
    describe('Index Route', () => {
        describe('get', () => {
            it('should return OK status code', async () => {
                const res = await request(server).get('/');
                expect(res.status).toEqual(200);
            });

            it('should return NOT FOUND status code', async () => {
                const res = await request(server).get('/NOTFOUND');
                expect(res.status).toEqual(404);
            });
        });
    });
});
