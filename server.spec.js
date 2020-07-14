const request = require('supertest');
const server = require('./api/post');

describe('server', () => {
    describe('GET /post', () => {
        it('should return status 200', async () => {
            const res = await request(server)
            .get('/api/post')
            expect(res.status).toEqual(200);
        })
    })
})