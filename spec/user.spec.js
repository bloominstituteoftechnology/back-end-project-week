const request = require('supertest')
const server = require('../index')

describe('User Route', () => {
    describe('GET /api/users', () => {
        it('should check for response status', async () => {
            const res = await request(server).get('/api/users')
            expect(res.status).toBe(200)
            expect(res.body.status).toBe(true)
            expect(typeof res.body.users).toBe('object')
        })
    })
})